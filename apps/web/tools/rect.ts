import {
  colorRefType,
  isDrawingRefType,
  shiftPressedRefType,
  startPosRefType,
} from "../hooks/useDraw";

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
  shiftPressed:shiftPressedRefType
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

  ctx.clearRect(0, 0, canvas.width, canvas.height);
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
  shiftPressed:shiftPressedRefType
) => {
  if (!isDrawingRef.current || !startPosRef.current) return;

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
  ctx.fillStyle = colorRef.current;
  ctx.fillRect(startPosRef.current.x, startPosRef.current.y, width, height);
};
