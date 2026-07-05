import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { setCredentials, logout } from "@/redux/features/authSlice";
import { useLoginMutation, useRegisterMutation, useLogoutMutation } from "@/redux/api/authApi";
import { toast } from "sonner";
import type { ILoginCredentials, IRegisterCredentials, IAuthResponse } from "@/types/auth";
import { getApiError } from "@/lib/utils";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const [loginMutation] = useLoginMutation();
  const [registerMutation] = useRegisterMutation();
  const [logoutMutation] = useLogoutMutation();

  const handleAuthAction = useCallback(
    async <T>(
      mutation: (args: T) => { unwrap: () => Promise<IAuthResponse> },
      args: T,
      onSuccess: (res: IAuthResponse) => void,
      errorMessage: string,
    ) => {
      try {
        const result = await mutation(args).unwrap();
        dispatch(setCredentials(result));
        onSuccess(result);
      } catch (err: unknown) {
        toast.error(getApiError(err, errorMessage));
      }
    },
    [dispatch],
  );

  const login = useCallback(
    (credentials: ILoginCredentials) =>
      handleAuthAction(
        loginMutation,
        credentials,
        (result) => {
          if (result.user.role === "admin" || result.user.role === "librarian") {
            navigate("/admin");
          } else {
            navigate("/dashboard");
          }
        },
        "Login failed",
      ),
    [handleAuthAction, loginMutation, navigate],
  );

  const register = useCallback(
    (credentials: IRegisterCredentials) =>
      handleAuthAction(
        registerMutation,
        credentials,
        () => navigate("/dashboard"),
        "Registration failed",
      ),
    [handleAuthAction, registerMutation, navigate],
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
