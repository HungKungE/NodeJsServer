import { useState } from "react";
import { SignUpUserInfo, sendSignUpRequest } from "../../API/user";
import { PAGE_TYPE } from "../Index/Index";

interface SignUpProps {
  setPageType: (page_type: PAGE_TYPE) => void;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({ setPageType }) => {
  const [userData, setUserData] = useState<SignUpUserInfo>({
    email: "",
    password: { value: "", check: "" },
    nickname: "",
  });

  const btnStyle =
    "border border-white border-opacity-20 font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-white";
  const inputStyle =
    "rounded-xl border p-4 w-full my-[10px] bg-transparent  border-white text-white  placeholder-white hover:cursor-pointer";

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
    <div
      className="relative w-full h-full flex flex-row bg-transparent rounded-[20px] border-solid border-2 border-white border-opacity-20"
      style={{ backdropFilter: "blur(8px)" }}
    >
      <div
        className="absolute top-0 left-[50%] -translate-x-[50%] text-[3em] font-pretendardBold justify-center text-white my-[30px] text-start"
        style={{ fontWeight: "bold" }}
      >
        SignUp
      </div>
      <div className="flex flex-col w-full justify-center items-center px-[30px]">
        <input
          className={inputStyle}
          value={userData.nickname}
          placeholder="Username"
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
          type="check password"
          value={userData.password.check}
          placeholder="비밀번호 확인"
          onChange={(e) => {
            setUserData({
              ...userData,
              password: { ...userData.password, check: e.target.value },
            });
          }}
        />
        <input
          className={inputStyle}
          value={userData.email}
          placeholder="Email"
          onChange={(e) => {
            setUserData({ ...userData, email: e.target.value });
          }}
        />
      </div>
      <div className="absolute bottom-0 w-full h-fit flex flex-row">
        <button
          className={btnStyle}
          onClick={() => {
            setPageType(PAGE_TYPE.SIGNIN);
          }}
        >
          로그인하기
        </button>
        <button
          className={btnStyle}
          onClick={() => {
            SignUp();
          }}
        >
          가입하기
        </button>
      </div>
    </div>
  );
};

export default SignUp;
