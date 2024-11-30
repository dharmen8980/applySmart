"use client";
import { useEffect, useState } from "react";
import ActiveApplicationCard from "@/components/ActiveApplicationCard";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import AddApplication from "@/components/modals/AddApplication";

interface ApplicationData {
  email: string;
  company_university: string;
  location: string;
  role_program: string;
  status: string;
  next_event_date: string;
}

export default function ActiveApplications() {
  const { data: session } = useSession();
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!session?.user?.email) throw new Error("User email is missing.");
        const res = await fetch(`/api/applications/active`);
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (session) {
      fetchApplications();
    }

  }, [session]);

  if (isLoading) {
    return <div>Loading applications...</div>;
  }

  return (
    <Card className="w-full rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-2xl text-primary-dark">Active Applications</CardTitle>
        <AddApplication />
      </CardHeader>
      <CardContent className="space-y-2">
        {applications.length === 0 ? (
          <p>No active applications found.</p>
        ) : (
          applications.map((application, index) => (
            <ActiveApplicationCard
              key={`${application.email}-${index}`}
              name={application.company_university}
              location={application.location}
              role={application.role_program}
              status={application.status}
              event={application.next_event_date}
            />
          ))
        )}
      </CardContent>
    </Card>
  );
}
