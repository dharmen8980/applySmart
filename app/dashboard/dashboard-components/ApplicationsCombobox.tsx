"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils"; // Utility for conditional classNames
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import debounce from "lodash.debounce";

interface Application {
  application_id: number;
  institution_name: string;
  // Add other relevant fields if necessary
}

interface ApplicationsComboboxProps {
  selectedApplicationId: number | null;
  setSelectedApplicationId: React.Dispatch<React.SetStateAction<number | null>>;
}

export function ApplicationsCombobox({ selectedApplicationId, setSelectedApplicationId }: ApplicationsComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);

  // Debounced fetch function
  const fetchApplications = React.useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setApplications([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/applications?searchQuery=${encodeURIComponent(query)}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch applications.");
        }

        const data = await response.json();
        setApplications(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
      } finally {
        setIsLoading(false);
      }
    }, 500),
    []
  );

  // Handle input changes with debouncing
  const handleInputChange = (value: string) => {
    setInputValue(value);
    fetchApplications(value);
  };

  // Cleanup debounce on unmount
  React.useEffect(() => {
    return () => {
      fetchApplications.cancel();
    };
  }, [fetchApplications]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
          {selectedApplicationId
            ? applications.find((app) => app.application_id === selectedApplicationId)?.institution_name ||
              "Select application..."
            : "Select application..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput
            placeholder="Search applications..."
            value={inputValue}
            onValueChange={(value) => handleInputChange(value)}
          />
          <CommandList>
            {isLoading ? (
              <CommandEmpty>Loading applications...</CommandEmpty>
            ) : error ? (
              <CommandEmpty>Error loading applications.</CommandEmpty>
            ) : applications.length === 0 ? (
              <CommandEmpty>No applications found.</CommandEmpty>
            ) : (
              <CommandGroup heading="Applications">
                {applications.map((application) => (
                  <CommandItem
                    key={application.application_id}
                    value={application.application_id.toString()}
                    onSelect={(currentValue) => {
                      const id = parseInt(currentValue, 10);
                      setSelectedApplicationId(id === selectedApplicationId ? null : id);
                      setOpen(false);
                      setInputValue("");
                    }}
                  >
                    {application.institution_name}
                    {selectedApplicationId === application.application_id && (
                      <Check
                        className={cn(
                          "ml-auto h-4 w-4",
                          selectedApplicationId === application.application_id ? "opacity-100" : "opacity-0"
                        )}
                      />
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
