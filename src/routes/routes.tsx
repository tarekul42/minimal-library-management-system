import App from "@/App";
import Books from "@/pages/Book/Books";
import CreateBook from "@/pages/Book/CreateBook";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import Home from "@/pages/Home/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      { path: "/books", element: <Books /> },
      {
        path: "/create-book",
        element: <CreateBook />,
      },
      {
        path: "/borrow-summary",
        element: <BorrowSummary />,
      },
    ],
  },
]);
