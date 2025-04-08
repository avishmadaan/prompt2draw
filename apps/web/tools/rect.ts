import {
  colorRefType,
  isDrawingRefType,
  Shape,
  shapes,
  shiftPressedRefType,
  startPosRefType,
} from "../hooks/useDraw";
import { reDrawShapes } from "../utils/redraw";

export const rectHandleMouseDown = (
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

export const rectHandleMouseMove = (
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  startPosRef: startPosRefType,
  isDrawingRef: isDrawingRefType,
  colorRef: colorRefType,
  shiftPressed:shiftPressedRefType,
  shapes: Shape[] 
) => {

    
  if (!isDrawingRef.current || !startPosRef.current || !ctx) return;

  const rect = canvas.getBoundingClientRect();
  const currentX = event.clientX - rect.left;
  const currentY = event.clientY - rect.top;

  let width = currentX - startPosRef.current.x;
  let height = currentY - startPosRef.current.y;

  const maxi = Math.max(Math.abs(width), Math.abs(height));


  if(shiftPressed.current) {

    height =  height<0?-1*maxi:maxi;
    width =  width<0?-1*maxi:maxi;

  } 

  const x = startPosRef.current.x;
  const y = startPosRef.current.y;

  //clear the canvs and preview shapes
  reDrawShapes(ctx, canvas, shapes)

  ctx.strokeStyle = colorRef.current;
  ctx.strokeRect(x, y, width, height);
};

export const rectHandleMouseUp = (
  event: MouseEvent,
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  startPosRef: startPosRefType,
  isDrawingRef: isDrawingRefType,
  colorRef: colorRefType,
  shiftPressed:shiftPressedRefType,
  shapes: Shape[],
  setShapes: React.Dispatch<React.SetStateAction<Shape[]>>
) => {
  if (!isDrawingRef.current || !startPosRef.current) return;

  const rect = canvas.getBoundingClientRect();
  const currentX = event.clientX - rect.left;
  const currentY = event.clientY - rect.top;

  const {x,y} = startPosRef.current;

  let width = currentX - x;
  let height = currentY - y;
  const maxi = Math.max(Math.abs(width), Math.abs(height));


  if(shiftPressed.current) {

    height =  height<0?-1*maxi:maxi;
    width =  width<0?-1*maxi:maxi;

  } 

  

  ctx.fillStyle = colorRef.current;
  ctx.fillRect(x, y, width, height);

  shapes.push({
    type:"rect",
    startX:x,
    startY:y,
    color:colorRef.current,
    width:width,
    height:height
  })
};
