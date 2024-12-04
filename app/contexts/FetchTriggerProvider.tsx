"use client";
import React, { useState, useCallback, ReactNode } from "react";
import { FetchTriggerContext } from "./FetchTrigerContext";

interface FetchTriggerProviderProps {
  children: ReactNode;
}

export const FetchTriggerProvider: React.FC<FetchTriggerProviderProps> = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const triggerFetch = useCallback(() => {
    setShouldFetch(true);
  }, []);

  const resetFetch = useCallback(() => {
    setShouldFetch(false);
  }, []);

  return (
    <FetchTriggerContext.Provider value={{ shouldFetch, triggerFetch, resetFetch }}>{children}</FetchTriggerContext.Provider>
  );
};
