import Book from "@/pages/Book/Book";
import type React from "react";
import { useState } from "react";
import { useParams } from "react-router";

const ViewBookModalWrapper: React.FC = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  return <Book open={open} onOpenChange={setOpen} bookId={id!} />;
};

export default ViewBookModalWrapper;
