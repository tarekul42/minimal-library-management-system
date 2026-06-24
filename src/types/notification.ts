export interface INotification {
  _id: string;
  user: string;
  type: "due_reminder" | "overdue" | "fine" | "reservation_available";
  title: string;
  message: string;
  read: boolean;
  readAt?: string;
  createdAt: string;
}
