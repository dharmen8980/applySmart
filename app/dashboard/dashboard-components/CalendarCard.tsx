"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";

interface CalendarCardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Event {
  date: Date;
  title: string;
}

export default function CalendarCard({ className, ...props }: CalendarCardProps) {
  const [events, setEvents] = useState<Event[]>([
    { date: new Date(2023, 5, 15), title: "Interview with TechCorp" },
    { date: new Date(2023, 5, 18), title: "Follow-up with InnoSoft" },
  ]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");

  const addEvent = () => {
    if (newEventTitle && newEventDate) {
      setEvents([...events, { date: new Date(newEventDate), title: newEventTitle }]);
      setNewEventTitle("");
      setNewEventDate("");
    }
  };

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {events.map((event, index) => (
            <li key={index} className="flex justify-between items-center text-sm">
              <span>{event.title}</span>
              <span className="text-muted-foreground">{event.date.toLocaleDateString()}</span>
            </li>
          ))}
        </ul>
      </CardContent>
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
          </div>
          <DialogClose
            onClick={addEvent}
            className="w-full py-2 bg-primary hover:bg-[#2f6783] text-primary-foreground text-sm flex flex-row justify-center items-center"
          >
            <PlusCircle className="h-4" />
            <span>Add Event</span>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
