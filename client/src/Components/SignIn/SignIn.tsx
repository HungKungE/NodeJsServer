import { useState } from "react";
import { SignInUserInfo } from '../../API/user';
import { PAGE_TYPE } from "../Index/Index";
import { useNavigate } from "react-router-dom";
import { useLogin } from '../../State/userinfo';
import { sendLogInRequest } from "../../API/auth";

interface SignInProps {
  setPageType : (page_type:PAGE_TYPE)=> void;
}

const SignIn : React.FunctionComponent<SignInProps> = ({setPageType}) => {
  const navigate = useNavigate();
  const loginState = useLogin();
  const [userData, setUserData] = useState<SignInUserInfo>({
    email: "",
    password: "",
  });

  const btnStyle = "border border-deeporange font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-deeporange";
  const inputStyle = "rounded-[10px] border p-4 w-full my-[10px]";

  const Login = () => {
    console.log(userData);
    sendLogInRequest(userData).then((res) => {
      loginState.setEmail(res.email);
      loginState.setIsLogin(true);
      loginState.setNickname(res.nickname);
      loginState.setLoginTime(new Date());
      navigate('/home');
    });
  };

  return (
    <div className='relative w-full h-full flex flex-row'>
      <div className="absolute top-0 left-[50%] -translate-x-[50%] text-[2em] font-pretendardBold justify-center text-deeporange my-[30px]">
        로그인
      </div>
      <div className="flex flex-col w-full justify-center items-center px-[30px]">
        <input
            className={inputStyle}
            value={userData.email}
            placeholder="이메일"
            onChange={(e) => {
              setUserData({ ...userData, email: e.target.value });
            }}
        />
        <input
          className={inputStyle}
          type="password"
          value={userData.password}
          placeholder="비밀번호"
          onChange={(e) => {
            setUserData({ ...userData, password: e.target.value });
          }}
        />
      </div>
      <div className='absolute bottom-0 w-full h-fit flex flex-row'>
        <button className={btnStyle} onClick={()=>{setPageType(PAGE_TYPE.SIGNUP);}}>회원가입</button>
        <button className={btnStyle} onClick={()=>{Login()}}>로그인</button>
      </div>
    </div>
  );
}

export default SignIn;