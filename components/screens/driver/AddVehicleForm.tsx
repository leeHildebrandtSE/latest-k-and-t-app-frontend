import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface AddVehicleFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (vehicle: { make: string; model: string; registrationNumber: string; color: string; year: string }) => void;
  theme?: 'admin' | 'driver';
}

export function AddVehicleForm({ open, onClose, onSubmit, theme = 'driver' }: AddVehicleFormProps) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [color, setColor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ make, model, registrationNumber, color, year });
    setMake("");
    setModel("");
    setRegistrationNumber("");
    setColor("");
    setYear("");
    onClose();
  };

  const buttonColor = theme === 'admin' ? 'bg-green-700 hover:bg-green-800' : 'bg-blue-900 hover:bg-blue-800';
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add Vehicle</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="make">Make</Label>
            <Input id="make" value={make} onChange={e => setMake(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="model">Model</Label>
            <Input id="model" value={model} onChange={e => setModel(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input id="registrationNumber" value={registrationNumber} onChange={e => setRegistrationNumber(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="color">Color</Label>
            <Input id="color" value={color} onChange={e => setColor(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="year">Year</Label>
            <Input id="year" value={year} onChange={e => setYear(e.target.value)} required />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className={`${buttonColor} text-white`}>Add Vehicle</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
