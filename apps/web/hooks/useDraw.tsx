"use client"

import { createContext, useContext, useEffect, useRef } from "react";
import useTools from "./useTools";

type DrawContextType = {

    canvasRef:React.RefObject<HTMLCanvasElement | null>
    isDrawingRef:React.RefObject<boolean>
    startPosRef: React.RefObject<{x:number, y:number} | null>
    toolRef: React.RefObject<string>
    colorRef: React.RefObject<string>

}

export type startPosRefType = React.RefObject<{
    x:number, y:number
} | null> 

export type isDrawingRefType = React.RefObject<boolean>
export type colorRefType = React.RefObject<string>

const DrawContext = createContext<DrawContextType | undefined>(undefined);

export const DrawContextProvider = ({children}:{children:React.ReactNode}) => {

    const {toolSelected, colorSelected} = useTools();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef<boolean>(false);
    const startPosRef = useRef<{
        x:number, y:number
    }>(null);
    const toolRef = useRef<string>(toolSelected);
    const colorRef = useRef<string>(colorSelected);



    useEffect(() => {
        colorRef.current = colorSelected;
      }, [colorSelected])
    
      useEffect(() => {
        toolRef.current = toolSelected;
      }, [toolSelected])
  


    return (
        <DrawContext.Provider value={{canvasRef, isDrawingRef,startPosRef,toolRef, colorRef  }}>
            {children}
        </DrawContext.Provider>
    )
}

export const useDraw =():DrawContextType => {

    const context = useContext(DrawContext);

    if (!context) {
        throw new Error("useDraw must be used within an DrawContextProvider");
      }

    return context
}

