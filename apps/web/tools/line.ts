import {
    colorRefType,
    isDrawingRefType,
    shiftPressedRefType,
    startPosRefType,
  } from "../hooks/useDraw";
  
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
    shiftPressed:shiftPressedRefType
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
  
  
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = colorRef.current;
    ctx.beginPath();
    ctx.moveTo(x,y);
    ctx.lineTo(currentX, currentY)
    ctx.lineWidth =2;
    ctx.stroke();
    ctx.closePath();
  };
  
  export const lineHandleMouseUp = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType,
    colorRef: colorRefType,
    shiftPressed:shiftPressedRefType
  ) => {
    // if (!isDrawingRef.current || !startPosRef.current) return;
  
    // const rect = canvas.getBoundingClientRect();
    // const currentX = event.clientX - rect.left;
    // const currentY = event.clientY - rect.top;
  
    // let width = currentX - startPosRef.current.x;
    // let height = currentY - startPosRef.current.y;
    // const maxi = Math.max(Math.abs(width), Math.abs(height));
  
  
    // if(shiftPressed.current) {
  
    //   height =  height<0?-1*maxi:maxi;
    //   width =  width<0?-1*maxi:maxi;
  
    // } 
    // ctx.fillStyle = colorRef.current;
    // ctx.fillRect(startPosRef.current.x, startPosRef.current.y, width, height);
  };
  