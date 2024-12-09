"use client";
import React, { useState, useCallback, ReactNode } from "react";
import { FetchTriggerContext } from "./FetchTrigerContext";

interface FetchTriggerProviderProps {
  children: ReactNode;
}

export const FetchTriggerProvider: React.FC<FetchTriggerProviderProps> = ({ children }) => {
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);
  const [shouldFetchEvent, setShouldFetchEvent] = useState<boolean>(false);

  const triggerFetch = useCallback(() => {
    setShouldFetch(true);
  }, []);

  const resetFetch = useCallback(() => {
    setShouldFetch(false);
  }, []);

  const triggerEventSummaryFetch = useCallback(() => {
    setShouldFetchEvent(true);
  }, []);

  const resetEventSummaryFetch = useCallback(() => {
    setShouldFetchEvent(false);
  }, []);

  return (
    <FetchTriggerContext.Provider value={{ shouldFetch, shouldFetchEvent, triggerFetch, resetFetch, triggerEventSummaryFetch, resetEventSummaryFetch }}>{children}</FetchTriggerContext.Provider>
  );
};
