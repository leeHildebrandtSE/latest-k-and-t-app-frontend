import { LogOut } from 'lucide-react';
import { User } from '../../../types';
import { Card, CardHeader, CardContent, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
// Removed unused and duplicate imports

interface ProfileProps {
  user: User;
  onLogout?: () => void;
  theme?: 'admin' | 'driver' | 'commuter';
}

export function Profile({ user, onLogout, theme = 'driver' }: ProfileProps) {
  let buttonColor = 'bg-blue-900 hover:bg-blue-800';
  if (theme === 'admin') buttonColor = 'bg-green-700 hover:bg-green-800';
  if (theme === 'commuter') buttonColor = 'bg-orange-600 hover:bg-orange-700';
  return (
    <div className="relative max-w-5xl mx-auto space-y-8 px-4 md:px-8 lg:px-0">
      {/* Top-right profile icon button */}
      {/* <div className="absolute top-6 right-6 z-40">
        <div className="bg-white rounded-full shadow-lg p-2 flex items-center justify-center" style={{ width: '48px', height: '48px' }}>
          <button aria-label="Profile Options" className="w-full h-full flex items-center justify-center">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
              <circle cx="12" cy="8" r="4" />
              <path d="M6 20c0-2.5 2.5-4 6-4s6 1.5 6 4" />
            </svg>
          </button>
        </div>
      </div> */}
      <div className="mb-4">
        <h1 className="text-4xl font-extrabold mb-2">Profile</h1>
        <p className="text-lg text-muted-foreground">Manage your account settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Picture */}
        <Card className="bg-white border border-[#e0e3ea] shadow-2xl rounded-2xl flex flex-col items-center justify-center py-12 px-8 transition-shadow duration-300 hover:shadow-3xl">
          <Avatar className="h-32 w-32 mb-4 ring-4 ring-white shadow-2xl transition-all duration-300">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-2xl">{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <h3 className="font-bold text-xl mb-1">{user.name}</h3>
          <p className="text-base text-muted-foreground capitalize mb-4">{user.role || 'Commuter'}</p>
          <hr className="w-full border-t border-gray-200 mb-4" />
          <Button variant="outline" className="w-full rounded-full transition-colors duration-200 hover:bg-blue-50">Change Photo</Button>
        </Card>

        {/* Personal Information */}
        <Card className="bg-white border border-[#e0e3ea] shadow-2xl rounded-2xl py-12 px-8 flex flex-col justify-center transition-shadow duration-300 hover:shadow-3xl">
          <h3 className="font-bold text-xl mb-6 text-left">Personal Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="space-y-2 text-left">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" defaultValue={user.name} className="rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" defaultValue={user.email} className="rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" defaultValue={user.phone} className="rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2 text-left">
              <Label htmlFor="role">Role</Label>
              <Input id="role" defaultValue={user.role || 'Commuter'} disabled className="capitalize rounded-lg px-4 py-2 bg-gray-100" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button className={`${buttonColor} text-white rounded-full px-6 py-2 font-semibold shadow transition-colors duration-200`}>Save Changes</Button>
            <Button variant="outline" className="rounded-full px-6 py-2 transition-colors duration-200 hover:bg-blue-50">Cancel</Button>
          </div>
        </Card>
      </div>

      {/* Account Settings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 py-6 px-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" className="rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" className="rounded-lg px-4 py-2" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input id="confirm-password" type="password" className="rounded-lg px-4 py-2" />
            </div>
            <Button className={`w-full ${buttonColor} text-white rounded-full font-semibold shadow`}>Update Password</Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-lg font-bold">Preferences</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8 py-8 px-6">
            <div className="flex items-center justify-between gap-6">
              <div className="text-left">
                <p className="font-medium">Email Notifications</p>
                <p className="text-sm text-muted-foreground">Receive trip updates via email</p>
              </div>
              <label className="inline-flex items-center cursor-pointer relative" style={{ minWidth: '64px' }}>
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <span className="w-12 h-7 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-all shadow-md"></span>
                <span className="absolute w-5 h-5 bg-white rounded-full left-1 top-1 shadow peer-checked:translate-x-5 transition-transform"></span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="text-left">
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-muted-foreground">Receive trip reminders via SMS</p>
              </div>
              <label className="inline-flex items-center cursor-pointer relative" style={{ minWidth: '64px' }}>
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <span className="w-12 h-7 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-all shadow-md"></span>
                <span className="absolute w-5 h-5 bg-white rounded-full left-1 top-1 shadow peer-checked:translate-x-5 transition-transform"></span>
              </label>
            </div>
            <div className="flex items-center justify-between gap-6">
              <div className="text-left">
                <p className="font-medium">Push Notifications</p>
                <p className="text-sm text-muted-foreground">Get real-time updates</p>
              </div>
              <label className="inline-flex items-center cursor-pointer relative" style={{ minWidth: '64px' }}>
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <span className="w-12 h-7 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-all shadow-md"></span>
                <span className="absolute w-5 h-5 bg-white rounded-full left-1 top-1 shadow peer-checked:translate-x-5 transition-transform"></span>
              </label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Account Actions */}
      {onLogout && (
        <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl mt-8">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-red-600">Account Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              variant="outline" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 rounded-full font-semibold"
              onClick={onLogout}
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Danger Zone */}
      <Card className="bg-white border border-red-200 shadow-xl rounded-2xl mt-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-red-600">Danger Zone</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive" className="rounded-full font-semibold">Delete Account</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
