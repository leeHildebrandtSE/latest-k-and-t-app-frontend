import { Trip } from '../types';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { MapPin, Clock, DollarSign, Users, Star } from 'lucide-react';

interface TripCardProps {
  trip: Trip;
  onSelect?: (trip: Trip) => void;
  actionLabel?: string;
  showAction?: boolean;
}

export function TripCard({ trip, onSelect, actionLabel = 'View Details', showAction = true }: TripCardProps) {
  return (
    <Card className="relative rounded-2xl border-2 border-[#e0e3ea] bg-white shadow-2xl hover:shadow-3xl transition-all hover:scale-[1.02] overflow-hidden">
      {/* Top image for trip card */}
      <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-visible pb-10">
        <img
          src={trip.type === 'work' ? '/work-trip-card-image.jpg' : '/school-trip-card-image.jpg'}
          alt={trip.type === 'work' ? 'Work trip' : 'School trip'}
          className="w-full h-full object-cover rounded-t-2xl"
          style={{ pointerEvents: 'none' }}
        />
        {/* Overlapping avatar at bottom center, dissected by image */}
        <div className="absolute left-1/2 top-full -translate-x-1/2 -translate-y-[95%] z-30">
          <Avatar className="h-20 w-20 ring-4 ring-white shadow-lg">
            <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
            <AvatarFallback className="text-2xl">{trip.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
        </div>
      </div>
      <CardContent className="relative z-10 pt-12 pb-8 px-6 flex flex-col items-center">
        <h3 className="font-bold text-xl text-center mb-2">{trip.routeName}</h3>
        <p className="text-base text-muted-foreground text-center mb-1">{trip.driverName}</p>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
          <MapPin className="h-5 w-5" />
          <span>{trip.pickupLocation}</span>
          <Clock className="h-5 w-5" />
          <span>{trip.pickupTime}</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-2">
          <span>{trip.date}</span>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <span className="text-blue-700 font-bold text-lg">R{trip.price}</span>
          <Badge variant={trip.type === 'work' ? 'default' : 'secondary'} className="px-3 py-1 text-xs rounded-full">
            {trip.type === 'work' ? 'Work' : 'School'}
          </Badge>
        </div>
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
          <Users className="h-5 w-5" />
          <span>
            <span className="font-bold text-foreground">{trip.availableSeats}</span> of {trip.totalSeats} seats available
          </span>
        </div>
        {trip.availableSeats === 0 && (
          <Badge variant="destructive" className="px-3 py-1 text-xs rounded-full mb-2">Full</Badge>
        )}
        {showAction && (
          <Button 
            onClick={() => onSelect?.(trip)} 
            disabled={trip.availableSeats === 0}
            className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6 py-2 font-semibold shadow transition-colors duration-200 w-full max-w-xs mx-auto"
          >
            {actionLabel}
          </Button>
        )}
      </CardContent>
    </Card>
	);
}
