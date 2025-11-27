import { useState } from 'react';
import { TripRequest, Trip } from '../../../types';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback } from '../../ui/avatar';
import { Check, X, Phone, MapPin, Clock } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';

interface TripRequestsProps {
  requests: TripRequest[];
  trips: Trip[];
  onApprove: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

export function TripRequests({ requests, trips, onApprove, onReject }: TripRequestsProps) {
  const pendingRequests = requests.filter(r => r.status === 'pending');
  const approvedRequests = requests.filter(r => r.status === 'approved');
  const rejectedRequests = requests.filter(r => r.status === 'rejected');

  const getTripDetails = (tripId: string) => trips.find(t => t.id === tripId);

  const RequestCard = ({ request }: { request: TripRequest }) => {
    const trip = getTripDetails(request.tripId);
    if (!trip) return null;

    return (
      <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarFallback>{request.commuterName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold">{request.commuterName}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                    <Phone className="h-3 w-3" />
                    <span>{request.commuterPhone}</span>
                  </div>
                </div>
                <Badge 
                  variant={
                    request.status === 'pending' ? 'outline' : 
                    request.status === 'approved' ? 'default' : 
                    'destructive'
                  }
                  className="capitalize"
                >
                  {request.status}
                </Badge>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-3">
                <p className="font-medium text-sm mb-2">{trip.routeName}</p>
                <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="truncate">{trip.pickupLocation}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{trip.pickupTime}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-muted-foreground">Seats requested:</span>
                  <span className="font-semibold ml-2">{request.seatsRequested}</span>
                </div>
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => onReject(request.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                    <Button 
                      size="sm" 
                      onClick={() => onApprove(request.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="h-4 w-4 mr-1" />
                      Approve
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Trip Requests</h1>
        <p className="text-muted-foreground">Manage booking requests from commuters</p>
      </div>

      <Tabs defaultValue="pending" className="w-full">
        <TabsList className="grid w-full max-w-lg grid-cols-3">
          <TabsTrigger value="pending">
            Pending ({pendingRequests.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedRequests.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedRequests.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4 mt-6">
          {pendingRequests.length > 0 ? (
            pendingRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4 mt-6">
          {approvedRequests.length > 0 ? (
            approvedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No approved requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4 mt-6">
          {rejectedRequests.length > 0 ? (
            rejectedRequests.map(request => (
              <RequestCard key={request.id} request={request} />
            ))
          ) : (
            <Card className="bg-white border border-[#e0e3ea] shadow-xl rounded-2xl">
              <CardContent className="p-12 text-center">
                <p className="text-muted-foreground">No rejected requests</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
