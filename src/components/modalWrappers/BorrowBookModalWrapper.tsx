import Borrow from "@/pages/Borrow/Borrow";
import React from "react";
import { useState } from "react";
import { useParams } from "react-router";

const BorrowBookModalWrapper: React.FC = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  return <Borrow open={open} onOpenChange={setOpen} bookId={id!} />;
};

export default BorrowBookModalWrapper;
