"use client";

import React, { useState, useEffect, useCallback } from "react";
import ActiveApplicationCard from "./dashboard-components/ActiveApplicationCard";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import AddApplicationDialog from "./dashboard-components/AddApplication";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { STATUS } from "../types/enum/page";
import { Button } from "@/components/ui/button";
import debounce from "lodash.debounce";
import { ApplicationData } from "../models/ApplicationModel";

export default function ActiveApplications() {
  // State Management
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("All");

  // Pagination State
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [applicationsPerPage] = useState<number>(10);

  // Total Pages Calculation
  const totalPages = Math.ceil(applications.length / applicationsPerPage);

  // Fetch Applications Function
  const fetchApplications = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (statusFilter && statusFilter !== "All") {
        params.append("statusFilter", statusFilter);
      }
      if (searchQuery) {
        params.append("searchQuery", searchQuery);
      }

      const response = await fetch(`/api/applications?${params.toString()}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to fetch applications.");
      }

      const data = await response.json();
      setApplications(Array.isArray(data) ? data : []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Unknown error occurred.";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter]);

  // Initial Fetch and Fetch on Dependencies Change
  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  // Pagination Handlers
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages, prev + 1));
  };

  // Debounced Search Handler
  const debouncedSearch = React.useRef(
    debounce((query: string) => {
      setSearchQuery(query);
      setCurrentPage(1); // Reset to first page on new search
    }, 500)
  ).current;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const handleFilterChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1); // Reset to first page on filter change
  };

  // Get Current Applications Based on Pagination
  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = applications.slice(indexOfFirstApplication, indexOfLastApplication);

  // Cleanup Debounce on Unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <Card className="w-full rounded-xl flex flex-col justify-between">
      {/* Header with Title and Add Application Button */}
      <CardHeader className="pb-2">
        <div className="flex flex-row items-center justify-between mb-2">
          <CardTitle className="text-2xl text-primary-dark">Active Applications</CardTitle>
          <AddApplicationDialog />
        </div>
        {/* Search and Filter Controls */}
        <div className="inline-flex items-center justify-between w-full">
          {/* Search Input */}
          <div className="flex items-center w-2/3 gap-2">
            <Search className="h-5 text-gray-500" />
            <Input
              type="search"
              placeholder="Search applications..."
              className="w-full placeholder:text-gray-400 border-b-2 border-b-gray-300 focus:border-b-primary px-1 py-0 pb-1"
              onChange={handleSearchChange}
            />
          </div>
          {/* Filter Select */}
          <div className="text-gray-600 border-2 w-1/3 ml-4">
            <Select value={statusFilter} onValueChange={handleFilterChange}>
              <SelectTrigger id="statusFilter" className="p-1 h-full">
                <SelectValue placeholder="Filter By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"All"}>All Status</SelectItem>
                <SelectItem value={STATUS.APPLIED}>Applied</SelectItem>
                <SelectItem value={STATUS.INPROGRESS}>In Progress</SelectItem>
                <SelectItem value={STATUS.ACCEPTED}>Accepted</SelectItem>
                <SelectItem value={STATUS.REJECTED}>Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>

      {/* Content with Applications List */}
      <CardContent className="space-y-1.5 overflow-hidden min-h-[400px]">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <div className="loader"></div> {/* Replace with a spinner or skeleton */}
          </div>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : currentApplications.length === 0 ? (
          <p>No active applications found.</p>
        ) : (
          currentApplications.map((application) => (
            <ActiveApplicationCard
              key={application.application_id} // Use unique identifier
              name={application.institution_name}
              location={application.location}
              role={application.role_program}
              status={application.status}
              event={application.next_event_date}
            />
          ))
        )}
      </CardContent>

      {/* Footer with Pagination Controls */}
      <CardFooter>
        <div className="flex items-center justify-between px-3 pb-2 w-full">
          <div className="flex flex-1 items-center justify-between">
            <Button
              variant="ghost"
              onClick={handlePreviousPage}
              disabled={currentPage <= 1}
              className="flex items-center gap-1 hover:bg-white"
            >
              <ChevronLeft className="h-4" />
              Previous
            </Button>

            <div className="text-sm text-muted-foreground">
              Page {currentPage} of {totalPages}
            </div>

            <Button
              variant="ghost"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1 hover:bg-white"
            >
              Next
              <ChevronRight className="h-4" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
