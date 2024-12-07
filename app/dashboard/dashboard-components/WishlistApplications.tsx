import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";

export default function WishlistApplications() {
  return (
    <Card className="rounded-xl h-full relative">
      <CardHeader>
        <CardTitle>Wishlist</CardTitle>
      </CardHeader>
      <CardContent>
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
        <WishlistApplicationsCard />
      </CardContent>
      <CardFooter className="absolute bottom-0 w-full">
        <div className="flex items-center justify-between w-full px-4 pb-4 text-sm">
          <div className="inline-flex items-center">
            <ChevronLeft className="h-4" />
            <span>Previous</span>
          </div>
          <div className="inline-flex items-center">
            <span>Next</span>
            <ChevronRight className="h-4" />
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}

function WishlistApplicationsCard() {
  return (
    <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-xl">
      <div className="px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#3d84a8] truncate">Harvard University</p>
          </div>
          <div>
            <p className="flex items-center text-gray-400 text-sm">
              <Clock className="h-4" />
              Apply by 30 days
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
