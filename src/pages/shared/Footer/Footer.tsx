import { Link } from "react-router";
import {
  BsFacebook,
  BsInstagram,
  BsLinkedin,
  BsTwitterX,
} from "react-icons/bs";

export default function Footer() {
  return (
    <footer className=" text-gray-300">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center py-6 sm:py-8 lg:py-10">
        {/* Logo and description */}
        <div className="mb-6 py-1 px-2 md:mb-0 text-center md:text-left">
          <Link to="/" className="text-2xl font-bold text-white">
            MiLiMan'S
          </Link>
          <p className="mt-2 text-sm max-w-xs">
            Providing seamless access to resources, user support, and essential
            information for efficient library management.
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex space-x-6 mb-6 md:mb-0">
          <Link className="inline-flex" to="/books">
            Books
          </Link>
          <Link to="/create-book">Add Book</Link>
          <Link to="/borrow-summary">Summary</Link>
        </nav>

        {/* Social media icons */}
        <div className="flex space-x-4">
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

      {/* Copyright */}
      <p className="text-center text-gray-500 pb-4 sm:pb-6 lg:pb-8 text-sm">
        &copy; 2025 All rights reserved by your website.
      </p>
    </footer>
  );
}
