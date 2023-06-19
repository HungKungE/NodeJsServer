

export interface SignUpUserInfo {
  email: string;
  password: { value: string; check: string };
  nickname: string;
}

export interface SignInUserInfo {
  email : string,
  psword : string
}