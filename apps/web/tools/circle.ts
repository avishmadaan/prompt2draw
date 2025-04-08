import {
    colorRefType,
    isDrawingRefType,
    shiftPressedRefType,
    startPosRefType,
  } from "../hooks/useDraw";


  export const circleHandleMouseDown = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType
  ) => {
  
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    console.log("circle down")
  
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
    shiftPressed:shiftPressedRefType
  ) => {
  
      
    if (!isDrawingRef.current || !startPosRef.current || !ctx) return;

  
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

    ctx.strokeStyle = colorRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    shiftPressed:shiftPressedRefType
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


    ctx.fillStyle = colorRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    //here 2*pie means 360*
    ctx.ellipse(centerX, centerY,radiusX,radiusY,0,0, Math.PI*(2) );
    ctx.fill()
    ctx.closePath();
  };
  
  