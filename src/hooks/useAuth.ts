import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCredentials, logout } from "@/redux/features/authSlice";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import type { ILoginCredentials, IRegisterCredentials } from "@/types/auth";

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
        localStorage.setItem("refreshToken", result.refreshToken);
        navigate("/");
      } catch (err: unknown) {
        const message = (err as { data?: { message?: string } })?.data?.message || "Login failed";
        toast.error(message);
      }
    },
    [loginMutation, dispatch, navigate],
  );

  const register = useCallback(
    async (credentials: IRegisterCredentials) => {
      try {
        const result = await registerMutation(credentials).unwrap();
        dispatch(setCredentials(result));
        localStorage.setItem("refreshToken", result.refreshToken);
        navigate("/");
      } catch (err: unknown) {
        const message = (err as { data?: { message?: string } })?.data?.message || "Registration failed";
        toast.error(message);
      }
    },
    [registerMutation, dispatch, navigate],
  );

  const handleLogout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } catch {
      // ignore
    }
    dispatch(logout());
    localStorage.removeItem("refreshToken");
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
