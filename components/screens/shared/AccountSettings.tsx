import React from "react";
import { Card, CardHeader, CardContent, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";

interface AccountSettingsProps {
  theme?: 'admin' | 'driver' | 'commuter';
}

export function AccountSettings({ theme = 'commuter' }: AccountSettingsProps) {
  let buttonColor = 'bg-blue-900 hover:bg-blue-800';
  let titleColor = 'text-blue-900';
  if (theme === 'admin') {
    buttonColor = 'bg-green-700 hover:bg-green-800';
    titleColor = 'text-green-900';
  }
  if (theme === 'commuter') {
    buttonColor = 'bg-orange-600 hover:bg-orange-700';
    titleColor = 'text-orange-900';
  }
  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      <Card className="shadow-2xl rounded-2xl">
        <CardHeader>
          <CardTitle className={`text-2xl font-bold ${titleColor} mb-2`}>Account Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input type="email" className="w-full border rounded-lg px-4 py-2" placeholder="Update your email" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input type="password" className="w-full border rounded-lg px-4 py-2" placeholder="Change password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notifications</label>
              <select className="w-full border rounded-lg px-4 py-2">
                <option>Email only</option>
                <option>SMS only</option>
                <option>Email & SMS</option>
                <option>None</option>
              </select>
            </div>
            <Button className={`w-full ${buttonColor} text-white rounded-lg font-semibold py-2 mt-4`}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
