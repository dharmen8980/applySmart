"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { EventApplicationDropdown } from "@/app/models/ApplicationModel";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

interface ApplicationsComboboxProps {
  onChange: (applicationId: number) => void;
}

export function ApplicationsCombobox({ onChange }: ApplicationsComboboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [applications, setApplications] = useState<EventApplicationDropdown[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<EventApplicationDropdown | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`api/events/applications-dropdown`);
        if (!res.ok) {
          setError("Failed to fetch applications");
          return;
        }
        const data = await res.json();
        setApplications(data);
      } catch (err) {
        setError("Failed to fetch applications");
      } finally {
        setIsLoading(false);
      }
    }

    fetchApplications();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const handleSelect = (application_id: number) => {
    onChange(application_id);
    setSelectedApplication(applications.find((app) => app.application_id === application_id) || null);
    setIsOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Button variant="outline" role="combobox" aria-expanded={isOpen} className="w-full justify-between" onClick={toggleDropdown}>
          {selectedApplication
            ? selectedApplication?.institution_name ||
              "Select application..."
            : "Select application..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border rounded-md shadow-lg">
            <Input
              id="applicationSearch"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
            />
            <ul className="max-h-48 overflow-y-auto">
              {applications
                .filter((application) =>
                  application.institution_name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((application) => (
                  <li
                    key={application.application_id}
                    onClick={() => handleSelect(application.application_id)}
                    className="px-4 py-2 cursor-pointer text-sm hover:bg-blue-100"
                  >
                    {application.institution_name}
                  </li>
                ))}
              {applications.length === 0 && (
                <li className="px-4 py-2 text-gray-500">No applications found</li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
