import { Notification as NotificationType } from '../../../types';
import { Card, CardContent } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationsProps {
  notifications: NotificationType[];
  onMarkAsRead?: (id: string) => void;
}

export function Notifications({ notifications, onMarkAsRead }: NotificationsProps) {
  const getIcon = (type: NotificationType['type']) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-amber-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return 'Yesterday';
    return date.toLocaleDateString();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Notifications</h1>
        <p className="text-muted-foreground">Stay updated with your latest activities</p>
      </div>

      <div className="space-y-3">
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <Card 
              key={notification.id}
              className={`cursor-pointer transition-all ${
                notification.read ? 'opacity-60' : 'border-blue-200'
              }`}
              onClick={() => onMarkAsRead?.(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h4 className="font-semibold">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                        {formatDate(notification.date)}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{notification.message}</p>
                    {!notification.read && (
                      <Badge variant="default" className="mt-2 bg-blue-900">New</Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <Bell className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">No notifications</p>
              <p className="text-sm text-muted-foreground mt-1">
                You're all caught up!
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
