import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddActiveApplicationForm } from "./add-active-application-form";
import { Edit, Search } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
export default function ActiveApplicationsTable() {
  // In a real application, you would fetch this data from your backend
  const applications = [
    {
      id: 1,
      company: "TechCorp",
      location: "New York, NY",
      role: "Frontend Developer",
      hr_email: "hr@techcorp.com",
      application_link: "https://techcorp.com/careers",
      applied_date: "2023-06-01",
      status: "Interview Scheduled",
      notes: "Preparing for technical interview",
    },
    {
      id: 2,
      company: "InnoSoft",
      location: "San Francisco, CA",
      role: "Full Stack Engineer",
      hr_email: "careers@innosoft.com",
      application_link: "https://innosoft.com/jobs",
      applied_date: "2023-06-05",
      status: "Application Sent",
      notes: "Followed up on 2023-06-10",
    },
    {
      id: 3,
      company: "TechCorp",
      location: "New York, NY",
      role: "Frontend Developer",
      hr_email: "hr@techcorp.com",
      application_link: "https://techcorp.com/careers",
      applied_date: "2023-06-01",
      status: "Interview Scheduled",
      notes: "Preparing for technical interview",
    },
    {
      id: 4,
      company: "InnoSoft",
      location: "San Francisco, CA",
      role: "Full Stack Engineer",
      hr_email: "careers@innosoft.com",
      application_link: "https://innosoft.com/jobs",
      applied_date: "2023-06-05",
      status: "Application Sent",
      notes: "Followed up on 2023-06-10",
    },
    {
      id: 5,
      company: "TechCorp",
      location: "New York, NY",
      role: "Frontend Developer",
      hr_email: "hr@techcorp.com",
      application_link: "https://techcorp.com/careers",
      applied_date: "2023-06-01",
      status: "Interview Scheduled",
      notes: "Preparing for technical interview",
    },
    {
      id: 6,
      company: "InnoSoft",
      location: "San Francisco, CA",
      role: "Full Stack Engineer",
      hr_email: "careers@innosoft.com",
      application_link: "https://innosoft.com/jobs",
      applied_date: "2023-06-05",
      status: "Application Sent",
      notes: "Followed up on 2023-06-10",
    },
  ];

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-primary mb-4">Active Applications</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row items-center gap-2 justify-between mb-4">
          <div className="flex flex-row items-center gap-2">
            <Label htmlFor="search">
              <Search className="text-gray-400" />
            </Label>
            <Input
              id="search"
              placeholder="search application"
              type="search"
              className="w-full  placeholder:text-gray-400 border border-gray-400"
            />
          </div>
          <div className="flex flex-row gap-2">
            <div className="border border-gray-400">
              <Select>
                <SelectTrigger className="text-gray-400">
                  <span className="mr-4 font-semibold text-gray-500">Filter by:</span>
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent className="text-gray-500">
                  <SelectItem value="Applied">Applied</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Interviewed">Interviewed</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="border border-gray-400 ">
              <Select>
                <SelectTrigger className="text-gray-400">
                  <span className="mr-4 font-semibold text-gray-500">Sort by:</span>
                  <SelectValue placeholder="Sort By" className="text-gray-400" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Applied Date">Applied</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Interviewed">Interviewed</SelectItem>
                  <SelectItem value="Accepted">Accepted</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="border border-gray-200 rounded-xl">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Applied Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map((app) => (
                <TableRow key={app.id} className="text-gray-500">
                  <TableCell className="font-medium">{app.company}</TableCell>
                  <TableCell>{app.location}</TableCell>
                  <TableCell>{app.role}</TableCell>
                  <TableCell>{app.status}</TableCell>
                  <TableCell>{app.applied_date}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm">
                      <Edit /> Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="w-full flex flex-row justify-between items-center">
          <p>1 2 3 4 5 ...</p>
          <AddActiveApplicationForm />
        </div>
      </CardContent>
    </Card>
  );
}
