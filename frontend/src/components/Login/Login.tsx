import Form from "../Form/Form";
import {
  LoginData,
  LoginResponseFailed,
  LoginResponseSuccess,
} from "../../util/definitions";
import { useMutation } from "react-query";
import makeRequest from "../../api/axiosInstance";
import { useAuth } from "../AuthContextProvider/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect, useId, useState } from "react";
import { AxiosError } from "axios";
import FormInput from "../FormInput/FormInput";

export default function Login() {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<LoginResponseFailed | null>(null);
  const formId = useId();
  const mutation = useMutation({
    mutationFn: (data: LoginData) => {
      return makeRequest("/login", data, null, "post");
    },
    onSuccess: (data: LoginResponseSuccess) => {
      authCtx?.changeUserId(data.user.userId);
      authCtx?.changeToken(data.token);
      authCtx?.changeLoggedIn(true);
      navigate("/");
    },
    onError: (response: AxiosError) => {
      const data = response.response?.data as LoginResponseFailed;
      console.log(data);
      setErrors(data);
    },
  });

  useEffect(() => {
    if (authCtx?.isLoggedIn) {
      // buggy implementation
      navigate(-2);
    }
  }, [authCtx?.isLoggedIn, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(event.currentTarget);
    const data: LoginData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };
    mutation.mutate(data);
  }

  return (
    <>
      <h1 style={{ alignSelf: "center", textAlign: "center" }}>Login</h1>
      <div className={"formContainer"}>
        <Form type="login" onSubmit={handleSubmit} errors={errors}>
          <FormInput
            id={formId + "-email"}
            label="Email"
            type="email"
            name="email"
            autoFocus
            placeholder="johndoe@email.com"
          />
          <FormInput
            id={formId + "-password"}
            label="Password"
            type="password"
            name="password"
            placeholder="●●●●●●"
          />
        </Form>
      </div>
    </>
  );
}
