import React, { createContext } from "react";

interface FetchTriggerContextType {
  shouldFetch: boolean;
  triggerFetch: () => void;
  resetFetch: () => void;
}

export const FetchTriggerContext = createContext<FetchTriggerContextType | undefined>(undefined);
