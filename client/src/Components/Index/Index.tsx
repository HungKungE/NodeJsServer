import Mococo from '../../Icons/Imgs/mococo.jpg';
import { useState } from 'react';
import SignUp from '../SignUp/SignUp';
import SignIn from '../SignIn/SignIn';

export enum PAGE_TYPE {
  SIGNIN,
  SIGNUP
}

const Index: React.FunctionComponent = () => {
  const [pageType, setPageType] = useState<PAGE_TYPE>(PAGE_TYPE.SIGNIN);

  const renderSignPage = () => {
    switch(pageType){
      case PAGE_TYPE.SIGNUP:
        return (
          <SignUp setPageType={setPageType}/>
        );
      case PAGE_TYPE.SIGNIN:
        return (
          <SignIn setPageType={setPageType}/>
        );
    }
  };

  return (
    <div className='w-[1200px] h-[600px] flex flex-row bg-white rounded-[10px]'>
      <div className='w-full h-full flex flex-col'>
        <img className='rounded-l-[10px]' src={Mococo} alt=""></img>
      </div>
      {renderSignPage()}
    </div>
  );
}

export default Index;