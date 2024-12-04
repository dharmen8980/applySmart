"use client"; // Ensure this is a Client Component

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { INSTITUTIONTYPE, STATUS } from "@/app/types/enum/page";
import { ActiveApplication } from "@/app/models/ApplicationModel";
import { useFetchTrigger } from "@/app/hooks/useFetchTrigger";

export default function AddApplicationDialog() {
  const [formData, setFormData] = useState<ActiveApplication>({
    application_type: INSTITUTIONTYPE.COMPANY,
    institution_name: "",
    location: "",
    role_program: "",
    application_link: "",
    status: STATUS.APPLIED,
    notes: "",
  });

  const [currentStep, setCurrentStep] = useState<1 | 2>(1);
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  const { triggerFetch } = useFetchTrigger(); // Consume context

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    if (Object.values(INSTITUTIONTYPE).includes(value as INSTITUTIONTYPE)) {
      setFormData((prev) => ({
        ...prev,
        application_type: value as INSTITUTIONTYPE,
      }));
    } else if (Object.values(STATUS).includes(value as STATUS)) {
      setFormData((prev) => ({ ...prev, status: value as STATUS }));
    }
  };

  const handleSubmit = async () => {
    // Prepare data to send
    const dataToSend: ActiveApplication = {
      ...formData,
    };

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        console.log("Application submitted successfully");
        setFormData({
          application_type: INSTITUTIONTYPE.COMPANY,
          institution_name: "",
          location: "",
          role_program: "",
          application_link: "",
          status: STATUS.APPLIED,
          notes: "",
        });
        setCurrentStep(1); // Reset to Step 1 after submission
        triggerFetch(); // Trigger data fetching in DashboardLayout
      } else {
        const errorData = await response.json();
        console.error("Failed to submit application:", errorData.error);
      }
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  // Focus on the first input of the current step when it changes
  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [currentStep]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-primary text-primary-foreground">
          <Plus className="h-4" />
          Add New
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-[#e6e6e6] rounded-xl p-4 sm:p-6 flex flex-col mx-auto">
        <DialogHeader className="mb-4">
          <DialogTitle>{currentStep === 1 ? "Add Application - Step 1" : "Add Application - Step 2"}</DialogTitle>
          <DialogDescription>
            {currentStep === 1
              ? "Enter the initial details of your application."
              : "Enter the remaining details and submit your application."}
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col gap-4">
          {currentStep === 1 && (
            <>
              {/* Application Type */}
              <div className="space-y-2">
                <Label htmlFor="application_type">Application Type</Label>
                <Select onValueChange={handleSelectChange} defaultValue={formData.application_type} required>
                  <SelectTrigger id="application_type">
                    <SelectValue placeholder="Select application type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={INSTITUTIONTYPE.COMPANY}>Company</SelectItem>
                    <SelectItem value={INSTITUTIONTYPE.UNIVERSITY}>University</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Institution Name */}
              <div className="space-y-2">
                <Label htmlFor="institution_name">Institution Name</Label>
                <Input
                  ref={currentStep === 1 ? firstInputRef : null}
                  id="institution_name"
                  name="institution_name"
                  value={formData.institution_name}
                  onChange={handleChange}
                  placeholder="Enter institution name"
                  className="placeholder:text-xs placeholder:text-gray-400"
                  required
                />
              </div>

              {/* Role/Program */}
              <div className="space-y-2">
                <Label htmlFor="role_program">Role/Program</Label>
                <Input
                  id="role_program"
                  name="role_program"
                  value={formData.role_program}
                  onChange={handleChange}
                  placeholder="Enter the role or program"
                  className="placeholder:text-xs placeholder:text-gray-400"
                  required
                />
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="flex gap-2 w-full">
                {/* Location */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    ref={currentStep === 2 ? firstInputRef : null}
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter the location"
                    className="placeholder:text-xs placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Status */}
                <div className="space-y-2 w-full">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={handleSelectChange} defaultValue={formData.status} required>
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select application status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value={STATUS.APPLIED}>Applied</SelectItem>
                      <SelectItem value={STATUS.INPROGRESS}>In Progress</SelectItem>
                      <SelectItem value={STATUS.ACCEPTED}>Accepted</SelectItem>
                      <SelectItem value={STATUS.REJECTED}>Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Application Link */}
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
                  required
                />
              </div>

              {/* Notes */}
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
            </>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-4">
            {currentStep === 2 && (
              <Button type="button" variant="outline" className="flex items-center gap-2" onClick={() => setCurrentStep(1)}>
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            )}
            {currentStep === 1 && <div></div>} {/* Placeholder to align the Next button */}
            {currentStep === 1 && (
              <Button type="button" variant="outline" className="flex items-center gap-2" onClick={() => setCurrentStep(2)}>
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
            {currentStep === 2 && <DialogClose onClick={handleSubmit}>Submit Application</DialogClose>}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
