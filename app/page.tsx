import Features from "@/components/Features";
import Footer from "@/components/Footer";
import SampleApplications from "@/components/SampleApplications";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="flex flex-col px-4 py-8 gap-8 bg-white">
      <Card className="mb-8 bg-gradient-to-tl from-gray-300 to-gray-400 text-white min-h-[500px] flex flex-col justify-center shadow-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold mb-4">Welcome to applySmart</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl leading-relaxed">
            Streamline your application process for universities and companies. Track your progress, manage important dates, and
            visualize your opportunities all in one place. Start your journey to success today!
          </p>
        </CardContent>
      </Card>

      <SampleApplications />
      <Features />
    </main>
  );
}
