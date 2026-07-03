import { lazy } from "react";
import { Navigate } from "react-router";
import type { RouteObject } from "react-router";

const Home = lazy(() => import("@/features/home/Home"));
const About = lazy(() => import("@/features/static/About"));
const Contact = lazy(() => import("@/features/static/Contact"));
const BlogList = lazy(() => import("@/features/static/BlogList"));
const BlogPost = lazy(() => import("@/features/static/BlogPost"));
const Help = lazy(() => import("@/features/static/Help"));
const Privacy = lazy(() => import("@/features/static/Privacy"));
const Terms = lazy(() => import("@/features/static/Terms"));
const Books = lazy(() => import("@/features/books/Books"));
const BookDetail = lazy(() => import("@/features/books/BookDetail"));
const Authors = lazy(() => import("@/features/authors/Authors"));
const AuthorDetail = lazy(() => import("@/features/authors/AuthorDetail"));
const BorrowSummary = lazy(() => import("@/features/borrow/BorrowSummary"));
const NotFound = lazy(() => import("@/features/static/NotFound"));

export function marketingRoutes(): RouteObject[] {
  return [
    { index: true, element: <Home /> },
    { path: "books", element: <Books /> },
    { path: "books/:bookId", element: <BookDetail /> },
    { path: "authors", element: <Authors /> },
    { path: "authors/:authorId", element: <AuthorDetail /> },
    { path: "borrow-summary", element: <BorrowSummary /> },
    { path: "about", element: <About /> },
    { path: "contact", element: <Contact /> },
    { path: "blog", element: <BlogList /> },
    { path: "blog/:slug", element: <BlogPost /> },
    { path: "help", element: <Help /> },
    { path: "privacy", element: <Privacy /> },
    { path: "terms", element: <Terms /> },

    { path: "my-borrows", element: <Navigate to="/dashboard/my-borrows" replace /> },
    { path: "my-reservations", element: <Navigate to="/dashboard/my-reservations" replace /> },
    { path: "wishlist", element: <Navigate to="/dashboard/wishlist" replace /> },
    { path: "fines", element: <Navigate to="/dashboard/fines" replace /> },
    { path: "notifications", element: <Navigate to="/dashboard/notifications" replace /> },
    { path: "profile", element: <Navigate to="/dashboard/profile" replace /> },
    { path: "settings", element: <Navigate to="/dashboard/settings" replace /> },
    { path: "admin/dashboard", element: <Navigate to="/admin" replace /> },
    { path: "create-book", element: <Navigate to="/admin/books/new" replace /> },

    { path: "*", element: <NotFound /> },
  ];
}
