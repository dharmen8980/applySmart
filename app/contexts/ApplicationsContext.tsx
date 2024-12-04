// src/contexts/ApplicationsContext.tsx

import React, { createContext } from "react";
import { ApplicationGroup, ApplicationData } from "../models/ApplicationModel";

interface ApplicationsContextType {
  applicationStats: ApplicationGroup[];
  setApplicationStats: React.Dispatch<React.SetStateAction<ApplicationGroup[]>>;
  applications: ApplicationData[];
  setApplications: React.Dispatch<React.SetStateAction<ApplicationData[]>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ApplicationsContext = createContext<ApplicationsContextType | undefined>(undefined);
