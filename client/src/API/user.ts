import { sendPostRequest } from './api';

export interface SignUpUserInfo {
  email: string;
  password: { value: string; check: string };
  nickname: string;
}

export interface SignInUserInfo {
  email : string,
  password : string
}

export const sendSignUpRequest = (userInfo: SignUpUserInfo) => {
  const userData = {
    email: userInfo.email,
    password: userInfo.password.value,
    nickname: userInfo.nickname,
  };
  return sendPostRequest("/user/signup", userData);
};