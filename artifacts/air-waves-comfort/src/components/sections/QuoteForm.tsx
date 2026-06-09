import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface FormState {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  message: string;
}

const SERVICES_EN = [
  "AC Repair",
  "AC Installation",
  "AC Maintenance",
  "Commercial HVAC",
  "Indoor Air Quality",
  "Emergency Service",
  "Other",
];
const SERVICES_ES = [
  "Reparación de AC",
  "Instalación de AC",
  "Mantenimiento de AC",
  "HVAC Comercial",
  "Calidad del Aire Interior",
  "Servicio de Emergencia",
  "Otro",
];

export default function QuoteForm() {
  const { T, lang } = useLanguage();
  const Q = T.quote;
  const services = lang === "es" ? SERVICES_ES : SERVICES_EN;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    serviceType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, lang }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Request failed");
      }
      setStatus("success");
      setForm({ name: "", email: "", phone: "", serviceType: "", message: "" });
    } catch (err: any) {
      setErrorMsg(err.message || Q.errorGeneric);
      setStatus("error");
    }
  };

  const inputClass =
    "w-full bg-white/5 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#00AEEF] focus:bg-white/10 transition-all text-sm";

  return (
    <section id="quote" className="py-24 bg-[#0A2A6E] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: "radial-gradient(#00AEEF 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-[#00AEEF] font-bold tracking-wider uppercase text-sm mb-3">{Q.label}</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white font-serif mb-4">{Q.heading}</h3>
            <p className="text-white/70 text-lg">{Q.body}</p>
          </motion.div>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white/10 border border-[#00AEEF]/40 rounded-2xl p-12 text-center"
              >
                <CheckCircle2 className="w-16 h-16 text-[#00AEEF] mx-auto mb-6" />
                <h4 className="text-2xl font-bold text-white mb-3">{Q.successTitle}</h4>
                <p className="text-white/70 mb-6">{Q.successBody}</p>
                <Button
                  onClick={() => setStatus("idle")}
                  className="bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold rounded-full px-8"
                >
                  {Q.sendAnother}
                </Button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 backdrop-blur-sm space-y-5"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">{Q.labelName} *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder={Q.placeholderName}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">{Q.labelPhone} *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      placeholder={Q.placeholderPhone}
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">{Q.labelEmail} *</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    placeholder={Q.placeholderEmail}
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">{Q.labelService} *</label>
                  <select
                    name="serviceType"
                    value={form.serviceType}
                    onChange={handleChange}
                    required
                    className={`${inputClass} cursor-pointer`}
                  >
                    <option value="" disabled>{Q.placeholderService}</option>
                    {services.map((s) => (
                      <option key={s} value={s} className="bg-[#0A2A6E] text-white">{s}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white/60 text-xs font-semibold uppercase tracking-wider mb-2">{Q.labelMessage}</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder={Q.placeholderMessage}
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {status === "error" && (
                  <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
                    <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />
                    <p className="text-red-300 text-sm">{errorMsg}</p>
                    <button type="button" onClick={() => setStatus("idle")} className="ml-auto text-red-400 hover:text-red-300">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full h-14 bg-[#00AEEF] hover:bg-[#00AEEF]/90 text-white font-bold text-lg rounded-xl transition-all disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> {Q.sending}</>
                  ) : Q.submit}
                </Button>

                <p className="text-white/30 text-xs text-center">{Q.disclaimer}</p>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
