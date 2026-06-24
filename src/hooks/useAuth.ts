import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCredentials, logout } from "@/redux/features/authSlice";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "@/redux/api/authApi";
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
      const result = await loginMutation(credentials).unwrap();
      dispatch(setCredentials(result));
      localStorage.setItem("refreshToken", result.refreshToken);
      navigate("/");
    },
    [loginMutation, dispatch, navigate],
  );

  const register = useCallback(
    async (credentials: IRegisterCredentials) => {
      const result = await registerMutation(credentials).unwrap();
      dispatch(setCredentials(result));
      localStorage.setItem("refreshToken", result.refreshToken);
      navigate("/");
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
