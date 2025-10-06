import { Link } from "react-router";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

export default function Footer() {
  return (
    <>
      <footer className="text-gray-300 bg-gray-900 p-6 sm:p-8 lg:p-10">
        <div className="mx-auto flex flex-col md:flex-row justify-between items-center">
          {/* Logo and description */}
          <div className="mb-6 py-1 md:mb-0 text-center md:text-left">
            <Link to="/" className="text-2xl font-bold text-white">
              Library
            </Link>
            <p className="mt-2 text-sm max-w-xs">
              Providing seamless access to resources, user support, and
              essential information for efficient library management.
            </p>
          </div>

          {/* Navigation links */}
          <div className="w-full md:w-1/2 lg:w-1/3 grid grid-cols-2 justify-items-center gap-3 mb-6 md:mb-0">
            <Link className="underline hover:bg-gray-900" to="/">
              Home
            </Link>
            <Link className="underline underline-offset-2" to="/books">
              Books
            </Link>
            <Link className="underline underline-offset-2" to="/create-book">
              Add Book
            </Link>
            <Link className="underline underline-offset-2" to="/borrow-summary">
              Summary
            </Link>
          </div>
          {/* Social media icons */}
          <div className="flex space-x-4 lg:pr-6">
            <Link to="#">
              <BsFacebook className="text-xl" />
            </Link>
            <Link to="#">
              <BsTwitterX className="text-xl" />
            </Link>
            <Link to="#">
              <BsInstagram className="text-xl" />
            </Link>
            <Link to="#">
              <BsLinkedin className="text-xl" />
            </Link>
          </div>
        </div>
      </footer>
      {/* footer 2: Copyright */}
      <footer className="text-center flex items-center justify-center text-gray-500 p-2 sm:p-3 lg:p-4 text-sm bg-black">
        &copy; 2025 All rights reserved by MiLiMan'S.
      </footer>
    </>
  );
}
