import { Vehicle } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Car, Users, Calendar, Plus } from 'lucide-react';
import { useState } from 'react';
import { AddVehicleForm } from './AddVehicleForm';

interface VehicleManagementProps {
  vehicles: Vehicle[];
  onAddVehicle?: () => void;
}

export function VehicleManagement({ vehicles, onAddVehicle, theme = 'driver' }: VehicleManagementProps & { theme?: 'admin' | 'driver' }) {
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [localVehicles, setLocalVehicles] = useState(vehicles);

  const handleAddVehicle = (vehicle: { make: string; model: string; registrationNumber: string; color: string; year: string }) => {
    setLocalVehicles(prev => [
      {
        id: Date.now().toString(),
        make: vehicle.make,
        model: vehicle.model,
        registrationNumber: vehicle.registrationNumber,
        color: vehicle.color,
        year: Number(vehicle.year),
        seats: 0,
        status: 'active',
        driverId: 'mock',
      },
      ...prev
    ]);
  };

  const buttonColor = theme === 'admin' ? 'bg-green-700 hover:bg-green-800' : 'bg-blue-900 hover:bg-blue-800';

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Vehicles</h1>
          <p className="text-muted-foreground">Manage your registered vehicles</p>
        </div>
        <>
          <Button onClick={() => setShowAddVehicle(true)} className={`${buttonColor} text-white`}>
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
          <AddVehicleForm
            open={showAddVehicle}
            onClose={() => setShowAddVehicle(false)}
            onSubmit={handleAddVehicle}
            theme={theme}
          />
        </>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {localVehicles.map(vehicle => (
           <Card key={vehicle.id} className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Car className="h-6 w-6 text-blue-900" />
                  </div>
                  <div>
                    <CardTitle>{vehicle.make} {vehicle.model}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">
                      {vehicle.registrationNumber}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant={
                    vehicle.status === 'active' ? 'default' : 
                    vehicle.status === 'maintenance' ? 'outline' : 
                    'destructive'
                  }
                  className="capitalize"
                >
                  {vehicle.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Color</p>
                  <p className="font-medium">{vehicle.color}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Year</p>
                  <p className="font-medium">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Seats</p>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <p className="font-medium">{vehicle.seats}</p>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="font-medium capitalize">{vehicle.status}</p>
                </div>
              </div>

              {vehicle.status === 'maintenance' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                  <p className="text-sm text-amber-800">
                    This vehicle is currently under maintenance
                  </p>
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button variant="outline" className="flex-1">
                  Edit Details
                </Button>
                <Button variant="outline" className="flex-1">
                  View Trips
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}

        {localVehicles.length === 0 && (
           <Card className="col-span-2 bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
            <CardContent className="p-12 text-center">
              <Car className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground mb-2">No vehicles registered</p>
              <p className="text-sm text-muted-foreground mb-4">
                Add your first vehicle to start creating trips
              </p>
               <Button onClick={() => setShowAddVehicle(true)} className={`${buttonColor} text-white`}>
                <Plus className="h-4 w-4 mr-2" />
                Add Vehicle
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
