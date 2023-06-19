import { useState } from "react";
import { SignUpUserInfo, sendSignUpRequest } from '../../API/user';
import { PAGE_TYPE } from "../Index/Index";
import { useNavigate } from "react-router-dom";

interface SignUpProps {
  setPageType : (page_type:PAGE_TYPE)=> void;
}

const SignUp : React.FunctionComponent<SignUpProps> = ({setPageType}) => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<SignUpUserInfo>({
    email: "",
    password: { value: "", check: "" },
    nickname: "",
  });

  const btnStyle = "border border-deeporange font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-deeporange";
  const inputStyle = "rounded-[10px] border p-4 w-full my-[10px]";

  const emailReg = new RegExp(
    "([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|\"([]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(.[!#-'*+/-9=?A-Z^-~-]+)*|[[\t -Z^-~]*])"
  );

  const checkPassword = () => {
    if (userData.password.value.length < 7) {
      alert("비밀번호 길이가 짧습니다.");
    } else if (!emailReg.test(userData.email)) {
      alert("메일이 잘못됬습니다.");
    } else if (
      !/[^0-9]/.test(userData.password.value) ||
      !/[a-zA-Z]/.test(userData.password.value)
    ) {
      alert("반드시 영어,숫자를 포함해야합니다.");
    } else if (userData.password.value !== userData.password.check) {
      alert("비밀번호가 일치하지 않습니다.");
    } else {
      return true;
    }
    return false;
  };

  const SignUp = () => {
    console.log(userData);
    if (checkPassword()) {
      sendSignUpRequest(userData).then(() => {
        setPageType(PAGE_TYPE.SIGNIN);
      });
    }
  };

  return (
    <div className='relative w-full h-full flex flex-row'>
      <div className="absolute top-0 left-[50%] -translate-x-[50%] text-[2em] font-pretendardBold justify-center text-deeporange my-[30px]">
        회원가입
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
          value={userData.nickname}
          placeholder="닉네임"
          onChange={(e) => {
            setUserData({ ...userData, nickname: e.target.value });
          }}
        />
        <input
          className={inputStyle}
          type="password"
          value={userData.password.value}
          placeholder="비밀번호"
          onChange={(e) => {
            setUserData({
              ...userData,
              password: { ...userData.password, value: e.target.value },
            });
          }}
        />
        <input
          className={inputStyle}
          type="password"
          value={userData.password.check}
          placeholder="비밀번호"
          onChange={(e) => {
            setUserData({
              ...userData,
              password: { ...userData.password, check: e.target.value },
            });
          }}
        />
      </div>
      <div className='absolute bottom-0 w-full h-fit flex flex-row'>
        <button className={btnStyle} onClick={()=>{setPageType(PAGE_TYPE.SIGNIN);}}>로그인하기</button>
        <button className={btnStyle} onClick={()=>{SignUp()}}>가입하기</button>
      </div>
    </div>
  );
}

export default SignUp;