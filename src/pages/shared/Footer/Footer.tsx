import { Link } from "react-router";


export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="mx-auto flex flex-col md:flex-row justify-between items-center px-4">
        {/* Logo and description */}
        <div className="mb-6 md:mb-0 text-center md:text-left">
          <Link href="/" className="text-2xl font-bold text-white">
            MiLiMan'S
          </Link>
          <p className="mt-2 text-sm max-w-xs">
            A footer complements the main content by providing quick links,
            legal info, and ways to connect.
          </p>
        </div>

        {/* Navigation links */}
        <nav className="flex space-x-6 mb-6 md:mb-0">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/terms">Terms</Link>
        </nav>

        {/* Social media icons */}
        <div className="flex space-x-4">
          <Link to="#">
            <Facebook className="hover:text-blue-500" />
          </Link>
          <Link href="#">
            <Twitter className="hover:text-sky-400" />
          </Link>
          <Link href="#">
            <Instagram className="hover:text-pink-500" />
          </Link>
          <Link href="#">
            <Linkedin className="hover:text-blue-600" />
          </Link>
        </div>
      </div>

      {/* Copyright */}
      <p className="text-center text-gray-500 mt-8 text-sm">
        &copy; 2025 All rights reserved by your website.
      </p>
    </footer>
  );
}
