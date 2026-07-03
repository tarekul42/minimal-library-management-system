import { useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useRefreshTokenMutation } from "@/redux/api/authApi";
import { setCredentials } from "@/redux/features/authSlice";
import { logout } from "@/redux/features/authSlice";

export function AuthInit({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector((state) => state.auth.accessToken);
  const [trigger] = useRefreshTokenMutation();
  const initiated = useRef(false);

  useEffect(() => {
    if (initiated.current) return;
    initiated.current = true;

    if (accessToken) return;

    trigger()
      .unwrap()
      .then((data) => {
        dispatch(setCredentials({ user: data.user, accessToken: data.accessToken }));
      })
      .catch(() => {
        dispatch(logout());
      });
  }, [accessToken, dispatch, trigger]);

  return <>{children}</>;
}
