"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddApplicationDialog() {
  const { data: session } = useSession();
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
    company_university: "",
    location: "",
    role_program: "",
    hr_email: "",
    application_link: "",
    next_event_date: "",
    status: "",
    notes: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const dataToSend = {
      ...formData,
      email: session?.user?.email,
      next_event_date: date ? format(date, "yyyy-MM-dd") : null,
    };

    try {
      const response = await fetch("/api/database/activeApplications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Application submitted successfully");
        // You might want to add some user feedback here
      } else {
        console.error("Failed to submit application");
        // You might want to add some error handling here
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      // You might want to add some error handling here
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-primary-foreground">
          Add New Application
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#ffffffd9] rounded-xl p-12">
        <DialogHeader>
          <DialogTitle>Add Application</DialogTitle>
          <DialogDescription>Enter the details of your application. Click submit when you're done.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="space-y-2">
            <Label htmlFor="company_university">Company/University</Label>
            <Input
              id="company_university"
              name="company_university"
              value={formData.company_university}
              onChange={handleChange}
              placeholder="Enter company or university name"
              className="placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="role_program">Role/Program</Label>
            <Input
              id="role_program"
              name="role_program"
              value={formData.role_program}
              onChange={handleChange}
              placeholder="Enter the role or position"
              className="placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter the location"
              className="placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select
              name="status"
              value={formData.status}
              onValueChange={(value) => handleChange({ target: { name: "status", value } } as any)}
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select application status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="applied">Applied</SelectItem>
                <SelectItem value="interviewing">Interviewing</SelectItem>
                <SelectItem value="offered">Offered</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="hr_email">HR Email</Label>
            <Input
              id="hr_email"
              name="hr_email"
              value={formData.hr_email}
              onChange={handleChange}
              type="email"
              placeholder="Enter HR email address"
              className="placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="application_link">Application Link</Label>
            <Input
              id="application_link"
              name="application_link"
              value={formData.application_link}
              onChange={handleChange}
              type="url"
              placeholder="Enter application link"
              className="placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="next_event_date">Next Event Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
              className="placeholder:text-xs placeholder:text-gray-400"
            />
          </div>
          <Button type="submit" className="w-full">
            Submit Application
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
