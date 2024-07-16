import { createContext, useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { AuthContextType, UserInfo } from "../../util/definitions";
import makeRequest from "../../api/axiosInstance";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const changeLoggedIn = useCallback(function changeLoggedIn(state: boolean) {
    setIsLoggedIn(state);
  }, []);

  const changeUserId = useCallback(function changeId(newId: string) {
    setUserId(newId);
  }, []);

  const changeEmail = useCallback(function changeEmail(newEmail: string) {
    setEmail(newEmail);
  }, []);

  const changeName = useCallback(function changeName(newName: string) {
    setName(newName);
  }, []);

  const getToken = useCallback(
    function getToken() {
      return cookies.token;
    },
    [cookies.token]
  );

  const changeToken = useCallback(
    function changeToken(token: string) {
      setCookie("token", token, { path: "/" });
    },
    [setCookie]
  );

  const logout = useCallback(
    function logout() {
      changeToken("");
      changeUserId("");
      changeEmail("");
      changeName("");
      changeLoggedIn(false);
    },
    [changeToken, changeUserId, changeEmail, changeName, changeLoggedIn]
  );

  useEffect(() => {
    console.log("Effect");
    async function getCurrentUser() {
      try {
        const data: UserInfo = await makeRequest(
          "/user/info",
          null,
          getToken()
        );
        if (data.userId) {
          changeUserId(data.userId);
          changeEmail(data.email);
          changeName(data.name);
          changeLoggedIn(true);
        }
      } catch (err) {
        console.log(err);
        changeUserId("");
        changeEmail("");
        changeName("");
        changeLoggedIn(false);
      }
    }
    if (cookies.token) {
      getCurrentUser();
    }
  }, [
    changeUserId,
    changeEmail,
    changeName,
    getToken,
    changeLoggedIn,
    logout,
    cookies.token,
  ]);

  const ctxValue = {
    userId,
    changeUserId,
    email,
    changeEmail,
    name,
    changeName,
    getToken,
    changeToken,
    isLoggedIn,
    changeLoggedIn,
    logout,
  };
  return (
    <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>
  );
}
