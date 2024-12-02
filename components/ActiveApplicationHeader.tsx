import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { STATUS } from "@/app/types/enum/page";

export default function ActiveApplicationHeader() {
  return (
    <div className="inline-flex items-center justify-between">
      <div className="flex items-center w-2/3 gap-2">
        <Search className="h-5 text-gray-500" />
        <Input
          type="search"
          placeholder="search application"
          className="w-full placeholder:text-gray-400 border-b-2 border-b-gray-300 focus:border-b-primary px-1 py-0 pb-1"
        />
      </div>
      <div className="text-gray-600 border-2 w-1/3 ml-4">
        <Select>
          <SelectTrigger id="status" className="p-1 h-6">
            <SelectValue placeholder="Filter By" />
          </SelectTrigger>
          <SelectContent className="p-0">
            <SelectItem value={"All"}>Default</SelectItem>
            <SelectItem value={STATUS.APPLIED}>Applied</SelectItem>
            <SelectItem value={STATUS.INPROGRESS}>In Progress</SelectItem>
            <SelectItem value={STATUS.ACCEPTED}>Accepted</SelectItem>
            <SelectItem value={STATUS.REJECTED}>Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
