import React, { useCallback, useContext, useRef, useState } from "react";
import { assets } from "../../src/assets/assets";
import { Context } from "../context/Context";

const Sidebar = () => {
  // const [extended, setextended] = useState(false);
  // const [showIp, setShowIp] = useState(false);
  // const [showText, setText] = useState(false);
  // const dropdownRef = useRef(null);
  const { onSent, showText, showIp, prevPrompt, setRecentPrompt, newChat, extended, setExtended, handleExtension } = useContext(Context);


  const loadPrompt = async (prompt) => {
    setRecentPrompt(prompt);
    handleExtension();
    await onSent(prompt);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <div
      className={`Sidebar fixed top-0 left-0 z-50 lg:static lg:top-auto lg:left-auto lg:z-auto flex flex-col bg-[#f0f4f9] overflow-hidden ${extended ? "w-[84%] lg:w-[404px]" : "w-[0px] lg:w-[72px] "
        } transition-width duration-300 ease-in-out h-[94vh] md:h-screen`}
    >
      <div className="Top flex-grow">
        {showText ? <div
          className="hover:cursor-pointer rounded-full flex p-3"

        >
          <div onClick={handleExtension} className="ml-1 mt-[2.5px] h-10 w-10 hover:bg-gray-200 rounded-full">
            <img className="h-[22px] m-auto mt-2.5 text" src={assets.menu_icon} alt="" />
          </div>
          <div onClick={handleExtension} className="h-10 lg:hidden w-[84px] hover:bg-gray-200 rounded-md mt-[3px]">
            <p className="ml-2 mt-1.5 text rounded-md hover:bg-gray-200 text-xl focus:outline-none">Gemini</p>
          </div>
        </div> :
          <div
          
            className="hover:cursor-pointer rounded-full flex p-3"

          >
            <div onClick={handleExtension} className="ml-1 mt-[2.5px] h-10 w-10 hover:bg-gray-200 rounded-full">
              <img className="h-[22px] m-auto mt-2.5 text" src={assets.menu_icon} alt="" />
            </div>
          </div>}


        <div
          onClick={() => newChat()}
          className={`hidden lg:flex hover:cursor-pointer hover:bg-gray-300 rounded-full mt-9 ml-3.5 h-10 bg-gray-200  ${extended ? "w-[120px]" : "w-[40px]"
            }`}
        >
          <div className="w-10 bg-gray-200 rounded-full">
            <img className="h-[16px] w-4 m-3" src={assets.plus_icon} alt="" />
          </div>
          {extended ? (
            <div className="w-20 rounded-full transition-width duration-300 ease-in-out">
              <p className="text-sm ml-2 mt-[9px] ">New chat</p>
            </div>
          ) : null}
        </div>
        
        {/* {extended?<p className="text-sm ml-7 mt-5 mb-2">Recent</p>:<p className="text-sm ml-7 mt-5 mb-2"></p>} */}
        {extended ? (
          <div className="">
            <p className="text-sm ml-7 mt-5 mb-2">Recent</p>
            <div className="recent h-[80%] lg:h-[52%] overflow-y-auto"> {/* Fixed height with overflow */}
            {prevPrompt.map((item, index) => {
              return (
                <div
                  onClick={() => loadPrompt(item)}
                  className="recententry ml-[16px] rounded-full hover:cursor-pointer hover:bg-gray-200 flex text-sm my-1 h-9 w-[92%] group"
                  key={index} // Add a unique key for each item
                >
                  <div id={index} className="flex flex-1">
                    <img
                      className="h-5 mr-3 m-2 ml-3"
                      src={assets.message_icon}
                      alt="Message Icon"
                    />
                    <p className="mt-2 overflow-hidden whitespace-nowrap text-ellipsis max-w-[200px]">
                      {truncateText(item, 38)}
                    </p>
                  </div>
                  <div className="hidden group-hover:flex hover:cursor-default h-7 my-auto mr-1 w-7 rounded-full hover:bg-gray-300">
                    <img
                      className="flex h-4 mx-auto mt-1.5 rounded-full"
                      src={assets.dots_icon}
                      alt=""
                    />
                  </div>
                </div>
              );
            })}
            </div>
          </div>
        ) : null}
      </div>
      <div className={`Bottom w-[92%] mx-auto space-y-3 ml-[17px] mb-1 text-sm`}>
        <div className={`flex h-9 ${!extended ? "lg:w-9" : null} hover:bg-gray-300 hover:cursor-pointer rounded-full`}>

          <img
            className={`h-4.5 my-2 ml-2 mr-3.5`}
            src={assets.diamond_icon}
            alt=""
          />
          {extended ? <p className="text w-full my-[7.4px]">Gem manager</p> : null}
        </div>
        <div className={`flex h-9 ${!extended ? "lg:w-9" : null} hover:bg-gray-300 hover:cursor-pointer rounded-full`}>
          <img
            className={`h-4.5 my-2 ml-2 mr-3.5`}
            src={assets.question_icon}
            alt=""
          />
          {extended ? <p className=" text my-[7.4px]">Help</p> : null}
        </div>
        <div className={`flex h-9 ${!extended ? "lg:w-9" : null} hover:bg-gray-300 hover:cursor-pointer rounded-full`}>
          <img
            className={`h-4.5 my-2 ml-2 mr-3.5`}
            src={assets.history_icon}
            alt=""
          />
          {extended ? <p className="text my-[7.4px]">Activity</p> : null}
        </div>
        <div
          className={`flex h-9 ${!extended ? "lg:w-9" : null} hover:bg-gray-300 hover:cursor-pointer rounded-full `}
        >
          <img
            className={`h-4.5 my-2 ml-2 mr-3.5`}
            src={assets.setting_icon}
            alt=""
          />
          {extended ? <p className="text my-[7.4px]">Settings</p> : null}
        </div>
        {showIp ? <div className="lg:hidden flex bg-gray-200 text  hover:cursor-pointer hover:bg-gray-200 h-9 mr-1 rounded-lg w-48 ml-3">
          <img className="h-5 mt-2 ml-4" src={assets.redgemini} alt="" />
          <p className="text-[13px] ml-2 py-2">Try Gemini Advanced</p>
        </div> :
          <div className="lg:hidden h-9 mr-1 rounded-lg w-48 ml-4"></div>}
        <div
          className={`h-14 ml-1`}
        >
          {showIp ? (
            <div className={`IP flex-col`}>
              <div className="flex">
                <img className="h-7" src={assets.dot_icon} alt="" />
                <p className="text-[12px] text mt-1">Guwahati, Assam, India</p>
              </div>
              <p className="text-blue-700 text text-[11.5px] ml-7 mb-3 mt-[-5px]">
                From your IP address - Update location
              </p>
            </div>
          ) : (
            <div className="h-14 ml-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
