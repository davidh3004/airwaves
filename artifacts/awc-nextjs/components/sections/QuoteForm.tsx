"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const SERVICE_OPTIONS_EN = [
  "AC Repair",
  "AC Installation",
  "AC Maintenance",
  "Commercial HVAC",
  "Indoor Air Quality",
  "Emergency Service",
  "Other",
];

const SERVICE_OPTIONS_ES = [
  "Reparación de AC",
  "Instalación de AC",
  "Mantenimiento de AC",
  "HVAC Comercial",
  "Calidad del Aire Interior",
  "Servicio de Emergencia",
  "Otro",
];

type Status = "idle" | "loading" | "success" | "error";

export default function QuoteForm() {
  const { T, lang } = useLanguage();
  const Q = T.quote;
  const serviceOptions =
    lang === "es" ? SERVICE_OPTIONS_ES : SERVICE_OPTIONS_EN;

  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    serviceType: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const inputCls =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-sky-brand/60 focus:bg-white/8 transition-colors";

  return (
    <section id="quote" className="section-pad bg-[#060f24]">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-sky-brand text-xs font-semibold tracking-widest uppercase"
          >
            {Q.label}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold mt-3 mb-3"
          >
            {Q.heading}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-white/50"
          >
            {Q.body}
          </motion.p>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.25 }}
          className="glass rounded-3xl border border-white/8 p-8 md:p-10"
        >
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-5">
                  <CheckCircle2 className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-2xl font-serif font-bold mb-3">
                  {Q.successTitle}
                </h3>
                <p className="text-white/60 mb-8">{Q.successBody}</p>
                <button
                  onClick={() => {
                    setStatus("idle");
                    setForm({
                      name: "",
                      phone: "",
                      email: "",
                      serviceType: "",
                      message: "",
                    });
                  }}
                  className="text-sky-brand text-sm font-medium hover:underline"
                >
                  {Q.sendAnother}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">
                      {Q.labelName} *
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder={Q.placeholderName}
                      required
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-white/50 mb-2">
                      {Q.labelPhone} *
                    </label>
                    <input
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder={Q.placeholderPhone}
                      required
                      className={inputCls}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">
                    {Q.labelEmail} *
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder={Q.placeholderEmail}
                    required
                    className={inputCls}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">
                    {Q.labelService} *
                  </label>
                  <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    required
                    className={`${inputCls} appearance-none`}
                  >
                    <option value="" disabled>
                      {Q.placeholderService}
                    </option>
                    {serviceOptions.map((s) => (
                      <option key={s} value={s} className="bg-[#060f24]">
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-white/50 mb-2">
                    {Q.labelMessage}
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder={Q.placeholderMessage}
                    rows={4}
                    className={`${inputCls} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-2 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {Q.errorGeneric}
                  </div>
                )}

                <div className="flex flex-col gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full flex items-center justify-center gap-2 bg-sky-brand text-white font-semibold py-3.5 rounded-full hover:brightness-110 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-sky-brand/20"
                  >
                    {status === "loading" ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        {Q.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {Q.submit}
                      </>
                    )}
                  </button>
                  <p className="text-center text-xs text-white/30">
                    {Q.disclaimer}
                  </p>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
