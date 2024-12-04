"use client";

import { useContext } from "react";
import { FetchTriggerContext } from "../contexts/FetchTrigerContext";

export const useFetchTrigger = () => {
  const context = useContext(FetchTriggerContext);
  if (!context) {
    throw new Error("useFetchTrigger must be used within a FetchTriggerProvider");
  }
  return context;
};
