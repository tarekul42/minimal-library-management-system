import DeleteBook from "@/pages/Book/DeleteBook";
import React, { useState } from "react";
import { useParams } from "react-router";

const DeleteBookModalWrapper: React.FC = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  return <DeleteBook open={open} onOpenChange={setOpen} bookId={id!} />;
};

export default DeleteBookModalWrapper;
