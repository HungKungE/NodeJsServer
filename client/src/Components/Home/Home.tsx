import React, { useEffect, useState } from "react";
import { useLogin } from "../../State/userinfo";
import { useNavigate } from "react-router-dom";
import MyIcons from "../MyIcons/MyIcons";
import Search from "../Search/Search";
import Profile from "../Profile/Profile";

enum MENU {
  MY_ICON,
  SEARCH,
  PROFILE,
}

const Home: React.FunctionComponent = () => {
  const loginState = useLogin();
  const navigate = useNavigate();
  const [currentMenu, setMenu] = useState<MENU>(MENU.MY_ICON);

  useEffect(() => {
    if (!loginState.isLogin) {
      navigate("/");
    }
  });

  const renderUserInfo = () => {
    return (
      <div>
        <div className="flex flex-row">
          <div>nickname:</div>
          <div>{loginState.id}</div>
        </div>
      </div>
    );
  };

  const renderSelectedMenu = () => {
    switch (currentMenu) {
      case MENU.MY_ICON:
        return <MyIcons></MyIcons>;
      case MENU.SEARCH:
        return <Search></Search>;
      case MENU.PROFILE:
        return <Profile></Profile>;
      default:
        return <React.Fragment></React.Fragment>;
    }
  };

  const myIconMenuColor = () => {
    switch (currentMenu) {
      case MENU.MY_ICON:
        return "";
      default:
        return "#FFFFFF";
    }
  };

  const searchMenuColor = () => {
    switch (currentMenu) {
      case MENU.SEARCH:
        return "";
      default:
        return "#FFFFFF";
    }
  };

  const profileMenuColor = () => {
    switch (currentMenu) {
      case MENU.PROFILE:
        return "";
      default:
        return "#FFFFFF";
    }
  };

  const menuStyle =
    "w-full border-solid border-t-2 border-l-2 border-r-2 border-white border-opacity-20 rounded-t-[10px] text-center py-[10px] hover:cursor-pointer";

  return (
    <div className="relative flex flex-col w-[600px] h-[600px] bg-transparent">
      <div className="flex flex-row w-full">
        <div
          className={menuStyle}
          style={{ backgroundColor: myIconMenuColor() }}
          onClick={() => {
            setMenu(MENU.MY_ICON);
          }}
        >
          내 이모티콘
        </div>
        <div
          className={menuStyle}
          style={{ backgroundColor: searchMenuColor() }}
          onClick={() => {
            setMenu(MENU.SEARCH);
          }}
        >
          검색하기
        </div>
        <div
          className={menuStyle}
          style={{ backgroundColor: profileMenuColor() }}
          onClick={() => {
            setMenu(MENU.PROFILE);
          }}
        >
          내 정보
        </div>
      </div>
      <div
        className="flex flex-row w-full h-full justify-center items-center rounded-b-[20px] border-solid border-b-2 border-l-2 border-r-2 border-white border-opacity-20"
        style={{ backdropFilter: "blur(8px)" }}
      >
        {renderSelectedMenu()}
      </div>
    </div>
  );
};

export default Home;
