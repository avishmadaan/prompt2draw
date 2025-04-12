
import {v4 as uuidv4} from 'uuid';
import { useDraw } from './useDraw';

const useLineTool = () => {

  
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, drawLine, offSet} = useDraw();



     
const lineHandleMouseDown = (
    event: MouseEvent,
  ) => {

    const {offsetX, offsetY} = offSet.current;
    const x = event.clientX  - offsetX;
    const y = event.clientY - offsetY;
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;
  };

const lineHandleMouseMove = (
    event: MouseEvent
  ) => {


    if (canvasRef.current) {
        canvasRef.current.style.cursor = "add";
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");

  
      
    if (!isDrawingRef.current || !startPosRef.current || !ctx ) return;

    const {offsetX, offsetY} = offSet.current;

    let currentX = event.clientX -offsetX;
    let currentY = event.clientY -offsetY;

    const { x, y } = startPosRef.current;

    if(shiftPressed.current) {
  
        if(Math.abs(currentX-x)>Math.abs(currentY -y)) {
            currentY = y;
        } else {
            currentX = x;
        }
        
    } 
  
    // redraw old shapes
    reDrawShapes()

    ctx.save()
    ctx.translate(offSet.current.offsetX, offSet.current.offsetY)
    ctx.strokeStyle = colorRef.current;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(currentX, currentY);
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
    ctx.restore();

  };
  
const lineHandleMouseUp = (
    event: MouseEvent
  ) => {
    if (!isDrawingRef.current || !startPosRef.current) return;

  
    const {offsetX, offsetY} = offSet.current;

    let currentX = event.clientX -offsetX;
    let currentY = event.clientY -offsetY;


    const { x, y } = startPosRef.current;

    if(shiftPressed.current) {
  
        if(Math.abs(currentX-x)>Math.abs(currentY -y)) {
            currentY = y;
        } else {
            currentX = x;
        }
        
    } 

    const id = uuidv4();

    const shapes = shapesRef.current;

    const newShapes = [...shapes, {
        type:"line" as const,
        id:id,
        strokeColor:colorRef.current,
        startX:x,
        startY:y,
        lastX:currentX,
        lastY:currentY
    
    }]
    
      shapesRef.current = newShapes;


  
    // redraw old shapes
    reDrawShapes()
  


  };





  return {
    lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp 

  }
}

export default useLineTool
