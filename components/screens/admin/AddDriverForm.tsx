import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";

interface AddDriverFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (driver: { name: string; email: string; licenseNumber: string }) => void;
  theme?: 'admin' | 'driver';
}

export function AddDriverForm({ open, onClose, onSubmit, theme = 'admin' }: AddDriverFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ name, email, licenseNumber });
    setName("");
    setEmail("");
    setLicenseNumber("");
    onClose();
  };

  const buttonColor = theme === 'admin' ? 'bg-green-700 hover:bg-green-800' : 'bg-blue-900 hover:bg-blue-800';
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full">
        <DialogHeader>
          <DialogTitle>Add Driver</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          </div>
          <div>
            <Label htmlFor="licenseNumber">License Number</Label>
            <Input id="licenseNumber" value={licenseNumber} onChange={e => setLicenseNumber(e.target.value)} required />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" className={`${buttonColor} text-white`}>Add Driver</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
