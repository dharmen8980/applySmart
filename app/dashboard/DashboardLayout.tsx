import { ScrollArea } from "@/components/ui/scroll-area";
import ActiveApplicationSummary from "./dashboard-components/ActiveApplicationSummary";
import ActiveApplicationTable from "./dashboard-components/ActiveApplicationTable";
import CalendarCard from "./dashboard-components/CalendarCard";
import WishlistApplicationSummary from "./dashboard-components/WishlistApplicationSummary";
import WishlistApplicationsTable from "./dashboard-components/WishlistApplicationTable";
import ActiveApplications from "./ActiveApplications";

export default function DashboardLayout() {
  return (
    <div className="flex flex-col gap-9 p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ActiveApplicationSummary />
        <WishlistApplicationSummary />
        <CalendarCard className="md:col-span-2 lg:col-span-1 rounded-xl" />
      </div>
      <ScrollArea className=" pb-8">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <ActiveApplications />
          <ActiveApplications />
        </div>
        {/* <ActiveApplicationTable />
        <div className="mt-8">
          <WishlistApplicationsTable />
        </div> */}
      </ScrollArea>
    </div>
  );
}
