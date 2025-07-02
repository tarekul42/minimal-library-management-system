
import App from "@/App";
import Book from "@/pages/Book/Book";
import Books from "@/pages/Book/Books";
import CreateBook from "@/pages/Book/CreateBook";
import EditBook from "@/pages/Book/EditBook";
import Borrow from "@/pages/Borrow/Borrow";
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
        Component: Book,
      },
      {
        path: "/edit-book/:id",
        Component: EditBook,
      },
      {
        path: "/borrow/:bookId",
        Component: Borrow,
      },
      {
        path: "/borrow-summary",
        Component: BorrowSummary,
      },
    ],
  },
]);
