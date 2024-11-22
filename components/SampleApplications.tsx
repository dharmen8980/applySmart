import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export default function SampleApplications() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-[#2f6783]">Sample Applications</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <Card className="border-[#7cb3cf]">
          <CardHeader>
            <CardTitle className="text-[#2f6783]">Stanford University</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-[#3d84a8]">Status: Pending</p>
            <p className="text-[#569ec2]">Important Date: September 15, 2023</p>
          </CardContent>
        </Card>
        <Card className="border-[#7cb3cf]">
          <CardHeader>
            <CardTitle className="text-[#2f6783]">Google</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-[#3d84a8]">Status: Interview</p>
            <p className="text-[#569ec2]">Important Date: October 1, 2023</p>
          </CardContent>
        </Card>
        <Card className="border-[#7cb3cf]">
          <CardHeader>
            <CardTitle className="text-[#2f6783]">MIT</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-semibold text-[#3d84a8]">Status: Applied</p>
            <p className="text-[#569ec2]">Important Date: November 30, 2023</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
