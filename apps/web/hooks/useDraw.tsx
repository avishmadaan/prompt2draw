"use client"

import { useContext} from "react";
import { DrawContext } from "../contexts/drawContext";



export const useDraw =() => {

    const context = useContext(DrawContext);

    if (!context) {
        throw new Error("useDraw must be used within an DrawContextProvider");
      }

    return context
}

