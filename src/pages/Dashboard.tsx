import { Card } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { Users, CreditCard, TrendingUp, Calendar } from "lucide-react";

const stats = [
  {
    title: "Total Clients",
    value: "24",
    icon: Users,
    trend: "+2 this month",
  },
  {
    title: "Monthly Revenue",
    value: "$4,200",
    icon: CreditCard,
    trend: "+12% from last month",
  },
  {
    title: "Active Sessions",
    value: "156",
    icon: Calendar,
    trend: "18 this week",
  },
  {
    title: "Growth Rate",
    value: "12%",
    icon: TrendingUp,
    trend: "+2% from last month",
  },
];

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800">Welcome back, Trainer!</h2>
          <p className="text-gray-600">Here's what's happening with your business today.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <h3 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                  <p className="text-sm text-gray-500 mt-1">{stat.trend}</p>
                </div>
                <div className="bg-brand-100 p-3 rounded-full">
                  <stat.icon className="w-6 h-6 text-brand-600" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Recent Payments</h3>
            <div className="space-y-4">
              {/* Placeholder for payments list */}
              <p className="text-gray-500">No recent payments to display</p>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Upcoming Sessions</h3>
            <div className="space-y-4">
              {/* Placeholder for sessions list */}
              <p className="text-gray-500">No upcoming sessions scheduled</p>
            </div>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}