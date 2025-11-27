import { useState } from 'react';
import { Trip } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { MapPin, Clock, Calendar, Plus, Users, DollarSign, Edit, Trash2 } from 'lucide-react';

interface DriverMyTripsProps {
  trips: Trip[];
  onCreateTrip?: () => void;
  onEditTrip?: (tripId: string) => void;
  onDeleteTrip?: (tripId: string) => void;
}

export function DriverMyTrips({ trips, onCreateTrip, onEditTrip, onDeleteTrip }: DriverMyTripsProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const completedTrips = trips.filter(t => t.status === 'completed');

  const TripCard = ({ trip }: { trip: Trip }) => (
    <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-semibold">{trip.routeName}</h3>
              <Badge variant={trip.type === 'work' ? 'default' : 'secondary'}>
                {trip.type}
              </Badge>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{trip.pickupLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{trip.pickupTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{new Date(trip.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                <span>R{trip.price} per seat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              <span className="font-semibold">{trip.totalSeats - trip.availableSeats}</span> / {trip.totalSeats} seats filled
            </span>
            <span className="text-sm text-muted-foreground ml-2">
              (R{trip.price * (trip.totalSeats - trip.availableSeats)} revenue)
            </span>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEditTrip?.(trip.id)}
            >
              <Edit className="h-4 w-4 mr-1" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDeleteTrip?.(trip.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">My Trips</h1>
          <p className="text-muted-foreground">Manage your scheduled trips</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-900 hover:bg-blue-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Trip
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Trip</DialogTitle>
              <DialogDescription>
                Set up a new trip for your passengers
              </DialogDescription>
            </DialogHeader>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="route-name">Route Name</Label>
                  <Input id="route-name" placeholder="e.g., Century City to Bellville" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="trip-type">Trip Type</Label>
                  <Select>
                    <SelectTrigger id="trip-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="work">Work</SelectItem>
                      <SelectItem value="school">School</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickup">Pickup Location</Label>
                  <Input id="pickup" placeholder="e.g., Century City Mall" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination">Destination</Label>
                  <Input id="destination" placeholder="e.g., Bellville Business Park" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Pickup Time</Label>
                  <Input id="time" type="time" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="price">Price per Seat (R)</Label>
                  <Input id="price" type="number" placeholder="45" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seats">Total Seats</Label>
                  <Input id="seats" type="number" placeholder="14" />
                </div>
              </div>
              <div className="flex gap-2 pt-4">
                <Button type="submit" className="bg-blue-900 hover:bg-blue-800" onClick={(e) => {
                  e.preventDefault();
                  onCreateTrip?.();
                  setIsCreateDialogOpen(false);
                }}>
                  Create Trip
                </Button>
                <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingTrips.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedTrips.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingTrips.length > 0 ? (
            upcomingTrips.map(trip => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
              <CardContent className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground mb-2">No upcoming trips</p>
                <p className="text-sm text-muted-foreground mb-4">
                  Create your first trip to start earning
                </p>
                <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-blue-900 hover:bg-blue-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Trip
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 mt-6">
          {completedTrips.length > 0 ? (
            completedTrips.map(trip => <TripCard key={trip.id} trip={trip} />)
          ) : (
            <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No completed trips yet</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
