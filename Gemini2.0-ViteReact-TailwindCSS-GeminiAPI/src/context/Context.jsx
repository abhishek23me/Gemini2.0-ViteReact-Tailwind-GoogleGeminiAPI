import { createContext, useState } from "react";
import run from "../config/Gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompt, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");
    const [canRead, setcanRead] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(function () {
            setResultData(prev => prev + nextWord);
        }, 20 * index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setcanRead("");
        let response;
        if (prompt !== undefined) {
            response = await run(prompt);
            setRecentPrompt(prompt)
        } else {
            setPrevPrompts(prev => [...prev, input])
            setRecentPrompt(input);
            response = await run(input);
        }
        setcanRead(response);

        // Remove double ## from the response
        const cleanedResponse = response.replace(/##/g, ''); // Regular expression to remove all instances of ##

        let responseArray = cleanedResponse.split("**");
        let newResponse = "";

        for (let i = 0; i < responseArray.length; i++) {
            if (i === 0 || i % 2 !== 1) {
                newResponse += responseArray[i];
            } else {
                newResponse += "<b>" + responseArray[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>");

        // Assuming delayPara is a function you have defined to handle rendering
        let newResponseArray = newResponse2.split(" ");
        for (let i = 0; i < newResponseArray.length; i++) {
            delayPara(i, newResponseArray[i] + " ");
        }

        setLoading(false);
        setInput("");
    };

    const [extended, setExtended] = useState(false);
    const [showIp, setShowIp] = useState(false);
    const [showText, setText] = useState(false);

    const handleExtension = () => {
        setExtended(!extended);
        // if(extended==true){
        //     setExtended(false);
        // }else{
        //     setExtended(true);
        // }
        setTimeout(() => {
            setText(!showText);
        }, 80);
        if (showIp == true) {
            setShowIp(false);
        } else {
            setTimeout(() => {
                setShowIp(!showIp);
            }, 200);
        }
    };

    const contextValue = {
        showIp,
        showText,
        extended,
        setExtended,
        handleExtension,
        canRead,
        onSent,
        input,
        newChat,
        setInput,
        loading,
        recentPrompt,
        setRecentPrompt,
        prevPrompt,
        setPrevPrompts,
        showResult,
        resultData,
    }
    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;