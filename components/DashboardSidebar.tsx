import { Calendar, Heart, Notebook } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Dispatch, SetStateAction } from "react";

interface MenuItem {
  id: string;
  title: string;
  icon: React.ReactNode;
}

interface DashboardSidebarParams {
  title: string;
  setTitle: Dispatch<SetStateAction<string>>;
}

export default function DashboardSidebar({ title, setTitle }: DashboardSidebarParams) {
  // Define the menu items
  const menuItems: MenuItem[] = [
    {
      id: "Active-Applications",
      title: "Active Applications",
      icon: <Notebook className="h-4" />,
    },
    {
      id: "Upcoming-Events",
      title: "Upcoming Events",
      icon: <Calendar className="h-4" />,
    },
    {
      id: "Wishlist",
      title: "Wishlist",
      icon: <Heart className="h-4" />,
    },
  ];

  return (
    <Card className="rounded-xl">
      <CardContent className="flex flex-col w-full py-8 gap-2 ">
        {menuItems.map((item) => {
          // Determine if the current menu item is active
          const isActive = title === item.id;

          // Define the className based on the active state
          const itemClassName = isActive
            ? "inline-flex items-center text-nowrap gap-1 bg-primary text-white px-4 py-1 rounded-md"
            : "inline-flex items-center text-nowrap gap-1 text-gray-600 hover:bg-gray-200 px-4 py-1 rounded-md";

          return (
            <div key={item.id} className={itemClassName} onClick={() => setTitle(item.id)} style={{ cursor: "pointer" }}>
              {item.icon}
              {item.title}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
