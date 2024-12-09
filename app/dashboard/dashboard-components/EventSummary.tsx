"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Event, EventSummaryStats } from "@/app/models/ApplicationModel";
import { useFetchTrigger } from "@/app/hooks/useFetchTrigger";
import AddEvent from "./AddEvent";

export default function EventSummary() {
  const [eventSummary, setEventSummary] = useState<EventSummaryStats[]>([]);

  const { shouldFetchEvent, resetEventSummaryFetch } = useFetchTrigger();

  // Fetch Events
  const fetchEventsCount = useCallback(async () => {
    try {
      const res = await fetch(`/api/events/count`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEventSummary(
        Array.isArray(data)
          ? data
          : []
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchEventsCount();
    resetEventSummaryFetch();
  }, [fetchEventsCount, shouldFetchEvent]);

  return (
    <Card className="flex flex-col justify-between rounded-xl h-full">
      {/* Header with Title */}
      <CardHeader>
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
      </CardHeader>

      {/* Event List */}
      <CardContent>
          <div className="grid grid-cols-3 gap-4">
          <EventSummaryItem
              label={'15 days'}
              count={eventSummary.find((item) => item.labelCode === 1)?.count || 0}
          />
          <EventSummaryItem
              label={'16-30 days'}
              count={eventSummary.find((item) => item.labelCode === 2)?.count || 0}
          />
          <EventSummaryItem
              label={'30+ days'}
              count={eventSummary.find((item) => item.labelCode === 3)?.count || 0}
          />
        </div>
      </CardContent>

      {/* Footer with Add Event Button */}
      <CardFooter>
        <AddEvent />
      </CardFooter>
    </Card>
  );
}

interface EventSummaryItemProps {
  label: string
  count: number 
}

function EventSummaryItem({ label, count }: EventSummaryItemProps) {
  return (
    <div className="flex flex-col items-center space-y-1">
      <div className="text-lg font-bold">{count}</div>
      <div className="flex gap-2">
        <div className="text-xs text-muted-foreground">{label}</div>
      </div>
      
    </div>
  )
}