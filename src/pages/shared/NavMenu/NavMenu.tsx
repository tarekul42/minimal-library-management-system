import { Link, NavLink } from "react-router";
import "./NavMenu.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Menu, User, LogOut, BookOpen, Library, Users, Shield, BookMarked, DollarSign } from "lucide-react";
import { useAppSelector } from "@/redux/hook";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const NavMenu = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { logout } = useAuth();
  const isAdminOrLibrarian = user?.role === "admin" || user?.role === "librarian";

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
            <NavLink className="navbarLink px-2 py-1" to="/authors">
              <Users className="h-4 w-4 inline mr-1" />
              Authors
            </NavLink>
            <NavLink className="navbarLink px-2 py-1" to="/borrow-summary">
              Borrows
            </NavLink>

            {isAuthenticated && (
              <>
                <NavLink className="navbarLink px-2 py-1" to="/my-borrows">
                  <BookMarked className="h-4 w-4 inline mr-1" />
                  My Books
                </NavLink>
                <NavLink className="navbarLink px-2 py-1" to="/fines">
                  <DollarSign className="h-4 w-4 inline mr-1" />
                  Fines
                </NavLink>
              </>
            )}

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
                    <Link to="/profile">Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">Settings</Link>
                  </DropdownMenuItem>
                  {isAdminOrLibrarian && (
                    <>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link to="/admin" className="flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Admin Dashboard
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-400 cursor-pointer">
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
                  <NavLink to="/books">Books</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/authors">Authors</NavLink>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <NavLink to="/borrow-summary">Borrows</NavLink>
                </DropdownMenuItem>
                {isAuthenticated && (
                  <>
                    <DropdownMenuItem asChild>
                      <NavLink to="/my-borrows">My Books</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/fines">Fines</NavLink>
                    </DropdownMenuItem>
                  </>
                )}
                {isAuthenticated ? (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <NavLink to="/profile">Profile</NavLink>
                    </DropdownMenuItem>
                    {isAdminOrLibrarian && (
                      <DropdownMenuItem asChild>
                        <NavLink to="/admin">Admin</NavLink>
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={logout} className="text-red-400">
                      Sign Out
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <NavLink to="/login">Sign In</NavLink>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <NavLink to="/register">Sign Up</NavLink>
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
