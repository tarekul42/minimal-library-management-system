import { useState } from "react";
import { useGetMyNotificationsQuery } from "@/redux/api/notificationApi";
import { useNavigate } from "react-router";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Bell, AlertCircle } from "lucide-react";

const NotificationBell = () => {
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError } = useGetMyNotificationsQuery(undefined, { pollingInterval: open ? 60000 : 0 });
  const navigate = useNavigate();
  const notifications = data?.data || [];
  const unread = notifications.filter((n) => !n.read);
  const latest = notifications.slice(0, 5);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label={`Notifications${unread.length > 0 ? ` (${unread.length} unread)` : ""}`}>
          <Bell className="h-5 w-5" aria-hidden="true" />
          {unread.length > 0 && (
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold flex items-center justify-center">
              {unread.length > 9 ? "9+" : unread.length}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-popover text-popover-foreground w-80 mr-4">
        <div className="px-3 py-2 text-sm font-medium border-b border-border">
          Notifications {unread.length > 0 && `(${unread.length} new)`}
        </div>
        {isLoading ? (
          <div className="space-y-2 px-3 py-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ) : isError ? (
          <div className="flex items-center justify-center gap-2 px-3 py-4 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" />
            Failed to load
          </div>
        ) : latest.length === 0 ? (
          <div className="px-3 py-4 text-sm text-muted-foreground text-center">No notifications</div>
        ) : (
          latest.map((n) => (
            <DropdownMenuItem key={n._id} className="cursor-pointer flex-col items-start py-2">
              <div className="flex items-center gap-2">
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                <span className="font-medium text-sm">{n.title}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate w-full pl-4">{n.message}</p>
            </DropdownMenuItem>
          ))
        )}
        <div className="border-t border-border p-1">
          <DropdownMenuItem onClick={() => navigate("/notifications")} className="justify-center text-sm text-primary cursor-pointer">
            View All
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationBell;
