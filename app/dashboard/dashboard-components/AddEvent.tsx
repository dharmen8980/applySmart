'use client';

import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { ApplicationsCombobox } from "./ApplicationsCombobox";
import { useState } from "react";
import { useFetchTrigger } from "@/app/hooks/useFetchTrigger";
import { Event } from "@/app/models/ApplicationModel";
import { useToast } from "@/hooks/use-toast";

export default function AddEvent() {
    const [event, setEvent] = useState<Event | null>();
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [selectedApplicationId, setSelectedApplicationId] = useState<number | null>(null);
  const { toast } = useToast();

  const { triggerEventSummaryFetch, resetEventSummaryFetch } = useFetchTrigger();

  const resetForm = () => {
    setNewEventTitle("");
    setNewEventDate("");
    setSelectedApplicationId(null);
  }

  // Add Event Function
  const addEvent = async () => {
    if (selectedApplicationId && newEventTitle && newEventDate) {
      const newEvent: Event = {
        application_id: selectedApplicationId,
        event_date: new Date(newEventDate),
        event_title: newEventTitle,
      };
      setEvent(newEvent);
      resetForm();
      
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
          setEvent(null); 
        } else {
          toast({
            description: "Event added successfully",
            title: "Success",
          });
          triggerEventSummaryFetch();
        }
      } catch (error) {
        console.error("Error submitting event:", error);
        setEvent(null); 
      }
    } else {
      console.error("Missing required fields");
    }
  };

  return (
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
                  onChange={(applicationId) => setSelectedApplicationId(applicationId)}
                />
              </div>
            </div>
            <DialogClose
              onClick={addEvent}
              disabled={!newEventTitle || !newEventDate || !(selectedApplicationId !== null)}
              className={`w-full py-2 text-sm flex flex-row justify-center items-center mt-4 rounded ${
                (!newEventTitle || !newEventDate || !(selectedApplicationId !== null))
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
                  : "bg-primary hover:bg-[#2f6783] text-primary-foreground"
              }`} 
            >
              <PlusCircle className="h-4 mr-2" />
              <span>Add Event</span>
            </DialogClose>
          </DialogContent>
        </Dialog>
    );
}