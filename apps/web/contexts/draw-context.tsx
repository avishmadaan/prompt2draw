"use client"

import { createContext, useEffect, useRef } from "react";
import useTools from "../hooks/useTools";
import useRectTool from "../hooks/useRectTool";
import useCircleTool from "../hooks/useCircleTool";
import useLineTool from "../hooks/useLineTool";


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



type DrawContextType = {

    canvasRef:React.RefObject<HTMLCanvasElement | null>
    isDrawingRef:React.RefObject<boolean>
    shiftPressed:React.RefObject<boolean>
    startPosRef: React.RefObject<{x:number, y:number} | null>
    toolRef: React.RefObject<string>
    colorRef: React.RefObject<string>
    shapesRef:React.RefObject<Shape[]>
    zoomRef:React.RefObject<number>;
    offSet:offsetRefType,
    reDrawShapes:() => void,

    drawLine:(
        color:string,
        startX:number,
        startY:number,
        lastX:number, 
        lastY:number
      ) => void;

    drawRect : (
        color:string,
        startX:number,
        startY:number,
        width:number,
        height:number
      ) => void

    drawCircle : (
        color:string,
        centerX:number,
        centerY:number,
        radiusX:number,
        radiusY:number
      ) => void




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

    // const {drawRect} = useRectTool() || {};
    // const {drawCircle} = useCircleTool() || {};
    // const {drawLine} = useLineTool() || {};


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

    const shapes = shapesRef.current;
    const zoom = zoomRef.current;


    const drawLine = (
        color: string,
        startX: number,
        startY: number,
        lastX: number, 
        lastY: number
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(lastX, lastY);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();
    };

    const drawRect = (
        color: string,
        startX: number,
        startY: number,
        width: number,
        height: number
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = color;
        ctx.fillRect(startX, startY, width, height);
    };

    const drawCircle = (
        color: string,
        centerX: number,
        centerY: number,
        radiusX: number,
        radiusY: number
    ) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };

    const reDrawShapes = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        console.log("shapes")
        console.log(shapesRef.current)

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.save();
        ctx.scale(zoomRef.current, zoomRef.current);

        shapesRef.current.forEach((shape) => {
            if (shape.type === "rect") {
                drawRect(shape.color, shape.startX, shape.startY, shape.width, shape.height);
            }
            if (shape.type === "circle") {
                drawCircle(shape.color, shape.centerX, shape.centerY, shape.radiusX, shape.radiusY);
            }
            if (shape.type === "line") {
                drawLine(shape.color, shape.startX, shape.startY, shape.lastX, shape.lastY);
            }
        });

        ctx.restore();
    };



    useEffect(() => {
        colorRef.current = colorSelected;
      }, [colorSelected])
    
      useEffect(() => {
        toolRef.current = toolSelected;
      }, [toolSelected])
  


    return (
        <DrawContext.Provider value={{canvasRef, isDrawingRef,startPosRef,toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet, reDrawShapes, drawLine, drawRect, drawCircle }}>
            {children}
        </DrawContext.Provider>
    )
}
