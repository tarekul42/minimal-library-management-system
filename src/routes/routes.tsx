import App from "@/App";
import Books from "@/pages/Book/Books";
import BookDetail from "@/pages/Book/BookDetail";
import CreateBook from "@/pages/Book/CreateBook";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Profile from "@/pages/User/Profile";
import Settings from "@/pages/User/Settings";
import Authors from "@/pages/Author/Authors";
import AuthorDetail from "@/pages/Author/AuthorDetail";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import AdminBooks from "@/pages/Admin/AdminBooks";
import AdminAuthors from "@/pages/Admin/AdminAuthors";
import AdminCategories from "@/pages/Admin/AdminCategories";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "/books", element: <Books /> },
      { path: "/books/:bookId", element: <BookDetail /> },
      { path: "/create-book", element: <CreateBook /> },
      { path: "/borrow-summary", element: <BorrowSummary /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
      { path: "/authors", element: <Authors /> },
      { path: "/authors/:authorId", element: <AuthorDetail /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/books", element: <AdminBooks /> },
      { path: "/admin/authors", element: <AdminAuthors /> },
      { path: "/admin/categories", element: <AdminCategories /> },
    ],
  },
]);
