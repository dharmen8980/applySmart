"use client";

import { useContext } from "react";
import { ApplicationsContext } from "../contexts/ApplicationsContext";

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (!context) {
    throw new Error("useApplications must be used within an ApplicationsProvider");
  }
  return context;
};
