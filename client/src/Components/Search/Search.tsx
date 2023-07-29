import { useState } from "react";
import searchIcon from "../../Icons/Imgs/search.png";

const Search: React.FunctionComponent = () => {
  const [keyword, setKeyword] = useState<string>("");

  return (
    <div className="flex flex-col w-full h-full px-[30px] py-[20px] items-center">
      <div className="flex flex-row w-full border-solid border-2 border-white border-opacity-20">
        <input
          className="w-full bg-transparent px-[10px]"
          style={{ backdropFilter: "blur(8px)" }}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <button className="p-[5px]">
          <img
            className="w-[20px] h-[20px]"
            alt="search_icon"
            src={searchIcon}
          />
        </button>
      </div>
      <div className="w-full h-full rounded-b-xl border-solid border-2 border-white border-opacity-20 p-[20px]"></div>
    </div>
  );
};

export default Search;
