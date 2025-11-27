import { Trip } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { MapPin, Clock, Calendar, Star } from 'lucide-react';

interface MyTripsProps {
  trips: Trip[];
}

export function MyTrips({ trips }: MyTripsProps) {
  const upcomingTrips = trips.filter(t => t.status === 'upcoming');
  const pastTrips = trips.filter(t => t.status === 'completed');

  const TripItem = ({ trip }: { trip: Trip }) => (
    <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl overflow-hidden flex flex-col md:flex-row items-center">
      {/* Mobile: image top, avatar overlaps bottom center; Desktop: image left, avatar overlaps right edge */}
      <div className="relative w-full md:w-40 lg:w-72 h-40 md:h-56 lg:h-72 flex-shrink-0">
        {trip.type === 'work' ? (
          <img
            src="/work-trip-card-image.jpg"
            alt="Work trip"
            className="h-full w-full object-cover md:rounded-l-2xl rounded-t-2xl"
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          <img
            src="/school-trip-card-image.jpg"
            alt="School trip"
            className="h-full w-full object-cover md:rounded-l-2xl rounded-t-2xl"
            style={{ pointerEvents: 'none' }}
          />
        )}
        {/* Avatar: mobile overlaps bottom center, desktop overlaps right edge */}
        <Avatar
          className="block md:hidden absolute left-1/2 bottom-[-48px] -translate-x-1/2 z-30 border-4 border-white shadow-xl"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)', height: '96px', width: '96px' }}
        >
          <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
          <AvatarFallback className="text-3xl">{trip.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        {/* Desktop avatar positioning */}
        <Avatar
          className="hidden md:block absolute top-1/2 right-[-32px] lg:right-[-64px] -translate-y-1/2 z-30 h-36 w-36 lg:h-40 lg:w-40 border-4 border-white shadow-xl"
          style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.12)' }}
        >
          <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
          <AvatarFallback className="text-4xl lg:text-5xl">{trip.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
      </div>
      {/* Card text: mobile below image+avatar, desktop to right */}
      <div className="w-full md:flex-1 min-w-0 p-8 flex flex-col justify-center md:ml-12 mt-12 md:mt-0">
        <h3 className="font-semibold text-xl mb-1">{trip.routeName}</h3>
        <p className="text-base text-muted-foreground mb-2">{trip.driverName}</p>
        <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-2">
          <MapPin className="h-5 w-5" />
          <span className="truncate">{trip.pickupLocation}</span>
          <Calendar className="h-5 w-5" />
          <span>{new Date(trip.date).toLocaleDateString()}</span>
          <Clock className="h-5 w-5" />
          <span>{trip.pickupTime}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-semibold text-blue-900 text-lg">R{trip.price}</span>
          <Badge variant={trip.type === 'work' ? 'default' : 'secondary'} className="capitalize px-3 py-1 text-xs rounded-full">
            {trip.type}
          </Badge>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">My Trips</h1>
        <p className="text-muted-foreground">View your upcoming and past trips</p>
      </div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingTrips.length})
          </TabsTrigger>
          <TabsTrigger value="past">
            Past ({pastTrips.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-4 mt-6">
          {upcomingTrips.length > 0 ? (
            upcomingTrips.map(trip => <TripItem key={trip.id} trip={trip} />)
          ) : (
            <>
              <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
                <CardContent className="p-12 text-center">
                  <p className="text-muted-foreground">No upcoming trips</p>
                  <p className="text-sm text-muted-foreground mt-1">Book a trip to get started</p>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>

        <TabsContent value="past" className="space-y-4 mt-6">
          {pastTrips.length > 0 ? (
            pastTrips.map(trip => <TripItem key={trip.id} trip={trip} />)
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No past trips</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
