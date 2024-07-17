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
  const [country, setCountry] = useState("us");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const changeLoggedIn = useCallback(function (state: boolean) {
    setIsLoggedIn(state);
  }, []);

  const changeUserId = useCallback(function (newId: string) {
    setUserId(newId);
  }, []);

  const changeEmail = useCallback(function (newEmail: string) {
    setEmail(newEmail);
  }, []);

  const changeName = useCallback(function (newName: string) {
    setName(newName);
  }, []);

  const changeCountry = useCallback(function (newCountry: string) {
    setCountry(newCountry);
  }, []);

  const getToken = useCallback(
    function () {
      return cookies.token;
    },
    [cookies.token]
  );

  const changeToken = useCallback(
    function (token: string) {
      setCookie("token", token, { path: "/" });
    },
    [setCookie]
  );

  const logout = useCallback(
    function () {
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
          if (data.country) {
            changeCountry(data.country);
          }
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
    changeCountry,
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
    country,
    changeCountry,
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
