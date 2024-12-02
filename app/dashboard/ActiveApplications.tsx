"use client";
import { useEffect, useState } from "react";
import ActiveApplicationCard from "@/components/ActiveApplicationCard";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import AddApplication from "@/components/modals/AddApplication";
import ActiveApplicationHeader from "@/components/ActiveApplicationHeader";
import PaginationFooter from "@/components/PaginationFooter";
import { STATUS } from "../types/enum/page";

export interface ApplicationData {
  application_id: number;
  email: string;
  institution_name: string;
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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(10);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        if (!session?.user?.email) throw new Error("User email is missing.");
        const res = await fetch(`/api/applications`);
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
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };
  return (
    <Card className="w-full rounded-xl">
      <CardHeader>
        <div className="flex flex-row items-center justify-between mb-2">
          <CardTitle className="text-2xl text-primary-dark">Active Applications</CardTitle>
          <AddApplication />
        </div>
        <ActiveApplicationHeader />
      </CardHeader>
      <CardContent className="space-y-2">
        {applications.length === 0 ? (
          <p>No active applications found.</p>
        ) : (
          applications.map((application, index) => (
            <ActiveApplicationCard
              key={`${application.email}-${index}`}
              name={application.institution_name}
              location={application.location}
              role={application.role_program}
              status={application.status}
              event={application.next_event_date}
            />
          ))
        )}
      </CardContent>
      <CardFooter>
        <PaginationFooter
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousPage={handlePreviousPage}
          onNextPage={handleNextPage}
        />
      </CardFooter>
    </Card>
  );
}
