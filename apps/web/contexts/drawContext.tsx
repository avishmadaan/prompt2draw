"use client";

import { createContext, useEffect, useRef } from "react";
import useTools from "../hooks/useTools";

// export type RectShape = {
//   type: "rect";
//   id: string;
//   startX: number;
//   startY: number;
//   strokeColor: string;
//   bgColor: string;
//   width: number;
//   height: number;
// };

// export type CircleShape = {
//   type: "circle";
//   id: string;
//   strokeColor: string;
//   bgColor: string;
//   centerX: number;
//   centerY: number;
//   radiusX: number;
//   radiusY: number;
// };

// export type LineShape = {
//   type: "line";
//   id: string;
//   strokeColor: string;
//   startX: number;
//   startY: number;
//   lastX: number;
//   lastY: number;
// };

export type OurMouseEvent = {
  clientX: number;
  clientY: number;
};

// export type Shape = RectShape | CircleShape | LineShape;

export type Shape = {
    id:string,
    type:"rect" | "circle" | "line",
    x1:number,
    y1:number,
    x2:number,
    y2:number,
    strokeColor:string,
    bgColor:string
}

type DrawContextType = {
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  isDrawingRef: React.RefObject<boolean>;
  shiftPressed: React.RefObject<boolean>;
  startPosRef: React.RefObject<{ x: number; y: number } | null>;
  toolRef: React.RefObject<string>;
  colorRef: React.RefObject<string>;
  bgColorRef: React.RefObject<string>;

  shapesRef: React.RefObject<Shape[]>;
  zoomRef: React.RefObject<number>;
  offSet: offsetRefType;
  reDrawShapes: () => void;
  scaleOffSetRef: scaleOffSetType;

  drawLine: (
    strokeColor: string,
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  ) => void;

  drawRect: (
    strokeColor: string,
    bgColor: string,
    startX: number,
    startY: number,
    width: number,
    height: number
  ) => void;

  drawCircle: (
    strokeColor: string,
    bgColor: string,
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number
  ) => void;
};

export type startPosRefType = React.RefObject<{
  x: number;
  y: number;
} | null>;

export type scaleOffSetType = React.RefObject<{
  x: number;
  y: number;
}>;

export type offsetRefType = React.RefObject<{
  offsetX: number;
  offsetY: number;
}>;

export type isDrawingRefType = React.RefObject<boolean>;
export type shiftPressedRefType = React.RefObject<boolean>;
export type colorRefType = React.RefObject<string>;

export const DrawContext = createContext<DrawContextType | undefined>(
  undefined
);

export const DrawContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { toolSelected, strokeColorSelected, bgColorRef } = useTools();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef<boolean>(false);
  const shiftPressed = useRef<boolean>(false);
  const startPosRef = useRef<{
    x: number;
    y: number;
  }>(null);
  const toolRef = useRef<string>(toolSelected);
  const colorRef = useRef<string>("#D2D3D2");
  const shapesRef = useRef<Shape[]>([]);
  const zoomRef = useRef<number>(1);
  const offSet = useRef<{
    offsetX: number;
    offsetY: number;
  }>({ offsetX: 0, offsetY: 0 });

  const scaleOffSetRef = useRef<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });



  const drawLine = (
    strokeColor: string,
    startX: number,
    startY: number,
    lastX: number,
    lastY: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();

    const widthChanged = scaleOffSetRef.current.x;
    const heightChanged = scaleOffSetRef.current.y;


    ctx.translate(offSet.current.offsetX* zoomRef.current - widthChanged, offSet.current.offsetY* zoomRef.current - heightChanged);
    ctx.scale(zoomRef.current, zoomRef.current);

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(lastX, lastY);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();

    ctx.restore();
  };

  const drawRect = (
    strokeColor: string,
    bgColor: string,
    startX: number,
    startY: number,
    width: number,
    height: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.save();

    const widthChanged = scaleOffSetRef.current.x;
    const heightChanged = scaleOffSetRef.current.y;


    ctx.translate(offSet.current.offsetX* zoomRef.current - widthChanged, offSet.current.offsetY* zoomRef.current - heightChanged);
    ctx.scale(zoomRef.current, zoomRef.current);

    if (!(bgColor == "none")) {
      ctx.fillStyle = bgColor;
      ctx.fillRect(startX, startY, width, height);
    }

    ctx.strokeStyle = strokeColor; // Replace with your desired stroke color.
    ctx.lineWidth = 2; // Set to your desired line width.
    ctx.strokeRect(startX, startY, width, height);
    ctx.restore()
  };

  const drawCircle = (
    strokeColor: string,
    bgColor: string,
    centerX: number,
    centerY: number,
    radiusX: number,
    radiusY: number
  ) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.save();

    const widthChanged = scaleOffSetRef.current.x;
    const heightChanged = scaleOffSetRef.current.y;


    ctx.translate(offSet.current.offsetX* zoomRef.current - widthChanged, offSet.current.offsetY* zoomRef.current - heightChanged);
    ctx.scale(zoomRef.current, zoomRef.current);

    if (!(bgColor == "none")) {
      ctx.fillStyle = bgColor;
      ctx.beginPath();
      //here 2*pie means 360*
      ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }

    ctx.strokeStyle = strokeColor;
    ctx.beginPath();
    //here 2*pie means 360*
    ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();
    ctx.restore();
  };

  const reDrawShapes = () => {
    console.log("redrawing called")
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapesRef.current.forEach((shape) => {
      if (shape.type === "rect") {

        const x = Math.min(shape.x1, shape.x2);
        const y = Math.min(shape.y1, shape.y2);
        const w = Math.abs(shape.x2 - shape.x1);
        const h = Math.abs(shape.y2 - shape.y1);



        drawRect(
          shape.strokeColor,
          shape.bgColor,
         x,
          y,
          w,
          h
        );
      }
      if (shape.type === "circle") {

        const x = Math.min(shape.x1, shape.x2);
        const y = Math.min(shape.y1, shape.y2);
        const w = Math.abs(shape.x2 - shape.x1);
        const h = Math.abs(shape.y2 - shape.y1);
        const cx = x + w / 2;
        const cy = y + h / 2;
        drawCircle(shape.strokeColor, shape.bgColor, cx, cy, w / 2, h / 2);
      }
      if (shape.type === "line") {
        drawLine(
            shape.strokeColor,
            shape.x1,
            shape.y1,
            shape.x2,
            shape.y2
          );
      }
    });


  };

  useEffect(() => {
    colorRef.current = strokeColorSelected;
  }, [strokeColorSelected]);

  useEffect(() => {
    toolRef.current = toolSelected;
  }, [toolSelected]);

  return (
    <DrawContext.Provider
      value={{
        canvasRef,
        isDrawingRef,
        startPosRef,
        toolRef,
        colorRef,
        shiftPressed,
        shapesRef,
        zoomRef,
        offSet,
        reDrawShapes,
        drawLine,
        drawRect,
        drawCircle,
        bgColorRef,
        scaleOffSetRef,
      }}
    >
      {children}
    </DrawContext.Provider>
  );
};
