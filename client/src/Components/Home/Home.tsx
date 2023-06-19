import { useEffect } from 'react';
import { useLogin } from '../../State/userinfo';
import { useNavigate } from "react-router-dom";
import { sendLogOutRequest } from '../../API/auth';

const Home:React.FunctionComponent = () => {
  const loginState = useLogin();
  const navigate = useNavigate();

  const btnStyle = "border border-deeporange font-pretendardBold w-full m-[30px] px-4 py-2 rounded-[15px] text-deeporange";

  useEffect(()=>{
    if(!loginState.isLogin){
      navigate('/');
    }
  });

  const LogOut = () =>{
    sendLogOutRequest().then(()=>{
      loginState.setInitialize();
      navigate('/');
    })
  };

  const renderUserInfo = () => {
    return (
      <div>
        <div className='flex flex-row'>
          <div>nickname:</div>
          <div>{loginState.nickname}</div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative w-[1200px] h-[600px] flex flex-row bg-white rounded-[10px]'>
      {renderUserInfo()}
      <div className='absolute bottom-0 w-full h-fit flex flex-row'>
        <button className={btnStyle} onClick={()=>{LogOut()}}>로그아웃</button>
      </div>
    </div>
  );
};

export default Home;