import App from "@/App";
import Books from "@/pages/Book/Books";
import BookDetail from "@/pages/Book/BookDetail";
import CreateBook from "@/pages/Book/CreateBook";
import BorrowSummary from "@/pages/Borrow/BorrowSummary";
import MyBorrows from "@/pages/Borrow/MyBorrows";
import Fines from "@/pages/Fines/Fines";
import WishlistPage from "@/pages/Wishlist/WishlistPage";
import Notifications from "@/pages/Notifications/Notifications";
import Home from "@/pages/Home/Home";
import Login from "@/pages/Auth/Login";
import Register from "@/pages/Auth/Register";
import Profile from "@/pages/User/Profile";
import Settings from "@/pages/User/Settings";
import Authors from "@/pages/Author/Authors";
import AuthorDetail from "@/pages/Author/AuthorDetail";
import AdminDashboard from "@/pages/Admin/AdminDashboard";
import Dashboard from "@/pages/Admin/Dashboard";
import Reports from "@/pages/Admin/Reports";
import AdminBooks from "@/pages/Admin/AdminBooks";
import AdminAuthors from "@/pages/Admin/AdminAuthors";
import AdminCategories from "@/pages/Admin/AdminCategories";
import AdminBorrows from "@/pages/Admin/AdminBorrows";
import AdminFines from "@/pages/Admin/AdminFines";
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
      { path: "/my-borrows", element: <MyBorrows /> },
      { path: "/fines", element: <Fines /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/profile", element: <Profile /> },
      { path: "/settings", element: <Settings /> },
      { path: "/wishlist", element: <WishlistPage /> },
      { path: "/notifications", element: <Notifications /> },
      { path: "/authors", element: <Authors /> },
      { path: "/authors/:authorId", element: <AuthorDetail /> },
      { path: "/admin", element: <AdminDashboard /> },
      { path: "/admin/dashboard", element: <Dashboard /> },
      { path: "/admin/reports", element: <Reports /> },
      { path: "/admin/books", element: <AdminBooks /> },
      { path: "/admin/authors", element: <AdminAuthors /> },
      { path: "/admin/categories", element: <AdminCategories /> },
      { path: "/admin/borrows", element: <AdminBorrows /> },
      { path: "/admin/fines", element: <AdminFines /> },
    ],
  },
]);
