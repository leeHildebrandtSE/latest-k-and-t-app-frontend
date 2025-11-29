import React, { useState } from "react";
import { Driver } from '../../../types/index';
import { Card, CardHeader, CardContent, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

interface DriverDetailsEditProps {
  driver: Driver;
  onSave: (updatedDriver: Driver) => void;
  onCancel: () => void;
}

export function DriverDetailsEdit({ driver, onSave, onCancel }: DriverDetailsEditProps) {
  const [form, setForm] = useState({ ...driver });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((prev: Driver) => ({ ...prev, [name]: value }));
  }

  function handleSave() {
    onSave(form);
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold mb-2">Edit Driver Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1">Name</label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input name="email" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <Input name="phone" value={form.phone} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">License Number</label>
              <Input name="licenseNumber" value={form.licenseNumber} onChange={handleChange} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Rating</label>
              <Input type="number" name="rating" value={form.rating} onChange={handleChange} min={0} max={5} step={0.1} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Total Trips</label>
              <Input type="number" name="totalTrips" value={form.totalTrips} onChange={handleChange} min={0} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select name="status" value={form.status} onChange={handleChange} className="w-full border rounded-lg px-4 py-2">
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
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
