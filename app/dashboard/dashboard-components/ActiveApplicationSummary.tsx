// src/dashboard-components/ActiveApplicationSummary.tsx

"use client";

import React from "react";
import { STATUS } from "@/app/types/enum/page";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";
import { useApplications } from "@/app/hooks/useApplications";

export default function ActiveApplicationSummary() {
  const { applicationStats, isLoading, error } = useApplications();
  console.log(applicationStats);

  const getCount = (status: string) => {
    const application = applicationStats.find((application) => application.status === status);
    return application?.count || 0;
  };

  const getSum = () => {
    return applicationStats.reduce((acc, application) => acc + application.count, 0);
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
            <p className="text-2xl font-bold">{getCount(STATUS.APPLIED)}</p>
            <p className="text-sm text-gray-500">Applied</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount(STATUS.INPROGRESS)}</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount(STATUS.ACCEPTED)}</p>
            <p className="text-sm text-gray-500">Accepted</p>
          </div>

          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">{getCount(STATUS.REJECTED)}</p>
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
