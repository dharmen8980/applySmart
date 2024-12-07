"use client";
import ActiveApplicationSummary from "./dashboard-components/ActiveApplicationSummary";
import EventSummary from "./dashboard-components/EventSummary";
import WishlistApplicationSummary from "./dashboard-components/WishlistApplicationSummary";
import ActiveApplications from "./ActiveApplications";
import WishlistApplications from "./dashboard-components/WishlistApplications";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useState } from "react";
import UpcomingEvents from "./dashboard-components/UpcomingEvents";

export default function DashboardLayout() {
  const [title, setTitle] = useState<string>("Active-Applications");

  const renderContent = () => {
    switch (title) {
      case "Active-Applications":
        return <ActiveApplications />;
      case "Upcoming-Events":
        return <EventSummary />;
      case "Wishlist":
        return <WishlistApplications />;
      default:
        return <ActiveApplications />;
    }
  };

  return (
    <div className="flex flex-col gap-9 p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ActiveApplicationSummary />
        <WishlistApplicationSummary />
        <div className="md:col-span-2 lg:col-span-1">
          <EventSummary />
        </div>
      </div>

      <div className="flex w-full gap-4 mb-12 min-h-[590px]">
        <DashboardSidebar title={title} setTitle={setTitle} />
        <div className="flex-1">{renderContent()}</div>
      </div>
    </div>
  );
}
