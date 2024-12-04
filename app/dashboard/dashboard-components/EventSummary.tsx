"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import debounce from "lodash.debounce";
import { Event } from "@/app/models/ApplicationModel";
import { ApplicationsCombobox } from "./ApplicationsCombobox"; // Adjust the import path accordingly

export default function EventSummary() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);

  // Fetch Events
  const fetchEvents = useCallback(async () => {
    try {
      const res = await fetch(`/api/events`);
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.json();
      setEvents(
        Array.isArray(data)
          ? data.map((event: any) => ({
              ...event,
              event_date: new Date(event.event_date),
            }))
          : []
      );
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  // Add Event Function
  const addEvent = async () => {
    if (selectedApplicationId && newEventTitle && newEventDate) {
      const newEvent: Event = {
        application_id: selectedApplicationId,
        event_date: new Date(newEventDate),
        event_title: newEventTitle,
      };
      setEvents([...events, newEvent]); // Optimistically add the event
      setNewEventTitle("");
      setNewEventDate("");
      setSelectedApplicationId(null);

      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: newEventTitle,
            date: newEventDate,
            applicationId: selectedApplicationId,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to submit event:", errorData.error);
          setEvents(events.filter((event) => event !== newEvent)); // Remove optimistically added event
        }
      } catch (error) {
        console.error("Error submitting event:", error);
        setEvents(events.filter((event) => event !== newEvent)); // Remove optimistically added event
      }
    }
  };

  // Debounced Submit Handler to prevent accidental multiple submissions
  const debouncedAddEvent = React.useRef(
    debounce(() => {
      addEvent();
    }, 300)
  ).current;

  useEffect(() => {
    return () => {
      debouncedAddEvent.cancel();
    };
  }, [debouncedAddEvent]);

  return (
    <Card className="flex flex-col justify-between rounded-xl h-full">
      {/* Header with Title */}
      <CardHeader>
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
      </CardHeader>

      {/* Event List */}
      <CardContent>
        {events.length === 0 ? (
          <p>No upcoming events found.</p>
        ) : (
          <ul className="space-y-2">
            {events.map((event, index) => {
              const institutionName = event.institution_name || "Unknown Institution";

              return (
                <li key={index} className="flex justify-between items-center text-sm">
                  <span>{institutionName}</span>
                  <span className="text-muted-foreground">{event.event_date.toLocaleDateString()}</span>
                </li>
              );
            })}
          </ul>
        )}
      </CardContent>

      {/* Footer with Add Event Button */}
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full hover:bg-[#2f6783] rounded-b-xl flex items-center justify-center gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Please fill in the details for the new event.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              {/* Event Title */}
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  placeholder="Enter event title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>
              {/* Event Date */}
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} />
              </div>
              {/* Application Selection */}
              <div className="space-y-2">
                <Label htmlFor="application">Application</Label>
                <ApplicationsCombobox
                  selectedApplicationId={selectedApplicationId}
                  setSelectedApplicationId={setSelectedApplicationId}
                />
              </div>
            </div>
            <DialogClose
              onClick={debouncedAddEvent}
              className="w-full py-2 bg-primary hover:bg-[#2f6783] text-primary-foreground text-sm flex flex-row justify-center items-center mt-4 rounded"
            >
              <PlusCircle className="h-4 mr-2" />
              <span>Add Event</span>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
