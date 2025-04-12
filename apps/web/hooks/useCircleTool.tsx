import React, { useContext } from 'react'
import {v4 as uuidv4} from 'uuid';
import { DrawContext, OurMouseEvent } from '../contexts/draw-context';
import { useDraw } from './useDraw';
import useTools from './useTools';
const useCircleTool = () => {
;
  
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet, scaleOffSetRef} = useDraw();

    const {bgColorRef} = useTools()





    const circleHandleMouseDown = (
        event: OurMouseEvent,
      ) => {

        const x = event.clientX  
        const y = event.clientY 
        startPosRef.current = { x, y };
        isDrawingRef.current = true;

      };
    
    
    
    const circleHandleMouseMove = (
        event: OurMouseEvent,
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
        const widthChanged = scaleOffSetRef.current.x;
        const heightChanged = scaleOffSetRef.current.y;


        ctx.translate(offSet.current.offsetX* zoomRef.current - widthChanged, offSet.current.offsetY* zoomRef.current - heightChanged);
        ctx.scale(zoomRef.current, zoomRef.current);
        ctx.strokeStyle = colorRef.current;
        ctx.beginPath();
        //here 2*pie means 360*
        ctx.ellipse(centerX, centerY,radiusX,radiusY,0,0, Math.PI*(2) );
        ctx.stroke();
        ctx.closePath();
        ctx.restore();
    
     
    
      };
    
    
    const circleHandleMouseUp = (
        event: OurMouseEvent,
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
        event: OurMouseEvent,
    
      ) => {
    
        if (!startPosRef.current) return;

    

        const currentX = event.clientX ;
        const currentY = event.clientY ;
    
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
