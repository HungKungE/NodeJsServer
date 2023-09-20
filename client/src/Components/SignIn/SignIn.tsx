import { useEffect, useState } from "react";
import { SignInUserInfo } from "../../API/user";
import { PAGE_TYPE } from "../Index/Index";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../State/userinfo";
import { sendLogInRequest } from "../../API/auth";
import { useCookies } from "react-cookie";

interface SignInProps {
  setPageType: (page_type: PAGE_TYPE) => void;
}

const SignIn: React.FunctionComponent<SignInProps> = ({ setPageType }) => {
  const navigate = useNavigate();

  const loginState = useLogin();

  const [userData, setUserData] = useState<SignInUserInfo>({
    id: "",
    password: "",
  });

  const [doRememberUserId, setRemember] = useState<boolean>(false);

  const [cookies, setCookies, removeCookies] = useCookies(["rememberUserId"]);

  useEffect(() => {
    // 아이디 기억 cookie 있으면
    // 저장된 아이디 input에 추가
    if (cookies.rememberUserId) {
      setUserData({ ...userData, id: cookies.rememberUserId });
      setRemember(true);
    }

    // 이미 로그인 되어 있다면 home으로 이동
    if (!loginState.isLogin) {
      return;
    }

    // 마지막로그인 시간 + 1시간 = 만료시간
    // 현재시간 > 만료시간
    const expiredTime = new Date(loginState.loginTime);
    expiredTime.setHours(expiredTime.getHours() + 1);

    if (expiredTime.getTime() < Date.now()) {
      navigate("/home");
    }
  }, []);

  useEffect(() => {
    if (doRememberUserId) {
      const expirationDate = new Date();

      expirationDate.setFullYear(expirationDate.getFullYear() + 1);

      // 쿠키 유효기간 1년 설정
      setCookies("rememberUserId", userData.id, { expires: expirationDate });
    } else {
      removeCookies("rememberUserId");
    }
  }, [doRememberUserId]);

  const btnStyle =
    "border border-white border-opacity-20 font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-white";
  const inputStyle =
    "rounded-xl border p-4 w-full my-[10px] bg-transparent  border-white text-white  placeholder-white hover:cursor-pointer";

  const Login = () => {
    console.log(userData);
    sendLogInRequest(userData).then((res) => {
      loginState.setEmail(res.email);
      loginState.setIsLogin(true);
      loginState.setId(res.id);
      loginState.setLoginTime(new Date());
      navigate("/home");
    });
  };

  return (
    <div
      className="relative w-full h-full flex flex-row bg-transparent rounded-[20px] border-solid border-2 border-white border-opacity-20"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div
        className="absolute top-0 left-[50%] -translate-x-[50%] text-[3em] font-pretendardBold justify-center text-white my-[30px] text-start"
        style={{ fontWeight: "bold" }}
      >
        Login
      </div>
      <div className="flex flex-col w-full justify-center items-center px-[30px] gap-4">
        <input
          className={inputStyle}
          value={userData.id}
          placeholder="Username"
          onChange={(e) => {
            setUserData({ ...userData, id: e.target.value });
          }}
        />
        <input
          className={inputStyle}
          type="password"
          value={userData.password}
          placeholder="Password"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
        <div className="flex flex-row w-full justify-between">
          <div
            className="flex flex-row hover:cursor-pointer"
            onClick={(e) => {
              setRemember(!doRememberUserId);
            }}
          >
            <input type="checkbox" checked={doRememberUserId} />
            <p className="text-white pl-[5px]">아이디 기억하기</p>
          </div>
          <p className="font-bold underline hover:cursor-pointer text-white">
            Forgot password?
          </p>
        </div>
      </div>
      <div className="absolute bottom-0 w-full h-fit flex flex-row">
        <button
          className={btnStyle}
          onClick={() => {
            setPageType(PAGE_TYPE.SIGNUP);
          }}
        >
          회원가입
        </button>
        <button
          className={btnStyle}
          onClick={() => {
            Login();
          }}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default SignIn;
