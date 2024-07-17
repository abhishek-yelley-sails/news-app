import { useId, useState } from "react";
import { useAuth } from "../AuthContextProvider/useAuth";
import FormInput from "../FormInput/FormInput";
import Form from "../Form/Form";
import {
  UserEditResponseFailed,
  UserInfoEditData,
  UserPasswordEditData,
  UserInfoEditResponseSuccess,
} from "../../util/definitions";

import cssStyles from "./Profile.module.css";
import { useMutation } from "react-query";
import makeRequest from "../../api/axiosInstance";
import { AxiosError } from "axios";
import { SelectChangeEvent } from "@mui/material";
import CountrySelect from "../CountrySelect/CountrySelect";

export default function Profile() {
  const authCtx = useAuth();
  const userDetailsId = useId();
  const passwordDetailsId = useId();
  const [infoErrors, setInfoErrors] = useState<UserEditResponseFailed | null>(
    null
  );
  const [passwordErrors, setPasswordErrors] =
    useState<UserEditResponseFailed | null>(null);
  const [country, setCountry] = useState(authCtx?.country || "us");
  const infoMutation = useMutation({
    mutationFn: (data: UserInfoEditData) => {
      return makeRequest("/user/info/edit", data, authCtx?.getToken(), "patch");
    },
    onSuccess: (data: UserInfoEditResponseSuccess) => {
      authCtx?.changeEmail(data.user.userId);
      authCtx?.changeName(data.user.name);
      authCtx?.changeCountry(data.user.country || "us");
    },
    onError: (response: AxiosError) => {
      const data = response.response?.data as UserEditResponseFailed;
      console.log(data);
      setInfoErrors(data);
    },
  });
  const passwordMutation = useMutation({
    mutationFn: (data: UserPasswordEditData) => {
      return makeRequest(
        "/user/password/edit",
        data,
        authCtx?.getToken(),
        "patch"
      );
    },
    onSuccess: () => {
      authCtx?.logout();
    },
    onError: (response: AxiosError) => {
      const data = response.response?.data as UserEditResponseFailed;
      console.log(data);
      setPasswordErrors(data);
    },
  });

  function handleDetails(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: UserInfoEditData = {
      email: formData.get("email") as string,
      name: formData.get("name") as string,
      country: formData.get("country") as string,
    };
    infoMutation.mutate(data);
  }
  function handlePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: UserPasswordEditData = {
      currentPassword: formData.get("current-password") as string,
      newPassword: formData.get("new-password") as string,
    };
    passwordMutation.mutate(data);
  }
  function handleCountryChange(event: SelectChangeEvent) {
    setCountry(event.target.value);
  }
  return (
    <>
      <h1 style={{ textAlign: "center", alignSelf: "center" }}>Profile</h1>
      <div className={cssStyles.subHeadingContainer}>
        <h3 className={cssStyles.subHeading}>Details</h3>
      </div>
      <div className={"formContainer"}>
        <Form
          type={"form"}
          onSubmit={handleDetails}
          errors={infoErrors}
          isLoading={infoMutation.isLoading}
        >
          <FormInput
            id={userDetailsId + "-name"}
            label={"Name"}
            type={"text"}
            name={"name"}
            defaultValue={authCtx?.name}
          />
          <FormInput
            id={userDetailsId + "-email"}
            label={"Email"}
            type={"email"}
            name={"email"}
            defaultValue={authCtx?.email}
          />
          <CountrySelect country={country} handleChange={handleCountryChange} />
        </Form>
      </div>
      <div className={cssStyles.subHeadingContainer}>
        <h3 className={cssStyles.subHeading}>Security</h3>
      </div>
      <div className={"formContainer"}>
        <Form
          type={"form"}
          onSubmit={handlePassword}
          errors={passwordErrors}
          isLoading={passwordMutation.isLoading}
        >
          <FormInput
            id={passwordDetailsId + "-current-password"}
            label="Current Password"
            type="password"
            name="current-password"
            placeholder="●●●●●●"
          />
          <FormInput
            id={passwordDetailsId + "-new-password"}
            label="New Password"
            type="password"
            name="new-password"
            placeholder="●●●●●●"
          />
        </Form>
      </div>
    </>
  );
}
