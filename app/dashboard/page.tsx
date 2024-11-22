import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { MoreHorizontal, Mail, LinkIcon } from "lucide-react";

// Mock data for demonstration purposes
const applications = [
  {
    id: 1,
    name: "Stanford University",
    type: "University",
    status: "Applied",
    date: "2023-09-15",
    location: "Stanford, CA",
    role: "Computer Science PhD",
    hrEmail: "admissions@stanford.edu",
    applicationUrl: "https://www.stanford.edu/apply",
    note: "Need to follow up on recommendation letters",
  },
  {
    id: 2,
    name: "Google",
    type: "Company",
    status: "Interview",
    date: "2023-10-01",
    location: "Mountain View, CA",
    role: "Software Engineer",
    hrEmail: "recruiting@google.com",
    applicationUrl: "https://careers.google.com",
    note: "Technical interview scheduled for next week",
  },
  {
    id: 3,
    name: "MIT",
    type: "University",
    status: "Pending",
    date: "2023-11-30",
    location: "Cambridge, MA",
    role: "Master's in AI",
    hrEmail: "gradadmissions@mit.edu",
    applicationUrl: "https://gradadmissions.mit.edu",
    note: "Waiting for transcripts to be processed",
  },
];

export default async function Dashboard() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-primary-dark">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="text-2xl text-primary-dark">Application Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">{applications.length}</p>
                <p className="text-sm text-secondary">Total Applications</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">2</p>
                <p className="text-sm text-secondary">Pending</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-primary">1</p>
                <p className="text-sm text-secondary">Interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-primary-dark">Calendar</CardTitle>
          </CardHeader>
          <CardContent>
            <Calendar mode="single" className="rounded-md border" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl text-primary-dark">Applications</CardTitle>
          <Button className="bg-primary text-white hover:bg-primary-dark">Add New</Button>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>HR Email</TableHead>
                  <TableHead>Application URL</TableHead>
                  <TableHead>Note</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="font-medium">{app.name}</TableCell>
                    <TableCell>{app.type}</TableCell>
                    <TableCell>{app.status}</TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell>{app.location}</TableCell>
                    <TableCell>{app.role}</TableCell>
                    <TableCell>
                      <a href={`mailto:${app.hrEmail}`} className="text-primary hover:underline">
                        {app.hrEmail}
                      </a>
                    </TableCell>
                    <TableCell>
                      <a
                        href={app.applicationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        <LinkIcon className="inline-block w-4 h-4 mr-1" />
                        Link
                      </a>
                    </TableCell>
                    <TableCell>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <span className="sr-only">Note</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{app.note}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Edit</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
