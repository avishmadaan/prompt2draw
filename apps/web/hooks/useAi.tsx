"use client"
import axios from "axios";
import { createContext, useContext } from "react";


type AiContextType = {


}

export interface Message {
    role: "system" | "user" | "assistant";
    content:string;
  }

const AiContext = createContext<AiContextType | null>(null);


export const AiContextProvider = ({children}:{children:React.ReactNode}) => {




    


    const getAiReply = async () => {

        const systemMessage:Message = {
            type:"system",
            content:"Prompt"
        }

        const requestBody = {
            model:"gpt-4",
            messages:[systemMessage]
        }


        try {

            const response = await axios.post("https://api.openai.com/v1/chat/completions", {

                requestBody,

                headers:{
            "Content-Type":"application/json",
            Authorization: `Bearer ${process.env.OPEN_AI}`
                }
            })

            if (!response.data) {
                throw new Error("Stream response error");
              }


        }

        catch(err) {

            console.error("Error during chat completion:", err);


        }



    }


    return (
        <AiContext.Provider value={{}}>
            {children}
        </AiContext.Provider>
    )
}


export const useAi =():AiContextType => {

    const context = useContext(AiContext);

    if(!context) {
        throw new Error("useAi must be used within an AiContextProvider");
    }

    return context
}