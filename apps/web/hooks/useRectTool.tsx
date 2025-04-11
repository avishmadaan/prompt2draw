import React, { useContext } from 'react'
import { DrawContext } from '../contexts/draw-context';
import {v4 as uuidv4} from 'uuid';
import { useDraw } from './useDraw';

const useRectTool = () => {
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef,  reDrawShapes} = useDraw();


    const rectHandleMouseDown = (
        event: MouseEvent,
      ) => {
      
        const x = event.clientX 
        const y = event.clientY 
      
        startPosRef.current = { x, y };
        isDrawingRef.current = true;
      
      };
      
    const rectHandleMouseMove = (
        event: MouseEvent
      ) => {
      
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
          
        if (!isDrawingRef.current || !startPosRef.current ) return;
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
        reDrawShapes()
        ctx.strokeStyle = colorRef.current;
        ctx.strokeRect(x, y, width, height);
      
        
      };
      
    const rectHandleMouseUp = (
        event: MouseEvent,
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
      
        const newShapes = [...shapesRef.current, {
          type:"rect" as const,
          id,
          startX:x,
          startY:y,
          color:colorRef.current,
          width:width,
          height:height
      }]
      
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
