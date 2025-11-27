import { Trip, TripRequest } from '../../../types';
import { StatCard } from '../../StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { DollarSign, Users, Calendar, TrendingUp, Clock, MapPin } from 'lucide-react';

interface DriverDashboardProps {
  trips: Trip[];
  requests: TripRequest[];
}

export function DriverDashboard({ trips, requests }: DriverDashboardProps) {
  const todayTrips = trips.filter(t => {
    const tripDate = new Date(t.date);
    const today = new Date();
    return tripDate.toDateString() === today.toDateString();
  });

  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const totalSeatsBooked = trips.reduce((sum, trip) => sum + (trip.totalSeats - trip.availableSeats), 0);
  const totalRevenue = trips.reduce((sum, trip) => sum + (trip.price * (trip.totalSeats - trip.availableSeats)), 0);
  const pendingRequests = requests.filter(r => r.status === 'pending').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your overview</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Today's Trips"
          value={todayTrips.length}
          icon={Calendar}
          subtitle={`${upcomingTrips.length} upcoming`}
        />
        <StatCard
          title="Pending Requests"
          value={pendingRequests}
          icon={Users}
          subtitle="Awaiting approval"
          iconColor="text-amber-600"
        />
        <StatCard
          title="Seats Booked"
          value={totalSeatsBooked}
          icon={Users}
          subtitle="This month"
          iconColor="text-green-600"
        />
        <StatCard
          title="Revenue"
          value={`R${totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          subtitle="This month"
          trend={{ value: 8.2, isPositive: true }}
          iconColor="text-blue-900"
        />
      </div>

      {/* Today's Trips */}
      <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle>Today's Trips</CardTitle>
        </CardHeader>
        <CardContent>
          {todayTrips.length > 0 ? (
            <div className="space-y-4">
              {todayTrips.map(trip => (
                <div key={trip.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4 className="font-semibold">{trip.routeName}</h4>
                      <Badge variant={trip.type === 'work' ? 'default' : 'secondary'}>
                        {trip.type}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{trip.pickupTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        <span>{trip.pickupLocation}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {trip.totalSeats - trip.availableSeats}/{trip.totalSeats} seats filled
                    </p>
                    <p className="font-semibold text-blue-900">R{trip.price * (trip.totalSeats - trip.availableSeats)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-8">No trips scheduled for today</p>
          )}
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Performance Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Trips</span>
              <span className="font-semibold">{trips.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Upcoming Trips</span>
              <span className="font-semibold">{upcomingTrips.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Average Occupancy</span>
              <span className="font-semibold">
                {trips.length > 0 
                  ? Math.round((totalSeatsBooked / (trips.reduce((sum, t) => sum + t.totalSeats, 0))) * 100)
                  : 0}%
              </span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm">
              {requests.slice(0, 3).map(request => (
                <div key={request.id} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="font-medium">{request.commuterName}</p>
                    <p className="text-xs text-muted-foreground">
                      Requested {request.seatsRequested} seat(s)
                    </p>
                  </div>
                  <Badge 
                    variant={
                      request.status === 'pending' ? 'outline' : 
                      request.status === 'approved' ? 'default' : 
                      'destructive'
                    }
                    className="capitalize"
                  >
                    {request.status}
                  </Badge>
                </div>
              ))}
              {requests.length === 0 && (
                <p className="text-center text-muted-foreground py-4">No recent activity</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
