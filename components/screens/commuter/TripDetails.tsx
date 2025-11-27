import { Trip } from '../../../types';
import { Button } from '../../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Badge } from '../../ui/badge';
import { MapPreview } from '../../MapPreview';
import { MapPin, Clock, DollarSign, Users, Star, Calendar, Phone } from 'lucide-react';

interface TripDetailsProps {
  trip: Trip;
  onBack: () => void;
  onBookTrip: (trip: Trip) => void;
}

export function TripDetails({ trip, onBack, onBookTrip }: TripDetailsProps) {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Trip Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-2xl mb-2">{trip.routeName}</CardTitle>
                  <Badge variant={trip.type === 'work' ? 'default' : 'secondary'}>
                    {trip.type === 'work' ? 'Work' : 'School'}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-blue-900">R{trip.price}</p>
                  <p className="text-sm text-muted-foreground">per seat</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Route Information */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Location</p>
                    <p className="font-medium">{trip.pickupLocation}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-blue-900 mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Destination</p>
                    <p className="font-medium">{trip.destination}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup Time</p>
                    <p className="font-medium">{trip.pickupTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{new Date(trip.date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Seats Available</p>
                    <p className="font-medium">
                      {trip.availableSeats} of {trip.totalSeats} seats
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Map Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Route Map</CardTitle>
            </CardHeader>
            <CardContent>
              <MapPreview
                pickupLocation={trip.pickupLocation}
                destination={trip.destination}
              />
            </CardContent>
          </Card>
        </div>

        {/* Driver Info & Booking */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Driver Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
                  <AvatarFallback>{trip.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold">{trip.driverName}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-medium">{trip.driverRating}</span>
                    <span className="text-sm text-muted-foreground ml-1">rating</span>
                  </div>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <Button 
                  className="w-full bg-blue-900 hover:bg-blue-800" 
                  size="lg"
                  onClick={() => onBookTrip(trip)}
                  disabled={trip.availableSeats === 0}
                >
                  {trip.availableSeats === 0 ? 'Trip Full' : 'Request Seat'}
                </Button>
                {trip.availableSeats > 0 && trip.availableSeats <= 3 && (
                  <p className="text-xs text-amber-600 text-center mt-2">
                    Only {trip.availableSeats} {trip.availableSeats === 1 ? 'seat' : 'seats'} left!
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trip Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="outline" className="capitalize">{trip.status}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Trip Type</span>
                <span className="font-medium capitalize">{trip.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price per Seat</span>
                <span className="font-medium">R{trip.price}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
