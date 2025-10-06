
import App from "@/App";
import BorrowBookModalWrapper from "@/components/modalWrappers/BorrowBookModalWrapper";
import EditBookModalWrapper from "@/components/modalWrappers/EditBookModalWrapper";
import ViewBookModalWrapper from "@/components/modalWrappers/ViewBookModalWrapper";
import Books from "@/pages/Book/Books";
import CreateBook from "@/pages/Book/CreateBook";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: Home,
      },
      { path: "/books", 
        Component: Books },
      {
        path: "/create-book",
        Component: CreateBook,
      },
      {
        path: "/books/:id",
        Component: ViewBookModalWrapper,
      },
      {
        path: "/edit-book/:id",
        Component: EditBookModalWrapper,
      },
      {
        path: "/borrow/:bookId",
        Component: BorrowBookModalWrapper,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);
