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
      {/* Left-side image for work/school trips */}
      <div className="absolute left-0 top-0 h-full w-24 md:w-32 lg:w-40 z-0">
        {trip.type === 'work' ? (
          <img
            src="/work-trip-card-image.jpg"
            alt="Work trip"
            className="h-full w-full object-cover rounded-l-2xl"
            style={{ pointerEvents: 'none' }}
          />
        ) : (
          <img
            src="/school-trip-card-image.jpg"
            alt="School trip"
            className="h-full w-full object-cover rounded-l-2xl"
            style={{ pointerEvents: 'none' }}
          />
        )}
      </div>
      <CardContent className="relative z-10 p-8 flex flex-col">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 ml-24 md:ml-32 lg:ml-40">
            <div className="flex items-center gap-3 mb-3">
              <h3 className="font-bold text-lg">{trip.routeName}</h3>
              <Badge variant={trip.type === 'work' ? 'default' : 'secondary'} className="px-3 py-1 text-xs rounded-full">
                {trip.type === 'work' ? 'Work' : 'School'}
              </Badge>
            </div>
            <div className="flex items-center gap-6 text-base text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                <span>{trip.pickupLocation}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{trip.pickupTime}</span>
              </div>
            </div>
          </div>
          {trip.availableSeats === 0 && (
            <Badge variant="destructive" className="px-3 py-1 text-xs rounded-full">Full</Badge>
          )}
        </div>

        <div className="flex items-center justify-between mb-6 ml-24 md:ml-32 lg:ml-40">
          <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 ring-2 ring-white shadow">
              <AvatarImage src={trip.driverAvatar} alt={trip.driverName} />
              <AvatarFallback className="text-lg">{trip.driverName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-base">{trip.driverName}</p>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-base text-muted-foreground">{trip.driverRating}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-extrabold text-blue-900">R{trip.price}</p>
            <p className="text-sm text-muted-foreground">per seat</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t ml-24 md:ml-32 lg:ml-40">
          <div className="flex items-center gap-3 text-base">
            <Users className="h-5 w-5 text-muted-foreground" />
            <span className="text-muted-foreground">
              <span className="font-bold text-foreground">{trip.availableSeats}</span> of {trip.totalSeats} seats available
            </span>
          </div>
          {showAction && (
            <Button 
              onClick={() => onSelect?.(trip)} 
              disabled={trip.availableSeats === 0}
              className="bg-blue-900 hover:bg-blue-800 text-white rounded-full px-6 py-2 font-semibold shadow transition-colors duration-200"
            >
              {actionLabel}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
