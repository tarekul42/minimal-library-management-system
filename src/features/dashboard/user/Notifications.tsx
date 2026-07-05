import { useGetMyNotificationsQuery, useMarkNotificationReadMutation, useMarkAllNotificationsReadMutation } from "@/redux/api/notificationApi";
import { PageHeader } from "@/components/layout/PageHeader";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ErrorState } from "@/components/feedback/ErrorState";
import { EmptyState } from "@/components/feedback/EmptyState";
import { getApiError } from "@/lib/utils";
import { toast } from "sonner";
import type { INotification } from "@/types/notification";
import { Bell, CheckCheck, Mail, MailOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Seo } from "@/components/Seo";

export default function Notifications() {
  const { data, isLoading, isError, refetch } = useGetMyNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAllRead] = useMarkAllNotificationsReadMutation();

  const notifications: INotification[] = data?.data ?? [];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const handleMarkRead = async (id: string) => {
    try {
      await markRead(id).unwrap();
    } catch (err) {
      toast.error(getApiError(err, "Failed to mark as read"));
    }
  };

  const handleMarkAllRead = async () => {
    try {
      await markAllRead().unwrap();
      toast.success("All notifications marked as read");
    } catch (err) {
      toast.error(getApiError(err, "Failed to mark all as read"));
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Notifications" />
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Card key={i} className="p-0"><div className="p-4"><Skeleton className="h-5 w-3/4" /><Skeleton className="h-4 w-1/2 mt-2" /></div></Card>
          ))}
        </div>
      </div>
    );
  }

  if (isError) return <ErrorState message="Failed to load notifications" onRetry={refetch} />;

  return (
    <div className="space-y-6">
      <Seo title="Notifications" description="Stay updated with library notifications." />
      <PageHeader
        title="Notifications"
        description={unreadCount > 0 ? `${unreadCount} unread` : "No unread notifications"}
        actions={unreadCount > 0 ? (
          <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
            <CheckCheck className="mr-2 h-4 w-4" /> Mark all read
          </Button>
        ) : undefined}
      />

      {notifications.length === 0 ? (
        <EmptyState icon={Bell} title="No notifications" description="You're all caught up!" />
      ) : (
        <div className="space-y-2">
          {notifications.map((n) => (
            <Card
              key={n._id}
              className={cn("p-0 transition-colors cursor-pointer hover:bg-muted/30", !n.read && "border-primary/30 bg-primary/5")}
              onClick={() => !n.read && handleMarkRead(n._id)}
            >
              <div className="flex items-start gap-3 p-4">
                <div className="mt-0.5">
                  {n.read ? <MailOpen className="h-4 w-4 text-muted-foreground" /> : <Mail className="h-4 w-4 text-primary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className={cn("text-sm font-medium", !n.read && "text-primary")}>{n.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{new Date(n.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{n.message}</p>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0 mt-2" />}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
