
import {v4 as uuidv4} from 'uuid';
import { useDraw } from './useDraw';

const useLineTool = () => {

  
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, drawLine} = useDraw();



     
const lineHandleMouseDown = (
    event: MouseEvent,
  ) => {

    console.log("line tool down")
  
    const x = event.clientX 
    const y = event.clientY 
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;
  };

const lineHandleMouseMove = (
    event: MouseEvent
  ) => {


    if (canvasRef.current) {
        canvasRef.current.style.cursor = "add";
    }

  
      
    if (!isDrawingRef.current || !startPosRef.current ) return;
    console.log("line tool mogin")

    let currentX = event.clientX ;
    let currentY = event.clientY ;

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


    drawLine( colorRef.current, x, y, currentX, currentY);

    console.log("after drawLine")
  };
  
const lineHandleMouseUp = (
    event: MouseEvent
  ) => {
    if (!isDrawingRef.current || !startPosRef.current) return;

    console.log("lineHandleMouseUp calling")
  
    let currentX = event.clientX;
    let currentY = event.clientY;

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


    console.log("old shapes")
    console.log(shapes)
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
    reDrawShapes()
  


  };





  return {
    lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp 

  }
}

export default useLineTool
