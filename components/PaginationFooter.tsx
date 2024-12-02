import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationFooterProps {
  currentPage: number;
  totalPages: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export default function PaginationFooter({ currentPage, totalPages, onPreviousPage, onNextPage }: PaginationFooterProps) {
  return (
    <div className="flex items-center justify-between  px-4 pb-1 w-full">
      <div className="flex flex-1 items-center justify-between">
        <Button
          variant="ghost"
          onClick={onPreviousPage}
          disabled={currentPage <= 1}
          className="flex items-center gap-1 hover:bg-white"
        >
          <ChevronLeft className="h-4" />
          Previous
        </Button>

        <div className="text-sm text-muted-foreground">
          Page {currentPage} of {totalPages}
        </div>

        <Button
          variant="ghost"
          onClick={onNextPage}
          disabled={currentPage >= totalPages}
          className="flex items-center gap-1 hover:bg-white"
        >
          Next
          <ChevronRight className="h-4" />
        </Button>
      </div>
    </div>
  );
}
