import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ArrowRight, Calendar, MapPin } from "lucide-react";

export default function SampleApplications() {
  const applications = [
    {
      id: 1,
      name: "Stanford University",
      type: "University",
      status: "Pending",
      location: "California, USA",
      nextEvent: "2024-03-15",
      role: "Computer Science PhD",
      link: "https://stanford.edu/apply",
    },
    {
      id: 2,
      name: "Google",
      type: "Company",
      status: "Interview",
      location: "Mountain View, CA",
      nextEvent: "2024-03-10",
      role: "Software Engineer",
      link: "https://careers.google.com",
    },
    {
      id: 3,
      name: "MIT",
      type: "University",
      status: "Submitted",
      location: "Massachusetts, USA",
      nextEvent: "2024-04-01",
      role: "Data Science MSc",
      link: "https://mit.edu/apply",
    },
  ];
  return (
    <section className="my-8 py-16 bg-gray-100 shadow-md">
      <p className="text-3xl font-bold text-[#2f6783] text-center">Applications at a Glance</p>
      <div className="pt-12 px-4">
        <div>
          <div className="grid md:grid-cols-2 gap-8 border p-4">
            <div>
              {/* <h3 className="text-2xl font-bold text-center mb-6">Active Applications</h3> */}
              <div className=" shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {applications.map((app) => (
                    <li key={app.id}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#3d84a8] truncate">{app.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{app.role}</p>
                          </div>
                          <div className="ml-2 flex-shrink-0 flex items-center">
                            <p className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 mr-2">
                              {app.status}
                            </p>
                            <a
                              href={app.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-[#3d84a8] hover:text-[#2f6783] transition-colors duration-200"
                            >
                              Apply
                            </a>
                          </div>
                        </div>
                        <div className="mt-2 sm:flex sm:justify-between">
                          <div className="sm:flex">
                            <p className="flex items-center text-sm text-gray-500">
                              <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {app.location}
                            </p>
                          </div>
                          <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                            <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>
                              Next event on <time dateTime={app.nextEvent}>{new Date(app.nextEvent).toLocaleDateString()}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              {/* <h3 className="text-2xl font-bold text-center mb-6">Application Wishlist</h3> */}
              <div className=" shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                  {[
                    { name: "Harvard University", role: "MBA Program", location: "Cambridge, MA", nextEvent: "2024-05-01" },
                    { name: "Apple", role: "UX Designer", location: "Cupertino, CA", nextEvent: "2024-04-15" },
                    { name: "ETH Zurich", role: "Robotics MSc", location: "Zurich, Switzerland", nextEvent: "2024-06-30" },
                  ].map((todo, index) => (
                    <li key={index}>
                      <div className="px-4 py-4 sm:px-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-[#3d84a8] truncate">{todo.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{todo.role}</p>
                            <p className="text-sm text-gray-500 mt-2 flex items-center">
                              <MapPin className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                              {todo.location}
                            </p>
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Calendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                            <p>
                              Apply by <time dateTime={todo.nextEvent}>{new Date(todo.nextEvent).toLocaleDateString()}</time>
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          {/* <div className="mt-8 text-center col-span-2">
            <Link
              href="/dashboard"
              className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#3d84a8] hover:bg-[#2f6783]"
            >
              View All Applications <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
            </Link>
          </div> */}
        </div>
      </div>
    </section>
  );
}
