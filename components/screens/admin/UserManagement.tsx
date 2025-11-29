import { Driver, Commuter } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Search, MoreVertical, Star, Phone, Mail, Eye, Edit, Trash2 } from 'lucide-react';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '../../ui/dropdown-menu';
import { useState } from 'react';
import { AddDriverForm } from './AddDriverForm';
import { DriverDetailsEdit } from './DriverDetailsEdit';

interface UserManagementProps {
  users: Array<Driver | Commuter>;
  userType: 'drivers' | 'commuters';
}

export function UserManagement({ users, userType }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddDriver, setShowAddDriver] = useState(false);
  const [localUsers, setLocalUsers] = useState(users);
  const [editingDriver, setEditingDriver] = useState<Driver | null>(null);
  const [viewingDriver, setViewingDriver] = useState<Driver | null>(null);

  const filteredUsers = localUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDriver = (user: Driver | Commuter): user is Driver => {
    return 'licenseNumber' in user;
  };

  const handleAddDriver = (driver: { name: string; email: string; licenseNumber: string }) => {
    // Mock: Add new driver to local state
    setLocalUsers(prev => [
      {
        id: Date.now().toString(),
        name: driver.name,
        email: driver.email,
        licenseNumber: driver.licenseNumber,
        phone: '',
        avatar: '',
        rating: 5,
        totalTrips: 0,
        vehicles: [],
        status: 'active',
        role: 'driver',
      },
      ...prev
    ]);
  };

  // Conditional screens must be returned before main JSX
  if (editingDriver) {
    return (
      <DriverDetailsEdit
        driver={editingDriver}
        onSave={updatedDriver => {
          setLocalUsers(prev => prev.map(d => d.id === updatedDriver.id ? updatedDriver : d));
          setEditingDriver(null);
        }}
        onCancel={() => setEditingDriver(null)}
      />
    );
  }
  if (viewingDriver) {
    return (
      <div className="max-w-xl mx-auto py-10 px-4">
        <Card className="shadow-2xl rounded-2xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold mb-2">Driver Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div><strong>Name:</strong> {viewingDriver.name}</div>
              <div><strong>Email:</strong> {viewingDriver.email}</div>
              <div><strong>Phone:</strong> {viewingDriver.phone}</div>
              <div><strong>License Number:</strong> {viewingDriver.licenseNumber}</div>
              <div><strong>Rating:</strong> {viewingDriver.rating}</div>
              <div><strong>Total Trips:</strong> {viewingDriver.totalTrips}</div>
              <div><strong>Status:</strong> {viewingDriver.status}</div>
              <Button className="mt-6" variant="outline" onClick={() => setViewingDriver(null)}>Close</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 capitalize">{userType}</h1>
          <p className="text-muted-foreground">
            Manage {userType === 'drivers' ? 'driver' : 'commuter'} accounts
          </p>
        </div>
        {userType === 'drivers' ? (
          <>
            <Button className="bg-green-700 hover:bg-green-800 text-white" onClick={() => setShowAddDriver(true)}>
              Add Driver
            </Button>
            <AddDriverForm
              open={showAddDriver}
              onClose={() => setShowAddDriver(false)}
              onSubmit={handleAddDriver}
            />
          </>
        ) : (
          <Button className="bg-green-700 hover:bg-green-800 text-white">
            Add Commuter
          </Button>
        )}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder={`Search ${userType}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>
            {userType === 'drivers' ? 'All Drivers' : 'All Commuters'} ({filteredUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Contact</TableHead>
                  {userType === 'drivers' ? (
                    <>
                      <TableHead>License</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Total Trips</TableHead>
                    </>
                  ) : (
                    <>
                      <TableHead>Pickup Area</TableHead>
                      <TableHead>Destination</TableHead>
                    </>
                  )}
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        <span>{user.phone}</span>
                      </div>
                    </TableCell>
                    {isDriver(user) ? (
                      <>
                        <TableCell className="text-sm">{user.licenseNumber}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                            <span className="font-medium">{user.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>{user.totalTrips}</TableCell>
                      </>
                    ) : (
                      <>
                        <TableCell className="text-sm">{user.pickupArea}</TableCell>
                        <TableCell className="text-sm">{user.destination}</TableCell>
                      </>
                    )}
                      <TableCell>
                        <Badge variant="default">Active</Badge>
                      </TableCell>
                      <TableCell>
                        {isDriver(user) ? (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl min-w-[140px]">
                              <DropdownMenuItem onClick={() => setViewingDriver(user)}>
                                <Eye className="h-4 w-4 mr-2" /> View
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setEditingDriver(user)}>
                                <Edit className="h-4 w-4 mr-2" /> Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => setLocalUsers(prev => prev.filter(d => d.id !== user.id))} className="text-red-600">
                                <Trash2 className="h-4 w-4 mr-2" /> Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        ) : (
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
