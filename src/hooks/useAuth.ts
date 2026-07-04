import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCredentials, logout } from "@/redux/features/authSlice";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import type { ILoginCredentials, IRegisterCredentials } from "@/types/auth";
import { getApiError } from "@/lib/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const login = useCallback(
    async (credentials: ILoginCredentials) => {
      try {
        const result = await loginMutation(credentials).unwrap();
        dispatch(setCredentials(result));
        if (result.user.role === "admin" || result.user.role === "librarian") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      } catch (err: unknown) {
        toast.error(getApiError(err, "Login failed"));
      }
    },
    [loginMutation, dispatch, navigate],
  );

  const register = useCallback(
    async (credentials: IRegisterCredentials) => {
      try {
        const result = await registerMutation(credentials).unwrap();
        dispatch(setCredentials(result));
        navigate("/dashboard");
      } catch (err: unknown) {
        toast.error(getApiError(err, "Registration failed"));
      }
    },
    [registerMutation, dispatch, navigate],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // User is logged out locally regardless of server response
    }
    dispatch(logout());
    navigate("/login");
  }, [logoutMutation, dispatch, navigate]);

  const isAdmin = user?.role === "admin";
  const isLibrarian = user?.role === "librarian";

  return {
    user,
    isAuthenticated,
    isAdmin,
    isLibrarian,
    login,
    register,
    logout: handleLogout,
  };
};
