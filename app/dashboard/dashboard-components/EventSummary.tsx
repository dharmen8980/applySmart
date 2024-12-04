"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationData, Event } from "@/app/models/ApplicationModel";
import { useApplications } from "@/app/hooks/useApplications";

export default function EventSummary() {
  const [events, setEvents] = useState<Event[]>([]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [applicationId, setApplicationId] = useState<number | null>(null);

  const { applications, isLoading, error } = useApplications(); // Access applications from context

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch(`/api/events`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(Array.isArray(data) ? data.map((event: any) => ({ ...event, event_date: new Date(event.event_date) })) : []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = async () => {
    if (applicationId && newEventTitle && newEventDate) {
      const newEvent: Event = {
        application_id: applicationId,
        event_date: new Date(newEventDate),
        event_title: newEventTitle,
      };
      setEvents([...events, newEvent]);
      setNewEventTitle("");
      setNewEventDate("");
      setApplicationId(null);

      try {
        const response = await fetch("/api/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title: newEventTitle, date: newEventDate, applicationId }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Failed to submit event:", errorData.error);
          // Optionally, remove the event added optimistically
          setEvents(events.filter((event) => event !== newEvent));
        }
      } catch (error) {
        console.error("Error submitting event:", error);
        // Optionally, remove the event added optimistically
        setEvents(events.filter((event) => event !== newEvent));
      }
    }
  };

  return (
    <Card className="flex flex-col justify-between rounded-xl h-full">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span>{event.event_title}</span>
              <span className="text-muted-foreground">{event.event_date.toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="sm" className="w-full hover:bg-[#2f6783] rounded-b-xl">
              <PlusCircle className="h-4 w-full " />
              Add Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>Please fill in the details for the new event.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="eventTitle">Event Title</Label>
                <Input
                  id="eventTitle"
                  placeholder="Enter event title"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="eventDate">Event Date</Label>
                <Input id="eventDate" type="date" value={newEventDate} onChange={(e) => setNewEventDate(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="application">Application</Label>
                <Select
                  name="application"
                  value={applicationId?.toString() || ""}
                  onValueChange={(value) => {
                    setApplicationId(parseInt(value, 10));
                  }}
                  disabled={isLoading || error !== null}
                >
                  <SelectTrigger id="application">
                    <SelectValue
                      placeholder={isLoading ? "Loading..." : error ? "Error loading applications" : "Select application"}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    {applications.map((application) => (
                      <SelectItem key={application.application_id} value={application.application_id.toString()}>
                        {application.institution_name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogClose
              onClick={addEvent}
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
