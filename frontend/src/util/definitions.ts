export interface AuthContextType {
  userId: string;
  changeUserId: (newId: string) => void;
  email: string;
  changeEmail: (newEmail: string) => void;
  name: string;
  changeName: (newName: string) => void;
  getToken: () => string | undefined;
  changeToken: (token: string) => void;
  isLoggedIn: boolean;
  changeLoggedIn: (state: boolean) => void;
  logout: () => void;
}

export interface FormInputType {
  id: string;
  label: string;
  type: "text" | "email" | "password";
  name: string;
  placeholder?: string;
  defaultValue?: string;
  autoFocus?: boolean;
}

export interface LoginData {
  email: string;
  password: string;
}

export interface SignupData extends LoginData {
  name: string;
  repeatPassword: string;
}

export interface UserInfoEditData {
  name?: string;
  email?: string;
}

export interface UserPasswordEditData {
  currentPassword: string;
  newPassword: string;
}

export interface UserInfoResponseSuccess {
  message: string,
  user: UserInfo
}

interface ErrorResponse {
  error: true;
  message: string;
}

export interface LoginResponseSuccess {
  token: string;
  user: {
    userId: string;
  };
}

export interface LoginResponseFailed extends ErrorResponse {
  errors?: {
    [key: string]: string;
  };
}

export interface SignupResponseSuccess {
  message: string;
  token: string;
  user: {
    userId: string;
  };
}

export interface SignupResponseFailed extends ErrorResponse {
  errors?: {
    [key: string]: string;
  };
}

export interface UserInfoEditResponseSuccess {
  message: string;
  user: UserInfo;
}

export interface UserEditResponseFailed extends ErrorResponse {
  errors?: {
    [key: string]: string;
  };
}

export interface NewsCardProps {
  sourceId: string;
  sourceName: string;
  author: string;
  title: string;
  description: string;
  url: string;
  image: string | undefined;
  date: string;
}

export interface NewsArticle {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: {
    id: string;
    name: string;
  };
  title: string;
  url: string;
  urlToImage: string;
}

export interface NewsCardModalHandle {
  open: () => void;
}

export interface UserInfo {
  email: string;
  userId: string;
  name: string;
}
