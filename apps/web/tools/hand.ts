import {
    colorRefType,
    isDrawingRefType,
    Shape,
    shiftPressedRefType,
    startPosRefType,
  } from "../hooks/useDraw";
import { reDrawShapes } from "../utils/redraw";


  export const handeHandleMouseDown = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType
  ) => {
  
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;

    console.log("hand down")
  };


  export const handHandleMouseMove = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType,
    colorRef: colorRefType,
    shiftPressed:shiftPressedRefType,
    shapes: Shape[],
    zoom:number
  ) => {
  
      
    if (!isDrawingRef.current || !startPosRef.current || !ctx) return;

    console.log("hand moving")
  
    const rect = canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const { x, y } = startPosRef.current;

    const dx = currentX - x;
    const dy = currentY -y;

    canvas.style.transform = `translate(${dx}px, ${dy}px)`;



  };


  
  
  