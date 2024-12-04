"use client"; // Ensure this is a Client Component

import React, { useState, useEffect, useCallback, ReactNode } from "react";
import { ApplicationsContext } from "./ApplicationsContext";
import { ApplicationGroup, ApplicationData } from "../models/ApplicationModel";
import { useFetchTrigger } from "../hooks/useFetchTrigger";
import { useSession } from "next-auth/react";

interface ApplicationsProviderProps {
  children: ReactNode;
}

export const ApplicationsProvider: React.FC<ApplicationsProviderProps> = ({ children }) => {
  const { data: session } = useSession();
  const [applicationStats, setApplicationStats] = useState<ApplicationGroup[]>([]);
  const [applications, setApplications] = useState<ApplicationData[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { shouldFetch, resetFetch } = useFetchTrigger();

  const fetchApplicationStats = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/applications/summary`);
      if (!res.ok) throw new Error("Failed to fetch application stats");
      const data = await res.json();
      setApplicationStats(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchApplications = useCallback(async () => {
    try {
      setIsLoading(true);
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
  }, []);

  // Initial data fetching
  useEffect(() => {
    if (session) {
      fetchApplicationStats();
      fetchApplications();
    }
  }, [fetchApplicationStats, fetchApplications, session]);

  // Fetch when shouldFetch is true
  useEffect(() => {
    if (shouldFetch) {
      fetchApplicationStats();
      fetchApplications();
      resetFetch();
    }
  }, [shouldFetch, fetchApplicationStats, fetchApplications, resetFetch]);

  return (
    <ApplicationsContext.Provider
      value={{
        applicationStats,
        setApplicationStats,
        applications,
        setApplications,
        error,
        setError,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};
