import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getServerSession } from "next-auth";

export default async function ApplicationSummary() {
  const session = await getServerSession();
  const email = session?.user?.email;

  try {
    const response = await fetch(`${process.env.BASE_URL}/database/activeApplications?email=${email}`);
    if (!response.ok) {
      throw new Error("Failed to fetch application data");
    }
    const applications = await response.json();

    // Ensure applications is an array
    if (!Array.isArray(applications)) {
      throw new Error("Invalid data format received from the server");
    }

    // Calculate stats
    const totalApplications = applications.length;
    const pending = applications.filter((app: any) => app.status === "Pending").length;
    const interviews = applications.filter((app: any) => app.status === "Interviews").length;

    return (
      <div>
        <div className="flex flex-col md:flex-row gap-4 mb-8 w-full ">
          <Card className="flex-1 w-full">
            <CardHeader>
              <CardTitle className="text-2xl text-primary-dark">Application Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">{totalApplications}</p>
                  <p className="text-sm text-secondary">Total Applications</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{pending}</p>
                  <p className="text-sm text-secondary">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{interviews}</p>
                  <p className="text-sm text-secondary">Interviews</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching application data:", error);
    return (
      <div>
        <p className="text-center text-error">Failed to load application summary.</p>
      </div>
    );
  }
}
