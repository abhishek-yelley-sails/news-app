import { useEffect, useId, useState } from "react";
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import { useAuth } from "../AuthContextProvider/useAuth";
import { useNavigate } from "react-router-dom";
import {
  SignupResponseSuccess,
  SignupResponseFailed,
  SignupData,
} from "../../util/definitions";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import makeRequest from "../../api/axiosInstance";

export default function Signup() {
  const authCtx = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<SignupResponseFailed | null>(null);
  const formId = useId();
  const mutation = useMutation({
    mutationFn: (data: SignupData) => {
      return makeRequest("/signup", data, null, "post");
    },
    onSuccess: (data: SignupResponseSuccess) => {
      authCtx?.changeUserId(data.user.userId);
      authCtx?.changeToken(data.token);
      authCtx?.changeLoggedIn(true);
      navigate("/");
    },
    onError: (response: AxiosError) => {
      const data = response.response?.data as SignupResponseFailed;
      console.log(data);
      setErrors(data);
    },
  });

  useEffect(() => {
    if (authCtx?.isLoggedIn) navigate("/");
  }, [authCtx?.isLoggedIn, navigate]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(event.currentTarget);
    const data: SignupData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      repeatPassword: formData.get("repeat-password") as string,
      name: formData.get("name") as string,
    };
    mutation.mutate(data);
  }
  return (
    <>
      <h1 style={{ alignSelf: "center", textAlign: "center" }}>Signup</h1>
      <div className={"formContainer"}>
        <Form type="signup" onSubmit={handleSubmit} errors={errors}>
          <FormInput
            id={formId + "-name"}
            label="Name"
            type="text"
            name="name"
            autoFocus
            placeholder="John Doe"
          />
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
          <FormInput
            id={formId + "-repeat-password"}
            label="Repeat Password"
            type="password"
            name="repeat-password"
            placeholder="●●●●●●"
          />
        </Form>
      </div>
    </>
  );
}
