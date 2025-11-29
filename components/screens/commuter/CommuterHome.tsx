import { useState } from 'react';
import { Trip } from '../../../types';
import { TripCard } from '../../TripCard';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Search, Filter } from 'lucide-react';

interface CommuterHomeProps {
  trips: Trip[];
  onTripSelect: (trip: Trip) => void;
}

export function CommuterHome({ trips, onTripSelect }: CommuterHomeProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tripType, setTripType] = useState<'all' | 'work' | 'school'>('all');

  const filteredTrips = trips.filter(trip => {
    const matchesSearch = trip.routeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         trip.destination.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = tripType === 'all' || trip.type === tripType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="max-w-7xl mx-auto space-y-8 px-4 md:px-8 lg:px-0">
      <div className="flex flex-col md:flex-row relative bg-gradient-to-r from-orange-100 to-amber-100 -mx-4 px-4 py-6 md:py-4 lg:mx-0 lg:rounded-2xl lg:px-8 shadow-md overflow-hidden items-center">
        <div className="relative z-10 flex-1 w-full md:w-3/5 md:pr-6 lg:pr-8">
          <h1 className="text-4xl font-extrabold mb-2 text-orange-900">Find Your Ride</h1>
          <p className="text-lg text-orange-700">Browse available lift clubs and book your seat</p>
        </div>
        <div className="relative w-full md:w-2/5 mt-6 md:mt-0 md:pl-6 lg:pl-8 flex justify-center items-center">
          <img
            src="/commuter-bags.jpg"
            alt="Commuter bags background"
            className="w-full h-40 md:h-48 lg:h-40 object-cover rounded-2xl md:rounded-r-2xl md:rounded-l-none"
            style={{ pointerEvents: 'none' }}
          />
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex gap-3 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          <Input
            placeholder="Search by route, pickup location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-14 text-lg border-2 border-[#e0e3ea] rounded-xl shadow focus:border-orange-500 focus:ring-2 focus:ring-orange-200 transition-all"
          />
        </div>
        <Button variant="outline" size="icon" className="h-14 w-14 border-2 border-[#e0e3ea] rounded-xl shadow hover:border-orange-500 hover:bg-orange-50 transition-colors">
          <Filter className="h-6 w-6" />
        </Button>
      </div>

      {/* Filter Tabs */}
      <div className="flex justify-center w-full my-2">
        <Tabs value={tripType} onValueChange={(value) => setTripType(value as any)} className="w-full">
          <TabsList className="flex w-full max-w-xl mx-auto bg-orange-100 rounded-2xl shadow-lg p-2 gap-2">
            <TabsTrigger value="all" className="flex-1 rounded-xl px-6 py-3 text-base font-bold transition-colors duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-orange-900 shadow-sm">
              All Trips
            </TabsTrigger>
            <TabsTrigger value="work" className="flex-1 rounded-xl px-6 py-3 text-base font-bold transition-colors duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-orange-900 shadow-sm">
              Work
            </TabsTrigger>
            <TabsTrigger value="school" className="flex-1 rounded-xl px-6 py-3 text-base font-bold transition-colors duration-200 data-[state=active]:bg-orange-500 data-[state=active]:text-white data-[state=inactive]:bg-white data-[state=inactive]:text-orange-900 shadow-sm">
              School
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Trip Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredTrips.length > 0 ? (
          filteredTrips.map((trip) => (
            <TripCard
              key={trip.id}
              trip={trip}
              onSelect={onTripSelect}
              actionLabel="View Details"
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-16">
            <p className="text-lg text-muted-foreground">No trips found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
