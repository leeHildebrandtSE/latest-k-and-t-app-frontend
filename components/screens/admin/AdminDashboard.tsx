import { AnalyticsData } from '../../../types';
import { toast } from 'sonner';
import { StatCard } from '../../StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Users, Car, Calendar, TrendingUp, DollarSign, Percent } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  analytics: AnalyticsData;
  revenueData: Array<{ month: string; revenue: number }>;
  occupancyData: Array<{ route: string; occupancy: number }>;
  onNavigate?: (tab: string) => void;
}

function exportReports(analytics: AnalyticsData, revenueData: Array<{ month: string; revenue: number }>, occupancyData: Array<{ route: string; occupancy: number }>) {
  // Example: Generate CSV string
  let csv = 'Metric,Value\n';
  csv += `Total Drivers,${analytics.totalDrivers}\n`;
  csv += `Total Commuters,${analytics.totalCommuters}\n`;
  csv += `Total Trips,${analytics.totalTrips}\n`;
  csv += `Occupancy Rate,${analytics.occupancyRate}%\n`;
  csv += `Monthly Revenue,R${analytics.monthlyRevenue}\n`;
  csv += '\nRevenue Data:\nMonth,Revenue\n';
  revenueData.forEach(r => {
    csv += `${r.month},${r.revenue}\n`;
  });
  csv += '\nOccupancy Data:\nRoute,Occupancy\n';
  occupancyData.forEach(o => {
    csv += `${o.route},${o.occupancy}\n`;
  });
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'reports.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  toast.success('Reports exported as CSV');
}

export function AdminDashboard({ analytics, revenueData, occupancyData, onNavigate }: AdminDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
        <p className="text-muted-foreground">System overview and analytics</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard
          title="Total Drivers"
          value={analytics.totalDrivers}
          icon={Users}
          subtitle="Active drivers"
          iconColor="text-blue-900"
        />
        <StatCard
          title="Total Commuters"
          value={analytics.totalCommuters}
          icon={Users}
          subtitle="Registered users"
          iconColor="text-green-600"
        />
        <StatCard
          title="Total Trips"
          value={analytics.totalTrips}
          icon={Calendar}
          subtitle={`${analytics.activeRoutes} active routes`}
          iconColor="text-purple-600"
        />
        <StatCard
          title="Occupancy Rate"
          value={`${analytics.occupancyRate}%`}
          icon={Percent}
          subtitle="Average seat utilization"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Monthly Revenue"
          value={`R${analytics.monthlyRevenue.toLocaleString()}`}
          icon={DollarSign}
          subtitle="This month"
          trend={{ value: analytics.revenueGrowth, isPositive: true }}
          iconColor="text-blue-900"
        />
        <StatCard
          title="Active Routes"
          value={analytics.activeRoutes}
          icon={TrendingUp}
          subtitle="Currently operating"
          iconColor="text-teal-600"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend */}
        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => `R${value.toLocaleString()}`}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="#1e3a8a" 
                  strokeWidth={2}
                  dot={{ fill: '#1e3a8a', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Route Occupancy */}
        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Route Occupancy Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="route" angle={-45} textAnchor="end" height={100} />
                <YAxis domain={[0, 100]} />
                <Tooltip 
                  formatter={(value: number) => `${value}%`}
                  contentStyle={{ borderRadius: '8px' }}
                />
                <Bar dataKey="occupancy" fill="#1e3a8a" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Platform Status</span>
              <span className="text-sm font-medium text-green-600">● Online</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Active Sessions</span>
              <span className="text-sm font-medium">247</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">System Load</span>
              <span className="text-sm font-medium">23%</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-muted-foreground">12 new bookings today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-muted-foreground">3 drivers joined</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-muted-foreground">8 trips completed</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <button className="w-full text-left text-sm text-blue-900 hover:underline" onClick={() => onNavigate && onNavigate('drivers')}>
              View all drivers
            </button>
            <button className="w-full text-left text-sm text-blue-900 hover:underline" onClick={() => onNavigate && onNavigate('trips')}>
              Manage routes
            </button>
            <button
              className="w-full text-left text-sm text-blue-900 hover:underline"
              onClick={() => onNavigate && onNavigate('reports')}
            >
              Export reports
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
