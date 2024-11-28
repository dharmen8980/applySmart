import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function ActiveApplicationSummary() {
  const activeApplications = 4;
  return (
    <Card className="rounded-xl w-full flex flex-col justify-between">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
        <Briefcase className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="grid items-stretch mt-4">
        <div className="flex justify-between h-fit">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-bold">4</p>
            <p className="text-sm text-gray-500">In Progress</p>
          </div>
          <div className="text-2xl font-bold">{activeApplications}</div>
          <div className="text-2xl font-bold">{activeApplications}</div>
          <div className="text-2xl font-bold">{activeApplications}</div>
        </div>
      </CardContent>
      <CardFooter className="bg-primary rounded-b-xl h-9 grid items-center">
        <p className="w-full text-center my-auto">Total: 20</p>
      </CardFooter>
    </Card>
  );
}
