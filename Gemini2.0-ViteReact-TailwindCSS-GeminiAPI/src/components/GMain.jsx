import React, { useContext, useState, useRef, useEffect } from "react";
import { assets } from "../assets/assets";
import { Context } from "../context/Context";

const GMain = () => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const [play, setPlay] = useState(false);
    const synth = window.speechSynthesis;

    const {
        handleExtension,
        extended,
        newChat,
        canRead,
        onSent,
        input,
        setInput,
        loading,
        recentPrompt,
        showResult,
        resultData, } = useContext(Context);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

   
    const cleanText = (text) => {
        return text
            .replace(/##/g, '')
            .replace(/\*\*/g, '')
            .replace(/\*/g, '')
            .replace(/</g, '')
            .replace(/>/g, '');
    };

    const speakChunks = async (text) => {
        const chunks = text.match(/.{1,200}/g); 
        for (const chunk of chunks) {
            await speakText(chunk);
        }
    };

    const togglePlayPause = () => {
        console.log("Toggle Play/Pause clicked");
        if (play) {
            console.log("Stopping speech synthesis...");
            synth.cancel(); 
        } else {
            const cleanedData = cleanText(canRead);
            console.log("Speaking cleaned resultData:", cleanedData); 
            speakChunks(cleanedData); 
        }
        setPlay(!play); 
    };

    const speakText = (text) => {
        if (synth.speaking) {
            console.error("Speech synthesis is already speaking.");
            return;
        }
        if (text && text.trim() !== "") {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = () => {
                setPlay(false); 
            };
            utterance.onerror = (event) => {
                console.error("Speech synthesis error:", event.error);
            };
            synth.speak(utterance);
        } else {
            console.warn("No text to speak.");
        }
    };

    return (
        <>
            <div className="main flex flex-col w-screen  h-[93vh] md:h-[100vh]">
                <div className="main flex w-[100%] flex-row h-[72px]">
                    <div ref={dropdownRef} className="flex-1 flex lg:block  p-4 text-left">
                        <div
                            className="hover:bg-gray-200 w-10 h-10 rounded-full lg:hidden"
                            onClick={handleExtension}
                        >
                            <div className="ml-[9px] pt-[9px]">
                                <img className="h-[22px]" src={assets.menu_icon} alt="" />
                            </div>
                        </div>
                        <button
                            onClick={toggleDropdown}
                            className="hover:bg-gray-200 inline-flex h-9 justify-center rounded-md px-2 py-1 mt-[1px]  text-xl focus:outline-none"
                        >
                            <p className="">Gemini</p>
                            <svg
                                className="hidden lg:flex ml-1 mt-[5px] h-5 w-5"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </button>
                        {isOpen && (
                            <div onClick={() => setIsOpen(false)} className="absolute bg-gray-100 border border-gray-300 w-80">
                                <div className="gemini hover:cursor-pointer flex h-12 hover:bg-gray-200">
                                    <div className="p-3 ml-1">
                                        <img className="h-6" src="gemini_favicon.png" alt="" />
                                    </div>
                                    <div className="ml-1 flex flex-col flex-1">
                                        <p className="text-[15px] pt-1">Gemini</p>
                                        <p className="text-[12px]">with 1.5 Flash</p>
                                    </div>
                                    <div>
                                        <img className="h-4 mr-6 mt-4" src={assets.check} alt="" />
                                    </div>
                                </div>
                                <div className="geminiAdvanced  flex h-12 hover:bg-gray-200">
                                    <div className="p-3 ml-1 opacity-[0.3]">
                                        <img className="h-6" src={assets.redgemini} alt="" />
                                    </div>
                                    <div className="ml-1 flex flex-col opacity-[0.3] flex-1">
                                        <p className="text-[15px] pt-1">Gemini Advanced</p>
                                        <p className="text-[12px]">with 1.5 Pro</p>
                                    </div>
                                    <div className="w-24 hover:cursor-pointer bg-blue-100 mr-3 h-9 my-auto rounded-full">
                                        <p className="ml-4 mt-1">Upgrade</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex space-x-3 mr-6">
                        <div className="lg:flex hidden bg-gray-100 hover:cursor-pointer hover:bg-gray-200 h-9 mr-1 rounded-md w-48 my-auto">
                            <img className="h-5 mt-2.5 ml-5" src={assets.redgemini} alt="" />
                            <p className="text-[13px] ml-2 py-2.5">Try Gemini Advanced</p>
                        </div>
                        <div onClick={() => newChat()} className="lg:hidden h-8 w-8 hover:bg-gray-200 hover:cursor-pointer rounded-full my-auto">
                            <img className="h-4 m-2" src={assets.plus_icon} alt="" />
                        </div>
                        <div className="lg:hidden h-8 w-8 hover:bg-gray-200 hover:cursor-pointer rounded-full my-auto">
                            <img className="h-4 m-2" src={assets.threedot} alt="" />
                        </div>
                        <div className="hidden lg:flex h-8 w-8 hover:bg-gray-200 hover:cursor-pointer rounded-full my-auto">
                            <img className="h-4 m-2" src={assets.ninedot} alt="" />
                        </div>
                        <div className="h-8 w-8 bg-gray-200 hover:cursor-pointer rounded-full my-auto">
                            <img className="h-8 rounded-full" src={assets.user_icon} alt="" />
                        </div>
                    </div>
                </div>
                {!showResult ? (
                    <>
                        <div className="h-[90%] w-full flex">
                            <p className="text-3xl m-auto" style={{
                                background: '-webkit-linear-gradient(16deg, #4b90ff, #ff5546)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Hello, Codeabhi
                            </p>
                        </div>
                    </>
                ) : (
                    <div className="h-[90%] w-full overflow-y-auto scrollbar-thin">
                        <div className="result w-[90vw] max-h-[94.4%] lg:w-[50vw] mt-6 pt-2 mx-auto">
                            <div className="resulttitle group flex w-[98%] py-2 px-1 space-x-2 lg:space-x-4">
                                <img className="h-8 rounded-full lg:mr-2" src={assets.user_icon} alt="" />
                                <span className="my-auto ml-2 lg:min-w-[88%] lg:max-w-[91%]">{recentPrompt}</span>
                            </div>
                            <div className="flex justify-end mt-[-20px]">
                                <div onClick={togglePlayPause} className="rounded-full hover:cursor-pointer hover:bg-gray-200 h-10 w-10">
                                    {play ? <img className="h-5 mx-auto mt-[10px]" src={assets.pause} alt="" /> : <img className="h-5 mx-auto mt-[10px]" src={assets.volume} alt="" />}
                                </div>
                            </div>
                            <div className="result w-[98%] h-[63vh] space-x-1 flex ml-2">
                                <div className={`h-10 w-10`}>
                                    <img className={`h-7 ${loading ? 'animate-spinSlow' : ''}`} src={assets.gemini_icon} alt="Loading..." />
                                </div>
                                {loading ?
                                    <div className="loader gap-2 w-[88%] flex flex-col mt-1">
                                        <hr style={{ borderRadius: "3px", backgroundColor: "#f6f7f8", background: "linear-gradient(to right,#9ee8ff,#ffffff,#9ed8ff)", height: "13px", animation: "loader 2s infinite linear" }} />
                                        <hr style={{ borderRadius: "3px", backgroundColor: "#f6f7f8", background: "linear-gradient(to right,#9ee8ff,#ffffff,#9ed8ff)", height: "13px", animation: "loader 2s infinite linear" }} />
                                        <hr style={{ borderRadius: "3px", backgroundColor: "#f6f7f8", background: "linear-gradient(to right,#9ee8ff,#ffffff,#9ed8ff)", height: "13px", animation: "loader 2s infinite linear" }} />
                                    </div>
                                    :
                                    <div className="resultdata min-w-[88%] max-w-[91%] h-full max-h-[67vh] mt-[-5px]"> {/* Removed overflow-y-auto from here */}
                                        <p className="leading-[1.8] text-[16px] pb-4  mt-1 ml-[7px]" dangerouslySetInnerHTML={{ __html: resultData }}></p>
                                        <div className="w-full flex space-x-2 ml-[]">
                                            <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
                                                <img className="h-4 mx-auto mt-2.5" src={assets.like} alt="" />
                                            </div>
                                            <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
                                                <img className="h-4 mx-auto mt-[13px]" src={assets.dislike} alt="" />
                                            </div>
                                            <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
                                                <img className="h-4 mt-3 ml-[11px]" src={assets.share} alt="" />
                                            </div>
                                            <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
                                                <img className="h-5 mx-auto mt-2.5" src={assets.google} alt="" />
                                            </div>
                                            <div className="hover:bg-gray-200 mb-10 h-10 w-10 rounded-full">
                                                <img className="h-4 mx-auto mt-3" src={assets.threedot} alt="" />
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                            <div>
                            </div>
                        </div>
                    </div>
                )}
                <div className="flex w-full flex-col justify-end">
                    <div className="input flex bg-[#f0f4f9] h-16 rounded-full pl-7 justify-end w-[90%] lg:w-[70%] mx-auto">
                        <input onChange={(e) => setInput(e.target.value)} value={input} className="outline-none w-full text-black bg-transparent pr-3" type="text" placeholder="Ask Gemini" />
                        <div className="icons flex mr-2 my-auto">
                            <div className="hover:bg-gray-200 h-9 w-9 rounded-full hover:cursor-pointer"><img className="h-5 w-5 ml-[8px] mt-[8px]" src={assets.gallery_icon} alt="" /></div>
                            <div className="hover:bg-gray-200 h-9 w-9 rounded-full hover:cursor-pointer"><img className="h-6 w-6 ml-[6px] mt-[7px]" src={assets.mic_icon} alt="" /></div>
                            {input ? <div className="hover:bg-gray-200 h-9 w-9 rounded-full hover:cursor-pointer "><img onClick={() => onSent()} className="h-6 w-5 ml-2.5 mt-1.5 " src={assets.send_icon} alt="" /></div> : null}
                        </div>
                    </div>
                    <div className="mx-auto text-sm">
                        <p>Gemini can make mistakes, so double-check it</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GMain;


// <div className="resultdata min-w-[88%] max-w-[91%]  h-full max-h-[67vh] mt-[-5px] overflow-y-auto">
//     <p className="leading-[1.8] text-[16px]  pb-4 ml-2 lg:ml-0 mt-1" dangerouslySetInnerHTML={{ __html: resultData }}></p>
//     <div className="w-full flex space-x-2 ml-[]">
//         <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
//             <img className="h-5 mx-auto mt-2.5" src="./svgs/like.svg" alt="" />
//         </div>
//         <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
//             <img className="h-5 mx-auto mt-[9px]" src="./svgs/dislike.svg" alt="" />
//         </div>
//         <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
//             <img className="h-4  mt-3 ml-[11px]" src={assets.share} alt="" />
//         </div>
//         <div className="hover:bg-gray-200 h-10 w-10 rounded-full">
//             <img className="h-5 mx-auto mt-2.5" src={assets.google} alt="" />
//         </div>
//         <div className="hover:bg-gray-200 mb-10 h-10 w-10 rounded-full">
//             <img className="h-4 mx-auto mt-3" src={assets.threedot} alt="" />
//         </div>
//     </div>
// </div>
