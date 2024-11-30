"use client";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface ApplicationGroup {
  status: string;
  count: number;
}

export default function ActiveApplicationSummary() {
  const [allApplications, setAllApplications] = useState<ApplicationGroup[]>([]);
  const { data: session } = useSession();
  
  useEffect(() => { 
    console.log("Fetching applications");
    const fetchApplications = async () => {
      try {
        if (!session?.user?.email) return;
        const res = await fetch(`/api/database/activeApplicationSummary?email=${session?.user?.email}`);
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setAllApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
        console.log(err);
      }
    };
    fetchApplications();
  }, [session]);

  const activeApplications = 4;

  const getCount = (status: string) => {
    const application = allApplications.find((application) => application.status === status);
    return application?.count || 0;
  };

  const getSum = () => {
    return allApplications.reduce((acc, application) => acc + application.count, 0);
  };

  return (
    <Card className="rounded-xl w-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="grid items-stretch mt-4">
        <div className="flex justify-between h-fit">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount('Applied')}</p>
            <p className="text-sm text-gray-500">Applied</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount('In Progress')}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount('Accepted')}</p>
            <p className="text-sm text-gray-500">Accepted</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount('Rejected')}</p>
            <p className="text-sm text-gray-500">Rejected</p>
          </div>

        </div>
      </CardContent>
      <CardFooter className="bg-primary rounded-b-xl h-9">
        <p className="text-center text-primary-foreground">Total: {getSum()}</p>
      </CardFooter>
    </Card>
  );
}
function setError(arg0: string) {
  throw new Error("Function not implemented.");
}

