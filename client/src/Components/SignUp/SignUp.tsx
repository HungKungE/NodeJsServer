import { useState } from "react";
import {
  SignUpUserInfo,
  sendIdCheckRequest,
  sendSignUpRequest,
} from "../../API/user";
import { PAGE_TYPE } from "../Index/Index";

interface SignUpProps {
  setPageType: (page_type: PAGE_TYPE) => void;
}

const SignUp: React.FunctionComponent<SignUpProps> = ({ setPageType }) => {
  const [userData, setUserData] = useState<SignUpUserInfo>({
    id: "",
    password: { value: "", check: "" },
    email: { local_part: "", domain: "" },
  });

  const [idDuplicateCheck, setIdDuplicateCheck] = useState<boolean>(false);

  const btnStyle =
    "border border-white border-opacity-20 font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-white";
  const inputStyle =
    "rounded-xl border p-4 w-full my-[10px] bg-transparent  border-white text-white  placeholder-white hover:cursor-pointer";

  const idReg = new RegExp("^[a-zA-Z\\d가-힣]{3,20}$");
  const passwordReg = new RegExp("^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$");

  const checkId = () => {
    return idReg.test(userData.id) && typeof userData.id !== "undefined";
  };

  const checkPassword = () => {
    return (
      passwordReg.test(userData.password.value) &&
      typeof userData.password.value !== "undefined"
    );
  };

  const SignUp = () => {
    console.log(userData);
    if (checkPassword() && checkId()) {
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
        <div className="flex flex-row w-full gap-4">
          <input
            className={inputStyle}
            value={userData.id}
            placeholder="아이디"
            onChange={(e) => {
              setUserData({ ...userData, id: e.target.value });
            }}
          />
          <button
            className="w-[100px] px-[10px] my-[10px] rounded-[15px] bg-slate-500 text-white"
            onClick={() => {
              sendIdCheckRequest(userData.id).then((res) => {
                if (!res.success) {
                  console.log(res.error);
                  return;
                }
                setIdDuplicateCheck(res.success);
              });
            }}
          >
            중복확인
          </button>
        </div>
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
          placeholder="비밀번호 확인"
          onChange={(e) => {
            setUserData({
              ...userData,
              password: { ...userData.password, check: e.target.value },
            });
          }}
        />
        <div className="flex flex-row w-full gap-4">
          <input
            className={inputStyle}
            value={userData.email.local_part}
            placeholder="이메일"
            onChange={(e) => {
              setUserData({
                ...userData,
                email: { ...userData.email, local_part: e.target.value },
              });
            }}
          />
          <div className="flex text-center justify-center items-center">@</div>
          <input
            className={inputStyle}
            value={userData.email.domain}
            placeholder="도메인"
            onChange={(e) => {
              setUserData({
                ...userData,
                email: { ...userData.email, domain: e.target.value },
              });
            }}
          />
        </div>
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
          disabled={!idDuplicateCheck}
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
