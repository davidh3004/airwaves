import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import AdminDashboard from "./AdminDashboard";

export default async function AdminPage() {
  const isAdmin = await getAdminSession();
  if (!isAdmin) redirect("/admin/login");
  return <AdminDashboard />;
}
