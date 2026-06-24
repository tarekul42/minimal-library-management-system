import { Link, NavLink } from "react-router";
import "./NavMenu.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, BookOpen, Library } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const NavMenu = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();

  return (
    <div className="bg-gray-900 text-gray-300 px-6 sm:px-8 lg:px-10">
      <nav className="h-16 flex items-center">
        <Link to="/" className="navbarLink text-xl flex items-center gap-2 px-2 py-1">
          <Library className="h-5 w-5" />
          Library
        </Link>

        <div className="ml-auto flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2">
            <NavLink className="navbarLink px-2 py-1" to="/books">
              <BookOpen className="h-4 w-4 inline mr-1" />
              Books
            </NavLink>
            <NavLink className="navbarLink px-2 py-1" to="/borrow-summary">
              Borrows
            </NavLink>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span className="max-w-[100px] truncate">{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-gray-950 text-gray-300" align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="cursor-pointer">Settings</Link>
                  </DropdownMenuItem>
                  {(user?.role === "admin" || user?.role === "librarian") && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="cursor-pointer">Admin Dashboard</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer text-red-400">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <NavLink className="navbarLink px-3 py-1" to="/login">
                  Sign In
                </NavLink>
                <NavLink
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm"
                  to="/register"
                >
                  Sign Up
                </NavLink>
              </div>
            )}
          </div>

          <div className="block sm:hidden">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Menu className="h-6 w-6" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-gray-950 text-gray-300 mx-2">
                <DropdownMenuItem asChild>
                  <NavLink className="px-2 py-1" to="/books">Books</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink className="px-2 py-1" to="/borrow-summary">Borrows</NavLink>
                </DropdownMenuItem>
                {isAuthenticated ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <NavLink className="px-2 py-1" to="/profile">Profile</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout} className="text-red-400">
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <NavLink className="px-2 py-1" to="/login">Sign In</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink className="px-2 py-1" to="/register">Sign Up</NavLink>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavMenu;
