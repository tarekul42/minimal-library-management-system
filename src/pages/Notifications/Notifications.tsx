import { Navigate } from "react-router";
import { useAppSelector } from "@/redux/hook";
import {
  useGetMyNotificationsQuery,
  useMarkNotificationReadMutation,
  useMarkAllNotificationsReadMutation,
} from "@/redux/api/notificationApi";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { ErrorRetry } from "@/components/ui/error-retry";
import { toast } from "sonner";
import { Bell, CheckCheck } from "lucide-react";
import { getApiError } from "@/lib/utils";
import type { INotification } from "@/types/notification";

const typeLabel: Record<string, string> = {
  due_reminder: "Reminder",
  overdue: "Overdue",
  fine: "Fine",
  reservation_available: "Reservation",
};

const Notifications = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { data, isLoading, isError, refetch } = useGetMyNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const notifications: INotification[] = data?.data || [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkAll = async () => {
    try {
      await markAllRead().unwrap();
      toast.success("All marked as read");
    } catch (err) {
      console.error("Failed to mark all as read:", err);
      toast.error(getApiError(err, "Failed to mark all as read"));
    }
  };

  const handleMarkRead = async (id: string) => {
    try {
      await markRead(id).unwrap();
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl flex items-center gap-2">
          <Bell className="h-6 w-6" />
          Notifications
          {unreadCount > 0 && (
            <Badge className="bg-blue-600 ml-2">{unreadCount}</Badge>
          )}
        </h1>
        {unreadCount > 0 && (
          <Button variant="outline" size="sm" onClick={handleMarkAll}>
            <CheckCheck className="h-4 w-4 mr-1" /> Mark All Read
          </Button>
        )}
      </div>

      {isLoading ? (
        <Spinner size={48} />
      ) : isError ? (
        <ErrorRetry message="Failed to load notifications" onRetry={refetch} />
      ) : notifications.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
          <p className="text-lg">No notifications</p>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((n) => (
            <div
              key={n._id}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); if (!n.read) handleMarkRead(n._id); } }}
              className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                n.read
                  ? "bg-gray-900/50 border-gray-800"
                  : "bg-gray-900 border-blue-600/30"
              }`}
              onClick={() => !n.read && handleMarkRead(n._id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={n.read ? "outline" : "default"} className="text-xs">
                      {typeLabel[n.type] || n.type}
                    </Badge>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                  </div>
                  <h3 className="font-medium">{n.title}</h3>
                  <p className="text-sm text-muted-foreground">{n.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(n.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
