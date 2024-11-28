import { Calendar, MapPin } from "lucide-react";
import React from "react";

interface ActiveApplicationParams {
  name: string;
  location: string;
  role: string;
  status: string;
  event: string;
}

const ActiveApplicationCard: React.FC<ActiveApplicationParams> = ({ name, location, role, status, event }) => {
  return (
    <div className="bg-white shadow overflow-hidden border border-gray-200 rounded-xl">
      <div className="px-4 py-4 sm:px-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-[#3d84a8] truncate">{name}</p>
            <p className="text-xs text-gray-500 mt-1">{role}</p>
          </div>
          <div className="ml-2 flex-shrink-0 flex items-center">
            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-2">
              {status}
            </p>
          </div>
        </div>
        <div className="mt-1 flex  md:block lg:flex lg:justify-between space-y-2 justify-between items-center">
          <div className="lg:flex">
            <p className="flex items-center text-sm text-gray-500">
              <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
              {location}
            </p>
          </div>
          <div className="flex items-center text-sm text-gray-500 sm:mt-0 justify-items-end">
            <p className="flex gap-1">
              <Calendar className="flex-shrink-0 h-5 w-5 text-gray-400" />
              Next Event <time dateTime={event}>{new Date(event).toLocaleDateString()}</time>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveApplicationCard;
