import { Expand } from "lucide-react";
import React from "react";
import { Badge } from "../../../components/ui/badge";
import { STATUS } from "@/app/types/enum/page";
import { cn } from "@/lib/utils";

interface ActiveApplicationParams {
  name: string;
  location: string;
  role: string;
  status: string;
  event: string;
}

const ActiveApplicationCard: React.FC<ActiveApplicationParams> = ({ name, role, status }) => {
  const getStatusStyles = (status: string) => {
    switch (status) {
      case STATUS.APPLIED:
        return "bg-slate-100 text-slate-800 hover:bg-slate-100";
      case STATUS.INPROGRESS:
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case STATUS.ACCEPTED:
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case STATUS.REJECTED:
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
    }
  };
  return (
    <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-xl">
      <div className="px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#3d84a8] truncate">{name}</p>
            <p className="text-xs text-gray-500 mt-1">{role}</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={cn(getStatusStyles(status), "font-normal text-[10px]")}>{status}</Badge>
            <p className="flex items-center text-gray-400 cursor-pointer">
              <Expand className="h-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveApplicationCard;
