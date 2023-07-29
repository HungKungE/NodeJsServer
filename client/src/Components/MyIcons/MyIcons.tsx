import PlusIcon from "../../Icons/Imgs/plus-svgrepo-com (2).svg";

const MyIcons: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col w-full h-full px-[30px] py-[20px] items-center">
      <div className="flex flex-row w-full h-[40px] border-solid border-2 border-white border-opacity-20">
        <div className="px-[10px] h-full left-0">
          <div className="w-[30px] h-full hover:cursor-pointer">
            <img alt="plus_icon" src={PlusIcon}></img>
          </div>
          <div className="w-full h-full">{/* TODO : 이모티콘 종류 */}</div>
        </div>
      </div>
      <div className="w-full h-full rounded-b-xl border-solid border-2 border-white border-opacity-20 p-[20px]"></div>
    </div>
  );
};

export default MyIcons;
