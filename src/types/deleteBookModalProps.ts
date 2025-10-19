export interface DeleteBookModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookId: string | null;
}
