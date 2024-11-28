import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function WishlistApplicationSummary() {
  // In a real application, you would fetch this data from your backend
  const wishlistCount = 8;

  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Wishlist</CardTitle>
        <Heart className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{wishlistCount}</div>
        <p className="text-xs text-muted-foreground">3 new opportunities</p>
      </CardContent>
    </Card>
  );
}
