import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Users, Car, Shield } from 'lucide-react';
import { UserRole } from '../../../types';
import { LogoWithTagline } from '../../Logo';

interface RoleSelectionProps {
  onSelectRole: (role: UserRole) => void;
}

export function RoleSelection({ onSelectRole }: RoleSelectionProps) {
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
          src="/bg-driver-dashboard.jpg"
          alt="Driving dashboard background"
          className="w-full h-full object-cover opacity-50"
        />
      </div>
      <div className="relative z-10 w-full max-w-4xl">
        <div className="text-center mb-12">
          <LogoWithTagline size="xl" role="driver" useImage={true} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10" aria-label="Role Selection Cards">
          {/* Commuter */}
          <div className="flex justify-center">
            <Card
              className="group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-0 bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl focus-within:ring-2 focus-within:ring-orange-400 outline-none"
              aria-label="Commuter Card"
              tabIndex={0}
              onClick={() => onSelectRole('commuter')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-orange-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Users className="h-10 w-10 text-orange-600 group-hover:text-orange-700 transition-colors duration-200" />
                </div>
                <CardTitle className="text-2xl font-extrabold text-white mb-1">Commuter</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white mb-6 font-medium">Find and book rides for your daily commute</p>
                <Button
                  className="w-full rounded-full bg-white text-orange-700 font-bold shadow-lg py-3 text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-orange-400 border-2 border-orange-600 hover:text-white hover:border-white"
                  aria-label="Continue as Commuter"
                  onClick={() => onSelectRole('commuter')}
                >
                  Continue as Commuter
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Driver */}
          <div className="flex justify-center">
            <Card
              className="group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-0 bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl focus-within:ring-2 focus-within:ring-blue-400 outline-none"
              aria-label="Driver Card"
              tabIndex={0}
              onClick={() => onSelectRole('driver')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-blue-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Car className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors duration-200" />
                </div>
                <CardTitle className="text-2xl font-extrabold text-white mb-1">Driver</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white mb-6 font-medium">Offer rides and manage your lift club routes</p>
                <Button
                  className="w-full rounded-full bg-white text-blue-700 font-bold shadow-lg py-3 text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-blue-400 border-2 border-blue-600 hover:text-white hover:border-white"
                  aria-label="Continue as Driver"
                  onClick={() => onSelectRole('driver')}
                >
                  Continue as Driver
                </Button>
              </CardContent>
            </Card>
          </div>
          {/* Admin */}
          <div className="flex justify-center">
            <Card
              className="group shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer border-0 bg-gradient-to-r from-green-600 to-emerald-400 rounded-3xl focus-within:ring-2 focus-within:ring-green-400 outline-none"
              aria-label="Admin Card"
              tabIndex={0}
              onClick={() => onSelectRole('admin')}
            >
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="h-10 w-10 text-green-600 group-hover:text-green-700 transition-colors duration-200" />
                </div>
                <CardTitle className="text-2xl font-extrabold text-white mb-1">Admin</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-white mb-6 font-medium">Manage the platform and oversee operations</p>
                <Button
                  className="w-full rounded-full bg-white text-green-700 font-bold shadow-lg py-3 text-lg transition-transform duration-200 hover:scale-105 active:scale-95 focus:ring-2 focus:ring-green-400 border-2 border-green-600 hover:text-white hover:border-white"
                  aria-label="Continue as Admin"
                  onClick={() => onSelectRole('admin')}
                >
                  Continue as Admin
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
        <p className="text-center text-blue-100 mt-8 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
