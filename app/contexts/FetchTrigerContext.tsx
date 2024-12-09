import React, { createContext } from "react";

interface FetchTriggerContextType {
  shouldFetch: boolean;
  shouldFetchEvent: boolean;
  triggerFetch: () => void;
  resetFetch: () => void;
  triggerEventSummaryFetch: () => void;
  resetEventSummaryFetch: () => void;
}

export const FetchTriggerContext = createContext<FetchTriggerContextType | undefined>(undefined);
