import Features from "@/components/Features";
import Footer from "@/components/Footer";
import SampleApplications from "@/components/SampleApplications";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="bg-[#ffffff] flex flex-col container">
      <main className="flex-grow container mx-auto px-4 py-8">
        <Card className="mb-8 bg-gradient-to-r from-[#3d84a8] to-[#569ec2] text-white min-h-[300px] flex flex-col justify-center">
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

        <Footer />
      </main>
    </div>
  );
}
