
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bell, Check, CheckCheck, Trash2, Clock, AlertTriangle, CreditCard, Calendar } from 'lucide-react';
import { useNotifications } from '@/hooks/useNotifications';
import { formatDistanceToNow } from 'date-fns';
import { cn } from '@/lib/utils';

const NotificationCenter = () => {
  const { notifications, unreadCount, loading, markAsRead, markAllAsRead, deleteNotification } = useNotifications();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white">Loading notifications...</div>
      </div>
    );
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'booking_confirmed':
        return <Calendar className="h-4 w-4 text-blue-400" />;
      case 'credit_received':
        return <CreditCard className="h-4 w-4 text-green-400" />;
      case 'referral_bonus':
        return <CreditCard className="h-4 w-4 text-purple-400" />;
      case 'system_alert':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
      case 'treatment_reminder':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-red-500/30 bg-red-500/10';
      case 'medium':
        return 'border-yellow-500/30 bg-yellow-500/10';
      default:
        return 'border-white/10 bg-white/5';
    }
  };

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CardTitle className="text-white flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notifications
            </CardTitle>
            {unreadCount > 0 && (
              <Badge className="bg-red-500/20 text-red-300 border-red-500/30">
                {unreadCount}
              </Badge>
            )}
          </div>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="outline"
              onClick={markAllAsRead}
              className="border-white/20 text-white hover:bg-white/10"
            >
              <CheckCheck className="h-4 w-4 mr-1" />
              Mark All Read
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="text-center py-8">
              <Bell className="h-12 w-12 text-white/30 mx-auto mb-3" />
              <div className="text-white/70">No notifications yet</div>
              <div className="text-white/50 text-sm">We'll notify you when something important happens</div>
            </div>
          ) : (
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-lg border transition-all cursor-pointer group",
                    getPriorityColor(notification.priority),
                    !notification.read && "ring-1 ring-blue-500/30"
                  )}
                  onClick={() => !notification.read && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          <div className={cn(
                            "font-medium text-sm",
                            notification.read ? "text-white/80" : "text-white"
                          )}>
                            {notification.title}
                          </div>
                          <div className={cn(
                            "text-sm mt-1",
                            notification.read ? "text-white/60" : "text-white/80"
                          )}>
                            {notification.message}
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            <div className="text-xs text-white/50">
                              {formatDistanceToNow(new Date(notification.created_at), { addSuffix: true })}
                            </div>
                            {!notification.read && (
                              <Badge variant="outline" className="border-blue-500/30 text-blue-300 text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          {!notification.read && (
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                markAsRead(notification.id);
                              }}
                              className="h-8 w-8 p-0 text-white/60 hover:text-white hover:bg-white/10"
                            >
                              <Check className="h-3 w-3" />
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteNotification(notification.id);
                            }}
                            className="h-8 w-8 p-0 text-white/60 hover:text-red-400 hover:bg-red-500/20"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default NotificationCenter;
