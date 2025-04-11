import {
    colorRefType,
    isDrawingRefType,
    Shape,
    shiftPressedRefType,
    startPosRefType,
  } from "../hooks/useDraw";
import { reDrawShapes } from "../utils/redraw";
import {v4 as uuidv4} from 'uuid';


  export const circleHandleMouseDown = (
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



export const circleHandleMouseMove = (
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

    const calculations = calculateCircle(event, canvas, startPosRef, isDrawingRef, shiftPressed)

    if(!calculations) return;

    const {centerX, centerY, radiusX, radiusY} = calculations
  

       // redraw old shapes
    reDrawShapes(ctx, canvas, shapes, zoom)

    ctx.strokeStyle = colorRef.current;
    ctx.beginPath();
    //here 2*pie means 360*
    ctx.ellipse(centerX, centerY,radiusX,radiusY,0,0, Math.PI*(2) );
    ctx.stroke();
    ctx.closePath();

 

  };


  export const circleHandleMouseUp = (
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

    const calculations = calculateCircle(event, canvas, startPosRef, isDrawingRef, shiftPressed);

    if(!calculations) return;

    const {centerX, centerY, radiusX, radiusY} = calculations

    const id = uuidv4();

    const newShapes = [...shapes, {
        type:"circle" as const,
        id,
        color:colorRef.current,
        centerX,
        centerY,
        radiusX,
        radiusY

    }]
    
      shapesRef.current = newShapes;
      
      
      // redraw old shapes
      reDrawShapes(ctx, canvas, newShapes, zoom)



  };


  export const drawCircle = (
    ctx: CanvasRenderingContext2D,
    color:string,
    centerX:number,
    centerY:number,
    radiusX:number,
    radiusY:number
  ) => {

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(centerX, centerY, radiusX, radiusY,0,0, Math.PI*(2) );
    ctx.fill()
    ctx.closePath();

  }
  
  export const calculateCircle = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType,
    shiftPressed:shiftPressedRefType,

  ) => {

    if (!isDrawingRef.current || !startPosRef.current) return;

  
    const rect = canvas.getBoundingClientRect();
    const currentX = event.clientX - rect.left;
    const currentY = event.clientY - rect.top;

    const { x, y } = startPosRef.current;

    let centerX = (currentX + x)/2;
    let centerY = (currentY + y)/2;

    let radiusX = Math.abs((currentX - x)/2);
    let radiusY =  Math.abs((currentY - y)/2);

    if(shiftPressed.current) {

    const maxRadius = Math.max(radiusX, radiusY);
        radiusX =radiusY =maxRadius;

        centerX = x + (currentX > x ? maxRadius : -maxRadius);
        centerY = y + (currentY > y ? maxRadius : -maxRadius);
    }

    return {
      centerX, centerY, radiusX, radiusY
    }



  }