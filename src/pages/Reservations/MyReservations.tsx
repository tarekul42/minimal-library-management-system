import { useGetMyReservationsQuery, useCancelReservationMutation } from "@/redux/api/reservationApi";
import { Link } from "react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, XCircle, Clock, CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { IReservation } from "@/types/reservation";

const statusConfig: Record<string, { label: string; className: string; icon: React.ReactNode }> = {
  waiting: { label: "Waiting", className: "bg-amber-600", icon: <Clock className="h-3 w-3 mr-1" /> },
  fulfilled: { label: "Ready for Pickup", className: "bg-green-600", icon: <CheckCircle className="h-3 w-3 mr-1" /> },
  cancelled: { label: "Cancelled", className: "bg-gray-600", icon: <XCircle className="h-3 w-3 mr-1" /> },
};

const MyReservations = () => {
  const { data, isLoading } = useGetMyReservationsQuery();
  const [cancelReservation] = useCancelReservationMutation();

  const reservations: IReservation[] = data?.data || [];

  const handleCancel = async (id: string) => {
    try {
      await cancelReservation(id).unwrap();
      toast.success("Reservation cancelled");
    } catch {
      toast.error("Failed to cancel reservation");
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Spinner size={48} />
      </div>
    );
  }

  return (
    <div className="w-full p-6 sm:p-8 lg:p-10 xl:py-10 xl:px-0">
      <h1 className="text-3xl mb-6">My Reservations</h1>

      {reservations.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-lg text-muted-foreground">No reservations yet</p>
          <p className="text-sm text-muted-foreground mb-4">
            Reserve books that are currently unavailable
          </p>
          <Link to="/books">
            <Button variant="outline">Browse Books</Button>
          </Link>
        </div>
      ) : (
        <div className="grid gap-4">
          {reservations.map((reservation) => {
            const status = statusConfig[reservation.status] || statusConfig.waiting;
            const bookTitle = typeof reservation.book === "object" ? reservation.book.title : "Unknown";
            const bookId = typeof reservation.book === "object" ? reservation.book._id : "";

            return (
              <Card key={reservation._id} className="bg-gray-900 border-gray-800">
                <CardContent className="flex items-center justify-between p-4">
                  <div className="flex-1">
                    <Link to={`/books/${bookId}`} className="text-lg font-medium hover:underline">
                      {bookTitle}
                    </Link>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={status.className}>
                        {status.icon}
                        {status.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(reservation.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {reservation.status === "waiting" && (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive border-destructive"
                      onClick={() => handleCancel(reservation._id)}
                    >
                      <XCircle className="h-4 w-4 mr-1" />
                      Cancel
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MyReservations;
