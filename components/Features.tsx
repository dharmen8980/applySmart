import { Calendar, CheckCircle, MapPin, TrendingUp } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function Features() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-[#2f6783]">Why Choose applySmart?</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <Card className="border-[#7cb3cf] hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex flex-col items-center text-center p-6">
            <CheckCircle className="w-12 h-12 text-[#3d84a8] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#2f6783]">Track Applications</h3>
            <p className="text-[#569ec2]">Keep all your applications organized in one place, from submission to decision.</p>
          </CardContent>
        </Card>
        <Card className="border-[#7cb3cf] hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex flex-col items-center text-center p-6">
            <Calendar className="w-12 h-12 text-[#3d84a8] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#2f6783]">Manage Deadlines</h3>
            <p className="text-[#569ec2]">Never miss an important date with our integrated calendar and reminder system.</p>
          </CardContent>
        </Card>
        <Card className="border-[#7cb3cf] hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex flex-col items-center text-center p-6">
            <MapPin className="w-12 h-12 text-[#3d84a8] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#2f6783]">Visualize Opportunities</h3>
            <p className="text-[#569ec2]">See your potential future mapped out with our interactive location visualizer.</p>
          </CardContent>
        </Card>
        <Card className="border-[#7cb3cf] hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex flex-col items-center text-center p-6">
            <TrendingUp className="w-12 h-12 text-[#3d84a8] mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-[#2f6783]">Track Progress</h3>
            <p className="text-[#569ec2]">Monitor your application journey with insightful analytics and progress tracking.</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
