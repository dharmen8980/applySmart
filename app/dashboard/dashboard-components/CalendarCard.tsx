"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { DialogClose } from "@radix-ui/react-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ApplicationData } from "@/app/dashboard/ActiveApplications";

interface CalendarCardProps extends React.HTMLAttributes<HTMLDivElement> {}

interface Event {
  applicationId: number;
  date: Date;
  title: string;
}

export default function CalendarCard({ className, ...props }: CalendarCardProps) {
  const [events, setEvents] = useState<Event[]>([
    { applicationId: -1, date: new Date(2023, 5, 15), title: "Interview with TechCorp" },
    { applicationId: -2, date: new Date(2023, 5, 18), title: "Follow-up with InnoSoft" },
  ]);
  const [newEventTitle, setNewEventTitle] = useState("");
  const [newEventDate, setNewEventDate] = useState("");
  const [applicationId, setApplicationId] = useState<number | null>(null);
  const [applications, setApplications] = useState<ApplicationData[]>([]);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await fetch(`/api/applications`);
        if (!res.ok) throw new Error("Failed to fetch applications");
        const data = await res.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchApplications();
  }, []);

  const addEvent = () => {
    if (applicationId && newEventTitle && newEventDate) {
      setEvents([...events, { applicationId: applicationId, date: new Date(newEventDate), title: newEventTitle }]);
      setNewEventTitle("");
      setNewEventDate("");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setApplicationId(value ? parseInt(value) : null);
    console.log("Application ID:", applicationId);
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
            <div className="space-y-2">
              <Label htmlFor="status">Application</Label>
              <Select
                name="application"
                value={applications.find((app) => app.application_id === applicationId)?.institution_name}
              >
                <SelectTrigger id="application">
                  <SelectValue placeholder="Select application" />
                </SelectTrigger>
                <SelectContent>
                  {applications.map((application) => (
                    <SelectItem key={application.application_id} value={application.application_id}>
                      {application.institution_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
