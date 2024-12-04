// src/components/ActiveApplications.tsx

"use client";

import React, { useState } from "react";
import ActiveApplicationCard from "@/components/ActiveApplicationCard";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import AddApplicationDialog from "@/components/modals/AddApplication";
import ActiveApplicationHeader from "@/components/ActiveApplicationHeader";
import PaginationFooter from "@/components/PaginationFooter";
import { useApplications } from "../hooks/useApplications";

export default function ActiveApplications() {
  const { applications, isLoading, error } = useApplications();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [applicationsPerPage] = useState<number>(10);

  // Calculate total pages based on applications length
  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // Get current applications based on pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  return (
    <Card className="w-full rounded-xl h-full">
      <CardHeader>
        <div className="flex flex-row items-center justify-between mb-2">
          <CardTitle className="text-2xl text-primary-dark">Active Applications</CardTitle>
          <AddApplicationDialog />
        </div>
        <ActiveApplicationHeader />
      </CardHeader>
      <CardContent className="space-y-2 h-[700px]">
        {currentApplications.length === 0 ? (
          <p>No active applications found.</p>
        ) : (
          currentApplications.map((application, index) => (
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
