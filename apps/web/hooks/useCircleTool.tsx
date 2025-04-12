import React, { useContext } from 'react'
import {v4 as uuidv4} from 'uuid';
import { DrawContext } from '../contexts/draw-context';
import { useDraw } from './useDraw';
import useTools from './useTools';
const useCircleTool = () => {
;
  
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet} = useDraw();

    const {bgColorRef} = useTools()





    const circleHandleMouseDown = (
        event: MouseEvent,
      ) => {
    
        const {offsetX, offsetY} = offSet.current;
        const x = event.clientX  - offsetX;
        const y = event.clientY - offsetY;
        startPosRef.current = { x, y };
        isDrawingRef.current = true;

        if (canvasRef.current) {
            canvasRef.current.style.cursor ="crosshair";
        }
      };
    
    
    
    const circleHandleMouseMove = (
        event: MouseEvent,
      ) => {

        const canvas = canvasRef.current;
        
        const ctx = canvas?.getContext("2d");
        if (!ctx || !canvas) return;

   
    
        const calculations = calculateCircle(event)
    
        if(!calculations) return;
    
        const {centerX, centerY, radiusX, radiusY} = calculations
      
    
           // redraw old shapes
        reDrawShapes()

        ctx.save();
        ctx.translate(offSet.current.offsetX, offSet.current.offsetY);
        ctx.strokeStyle = colorRef.current;
        ctx.beginPath();
        //here 2*pie means 360*
        ctx.ellipse(centerX, centerY,radiusX,radiusY,0,0, Math.PI*(2) );
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    
     
    
      };
    
    
    const circleHandleMouseUp = (
        event: MouseEvent,
      ) => {

        const canvas = canvasRef.current;
        
        const ctx = canvas?.getContext("2d");
        if (!ctx) return;
    
    
        const calculations = calculateCircle(event);
    
        if(!calculations) return;
    
        const {centerX, centerY, radiusX, radiusY} = calculations
    
        const id = uuidv4();
        const shapes = shapesRef.current;
    
        const newShapes = [...shapes, {
            type:"circle" as const,
            id,
            strokeColor:colorRef.current,
            bgColor:bgColorRef.current,
            centerX,
            centerY,
            radiusX,
            radiusY
    
        }]
        
          shapesRef.current = newShapes;
          
          
          // redraw old shapes
          reDrawShapes()
    
    
    
      };
    
    

      
    const calculateCircle = (
        event: MouseEvent,
    
      ) => {
    
        if (!startPosRef.current) return;

        const {offsetX, offsetY} = offSet.current;

        const currentX = event.clientX -offsetX 
        const currentY = event.clientY  - offsetY
    
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


  return {
    circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp
  }
}

export default useCircleTool
