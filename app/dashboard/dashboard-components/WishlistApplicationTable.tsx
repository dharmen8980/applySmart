import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AddWishlistApplicationForm } from "./add-wishlist-application-form";

export default function WishlistApplicationsTable() {
  // In a real application, you would fetch this data from your backend
  const wishlist = [
    {
      id: 1,
      company: "FutureTech",
      location: "Austin, TX",
      role: "AI Engineer",
      hr_email: "recruiting@futuretech.ai",
      application_link: "https://futuretech.ai/careers",
      notes: "Interesting AI projects",
    },
    {
      id: 2,
      company: "GreenEnergy",
      location: "Portland, OR",
      role: "Sustainability Analyst",
      hr_email: "jobs@greenenergy.com",
      application_link: "https://greenenergy.com/openings",
      notes: "Aligns with personal values",
    },
  ];

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle>Wishlist Applications</CardTitle>
        <AddWishlistApplicationForm />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Company</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishlist.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.company}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{item.role}</TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">
                    View
                  </Button>
                  <Button variant="ghost" size="sm">
                    Apply
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
