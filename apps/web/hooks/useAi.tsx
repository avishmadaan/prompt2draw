"use client"
import { createContext, useContext } from "react";


type AiContextType = {


}

const AiContext = createContext<AiContextType | null>(null);


export const AiContextProvider = ({children}:{children:React.ReactNode}) => {

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