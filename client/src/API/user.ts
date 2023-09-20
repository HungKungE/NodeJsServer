import { sendPostRequest } from "./api";

export interface SignUpUserInfo {
  id: string;
  password: { value: string; check: string };
  email: { local_part: string; domain: string };
}

export interface SignInUserInfo {
  id: string;
  password: string;
}

export const sendSignUpRequest = (userInfo: SignUpUserInfo) => {
  const get_email = () => {
    if (
      userInfo.email.local_part.length !== 0 ||
      userInfo.email.domain.length !== 0
    ) {
      return userInfo.email.local_part + "@" + userInfo.email.domain;
    }

    return undefined;
  };

  const userData = {
    id: userInfo.id,
    password: userInfo.password.value,
    email: get_email(),
  };
  return sendPostRequest("/user/signup", userData);
};

export const sendIdCheckRequest = (userId: string) => {
  return sendPostRequest("/user/check/id", { id: userId });
};
