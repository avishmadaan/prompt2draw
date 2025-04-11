"use client"

import { createContext, useEffect, useRef } from "react";
import useTools from "../hooks/useTools";


export type RectShape = {
    type: "rect"
    id:string
    startX:number
    startY:number
    color:string
    width:number
    height:number
}

export type CircleShape = {
    type: "circle"
    id:string
    color:string
    centerX:number,
    centerY:number,
    radiusX:number,
    radiusY:number
    
}

export type LineShape = {
    type: "line"
    id:string
    color:string
    startX:number
    startY:number
    lastX:number
    lastY:number
    
}

export type Shape = RectShape | CircleShape | LineShape

export const shapes:Shape[] = [];

type DrawContextType = {

    canvasRef:React.RefObject<HTMLCanvasElement | null>
    isDrawingRef:React.RefObject<boolean>
    shiftPressed:React.RefObject<boolean>
    startPosRef: React.RefObject<{x:number, y:number} | null>
    toolRef: React.RefObject<string>
    colorRef: React.RefObject<string>
    shapesRef:React.RefObject<Shape[]>
    zoomRef:React.RefObject<number>;
    offSet:offsetRefType

}

export type startPosRefType = React.RefObject<{
    x:number, y:number
} | null> 

export type offsetRefType = React.RefObject<{
    offsetX:number,
    offsetY:number
} | null> 

export type isDrawingRefType = React.RefObject<boolean>
export type shiftPressedRefType = React.RefObject<boolean>
export type colorRefType = React.RefObject<string>

export const DrawContext = createContext<DrawContextType | undefined>(undefined);

export const DrawContextProvider = ({children}:{children:React.ReactNode}) => {

    const {toolSelected, colorSelected} = useTools();

    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const isDrawingRef = useRef<boolean>(false);
    const shiftPressed = useRef<boolean>(false);
    const startPosRef = useRef<{
        x:number, y:number
    }>(null);
    const toolRef = useRef<string>(toolSelected);
    const colorRef = useRef<string>(colorSelected);
    const shapesRef = useRef<Shape[]>([]);
    const zoomRef = useRef<number>(1);
    const offSet = useRef<{
        offsetX:number,
        offsetY:number
    }>(null);



    useEffect(() => {
        colorRef.current = colorSelected;
      }, [colorSelected])
    
      useEffect(() => {
        toolRef.current = toolSelected;
      }, [toolSelected])
  


    return (
        <DrawContext.Provider value={{canvasRef, isDrawingRef,startPosRef,toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet }}>
            {children}
        </DrawContext.Provider>
    )
}
