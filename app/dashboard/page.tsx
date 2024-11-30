import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import DashboardLayout from "./DashboardLayout";

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div>
      <DashboardLayout />
    </div>
  );
}
