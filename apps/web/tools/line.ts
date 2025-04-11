import {
    colorRefType,
    isDrawingRefType,
    Shape,
    shiftPressedRefType,
    startPosRefType,
  } from "../hooks/useDraw";
import { reDrawShapes } from "../utils/redraw";
import {v4 as uuidv4} from 'uuid';
  
  export const lineHandleMouseDown = (
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
  };

  export const lineHandleMouseMove = (
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
  
    const rect = canvas.getBoundingClientRect();
    let currentX = event.clientX - rect.left;
    let currentY = event.clientY - rect.top;

    const { x, y } = startPosRef.current;

    if(shiftPressed.current) {
  
        if(Math.abs(currentX-x)>Math.abs(currentY -y)) {
            currentY = y;
        } else {
            currentX = x;
        }
        
    } 
  
    // redraw old shapes
    reDrawShapes(ctx, canvas, shapes, zoom)


    drawLine(ctx, colorRef.current, x, y, currentX, currentY);
  };
  
  export const lineHandleMouseUp = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType,
    colorRef: colorRefType,
    shiftPressed:shiftPressedRefType,
    shapes: Shape[] ,
    shapesRef: React.RefObject<Shape[]>,
    zoom:number
  ) => {
    if (!isDrawingRef.current || !startPosRef.current) return;
  
    const rect = canvas.getBoundingClientRect();
    let currentX = event.clientX - rect.left;
    let currentY = event.clientY - rect.top;

    const { x, y } = startPosRef.current;

    if(shiftPressed.current) {
  
        if(Math.abs(currentX-x)>Math.abs(currentY -y)) {
            currentY = y;
        } else {
            currentX = x;
        }
        
    } 

    const id = uuidv4();


    const newShapes = [...shapes, {
        type:"line" as const,
        id:id,
        color:colorRef.current,
        startX:x,
        startY:y,
        lastX:currentX,
        lastY:currentY
    
    }]
    
      shapesRef.current = newShapes;


  
    // redraw old shapes
    reDrawShapes(ctx, canvas, newShapes, zoom)
  


  };


  export const drawLine = (
    ctx: CanvasRenderingContext2D,
    color:string,
    startX:number,
    startY:number,
    lastX:number, 
    lastY:number
  ) => {

    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(startX,startY);
    ctx.lineTo(lastX, lastY)
    ctx.lineWidth =2;
    ctx.stroke();
    ctx.closePath();


  }
  