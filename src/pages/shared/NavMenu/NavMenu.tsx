import { Link, NavLink } from "react-router";
import "./NavMenu.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu } from "lucide-react";

const NavMenu = () => {
  return (
    <div className="bg-gray-900 text-gray-300  px-6 sm:px-8 lg:px-10">
      <nav className="h-16 flex items-center">
        <Link to="/" className="navbarLink text-xl flex px-2 py-1">
          Library
        </Link>
        <div className="ml-auto flex flex-col  gap-y-1 items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
          <div className="hidden sm:inline">
            <NavLink className="navbarLink px-2 py-1" to="/books">
              All Books
            </NavLink>
            <NavLink className="navbarLink px-2 py-1 mx-2" to="/create-book">
              Add Book
            </NavLink>
            <NavLink className="navbarLink px-2 py-1" to="/borrow-summary">
              Borrow Summary
            </NavLink>
          </div>
          <div className="block sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-950 text-gray-300 mx-2">
                <DropdownMenuItem>
                  <NavLink className="px-2 py-1" to="/books">
                    All Books
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink className="px-2 py-1" to="/create-book">
                    Add Book
                  </NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <NavLink className="px-2 py-1" to="/borrow-summary">
                    Borrow Summary
                  </NavLink>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
