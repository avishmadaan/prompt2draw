import React, { useContext } from 'react'
import { DrawContext, OurMouseEvent } from '../contexts/drawContext';
import {v4 as uuidv4} from 'uuid';
import { useDraw } from './useDraw';
import useTools from './useTools';

const useRectTool = () => {
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef,  reDrawShapes, offSet, scaleOffSetRef, zoomRef, drawRect} = useDraw();

    const {bgColorRef} = useTools()


    const rectHandleMouseDown = (
        event: OurMouseEvent,
      ) => {
      
        const x = event.clientX 
        const y = event.clientY
      
        startPosRef.current = { x, y };
        isDrawingRef.current = true;
      
      };
      
    const rectHandleMouseMove = (
        event: OurMouseEvent
      ) => {
      
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
          
        if (!isDrawingRef.current || !startPosRef.current  || !ctx) return;
      

        const currentX = event.clientX 
        const currentY = event.clientY  
      
        let width = currentX - startPosRef.current.x;
        let height = currentY - startPosRef.current.y;
      
        const maxi = Math.max(Math.abs(width), Math.abs(height));
      
      
        if(shiftPressed.current) {
      
          height =  height<0?-1*maxi:maxi;
          width =  width<0?-1*maxi:maxi;
      
        } 
        
        const x = startPosRef.current.x;
        const y = startPosRef.current.y;
      
        
        
        //redraw old shapes
        reDrawShapes();
        drawRect(colorRef.current, bgColorRef.current, x,y, width, height);
      
        
      };
      
    const rectHandleMouseUp = (
        event: OurMouseEvent,
      ) => {
        if (!isDrawingRef.current || !startPosRef.current) return;

      
        const currentX = event.clientX
        const currentY = event.clientY
      
        const {x,y} = startPosRef.current;
      
        let width = currentX - x;
        let height = currentY - y;
        const maxi = Math.max(Math.abs(width), Math.abs(height));
      
      
        if(shiftPressed.current) {
      
          height =  height<0?-1*maxi:maxi;
          width =  width<0?-1*maxi:maxi;
      
        } 
      
        const id = uuidv4();

      
        const newShapes = [
          ...shapesRef.current,
          {
            type: "rect" as const,
            id,
            x1: x,             // initial mouse-down X
            y1: y,             // initial mouse-down Y
            x2: currentX,      // final mouse-up X
            y2: currentY,      // final mouse-up Y
            strokeColor: colorRef.current,
            bgColor: bgColorRef.current
          }
        ];
      
        shapesRef.current = newShapes;
      
          //redraw old shapes
        reDrawShapes()
      
      
      };
      



  return (
    {
        rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp
    }
  )
}

export default useRectTool
