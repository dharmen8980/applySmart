import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import ActiveApplications from "./ActiveApplications";
import ApplicationSummary from "./ApplicationSummary";
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
