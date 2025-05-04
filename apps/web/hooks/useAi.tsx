import { useContext } from "react";
import { AiContext, AiContextType } from "../contexts/aiContext";



export const useAi =():AiContextType => {

    const context = useContext(AiContext);

    if(!context) {
        throw new Error("useAi must be used within an AiContextProvider");
    }

    return context
}