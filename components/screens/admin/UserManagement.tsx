import { Driver, Commuter } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Search, MoreVertical, Star, Phone, Mail } from 'lucide-react';
import { useState } from 'react';

interface UserManagementProps {
  users: Array<Driver | Commuter>;
  userType: 'drivers' | 'commuters';
}

export function UserManagement({ users, userType }: UserManagementProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDriver = (user: Driver | Commuter): user is Driver => {
    return 'licenseNumber' in user;
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2 capitalize">{userType}</h1>
          <p className="text-muted-foreground">
            Manage {userType === 'drivers' ? 'driver' : 'commuter'} accounts
          </p>
        </div>
        <Button className="bg-blue-900 hover:bg-blue-800">
          Add {userType === 'drivers' ? 'Driver' : 'Commuter'}
        </Button>
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
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
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
