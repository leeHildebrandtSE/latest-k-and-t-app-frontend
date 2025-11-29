import React, { useState } from "react";
import { Trip } from '../../../types';
import { Card, CardHeader, CardContent, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface TripDetailsEditProps {
  trip: Trip;
  drivers: { id: string; name: string }[];
  onSave: (updatedTrip: Trip) => void;
  onCancel: () => void;
}

export function TripDetailsEdit({ trip, drivers, onSave, onCancel }: TripDetailsEditProps) {
  const [form, setForm] = useState({ ...trip });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    onSave(form);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">Edit Trip Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Driver</label>
              <select name="driverId" value={form.driverId} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                {drivers.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">From (Pickup Location)</label>
              <Input name="pickupLocation" value={form.pickupLocation} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">To (Destination)</label>
              <Input name="destination" value={form.destination} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Date</label>
              <Input type="date" name="date" value={form.date} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Time</label>
              <Input name="pickupTime" value={form.pickupTime} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (R)</label>
              <Input type="number" name="price" value={form.price} onChange={handleChange} />
            </div>
            <div className="flex gap-4 mt-6">
              <Button className="bg-green-700 text-white" onClick={handleSave}>Save Changes</Button>
              <Button variant="outline" onClick={onCancel}>Cancel</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
