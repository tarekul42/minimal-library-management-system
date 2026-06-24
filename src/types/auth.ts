export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "librarian" | "member";
  avatar?: string;
  phone?: string;
  address?: string;
  isActive: boolean;
}

export interface IAuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginCredentials {
  email: string;
  password: string;
}

export interface IRegisterCredentials {
  name: string;
  email: string;
  password: string;
}
