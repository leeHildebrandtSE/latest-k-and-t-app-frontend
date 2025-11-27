import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { ArrowLeft, User, Mail, Lock, Phone, MapPin } from 'lucide-react';
import { Logo } from '../../Logo';

interface RegisterProps {
  onRegister: (data: RegisterData) => void;
  onBack: () => void;
}

export interface RegisterData {
  name: string;
  email: string;
  phone: string;
  password: string;
  pickupArea: string;
  destination: string;
}

export function Register({ onRegister, onBack }: RegisterProps) {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    pickupArea: '',
    destination: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRegister(formData);
  };

  const updateField = (field: keyof RegisterData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 p-4 relative"
      style={{
        paddingTop: 'calc(var(--safe-area-inset-top) + 1rem)',
        paddingBottom: 'calc(var(--safe-area-inset-bottom) + 1rem)',
      }}
    >
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img
          src="/bg-mobile-user.jpg"
          alt="Mobile user background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 w-full max-w-lg">
        <button
          type="button"
          onClick={onBack}
          className="absolute left-6 top-6 flex items-center gap-2 text-blue-200 hover:text-white text-base font-bold px-3 py-2 rounded-full bg-blue-900/60 shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back</span>
        </button>
        <div className="flex flex-col items-center mb-8">
          <Logo size="xl" variant="rounded" useImage={true} logoStyle="2" />
        </div>
        <Card className="shadow-2xl bg-white/95 backdrop-blur-sm rounded-3xl transition-transform duration-300 hover:scale-[1.02] focus-within:ring-2 focus-within:ring-blue-400" aria-label="Signup Card">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-black text-blue-900 mb-2">Create Your Account</CardTitle>
            <CardDescription className="text-blue-700 text-lg">Register as a commuter to start booking trips</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4" aria-label="Signup Form">
                {/* ...existing input fields... */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-900 font-semibold">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <Input
                      id="name"
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      aria-label="Full Name"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-900 font-semibold">Email Address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Email Address"
                      value={formData.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      aria-label="Email Address"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-blue-900 font-semibold">Phone Number</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      aria-label="Phone Number"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-blue-900 font-semibold">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={(e) => updateField('password', e.target.value)}
                      className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      aria-label="Password"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="pickupArea" className="text-blue-900 font-semibold">Pickup Area</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <Input
                      id="pickupArea"
                      placeholder="Pickup Area"
                      value={formData.pickupArea}
                      onChange={(e) => updateField('pickupArea', e.target.value)}
                      className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      aria-label="Pickup Area"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destination" className="text-blue-900 font-semibold">Destination</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                    <Input
                      id="destination"
                      placeholder="Destination"
                      value={formData.destination}
                      onChange={(e) => updateField('destination', e.target.value)}
                      className="pl-10 rounded-full bg-blue-50 border border-blue-200 focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200"
                      aria-label="Destination"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="terms" className="rounded focus:ring-2 focus:ring-blue-400" required aria-label="Agree to Terms" />
                <label htmlFor="terms" className="text-sm text-blue-700 cursor-pointer">
                  I agree to the <a href="#" className="text-blue-600 underline">Terms & Privacy</a>
                </label>
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-blue-900 to-blue-500 text-white font-bold shadow-lg py-3 text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-400"
                aria-label="Signup Button"
              >
                Sign Up
              </Button>
              <div className="text-center mt-4">
                <p className="text-sm text-blue-700">
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={onBack}
                    className="text-blue-900 hover:underline font-bold transition-transform duration-200 hover:scale-105 focus:ring-2 focus:ring-blue-400"
                    aria-label="Sign In Button"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
