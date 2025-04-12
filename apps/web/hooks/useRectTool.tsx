import React, { useContext } from 'react'
import { DrawContext } from '../contexts/draw-context';
import {v4 as uuidv4} from 'uuid';
import { useDraw } from './useDraw';
import useTools from './useTools';

const useRectTool = () => {
    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef,  reDrawShapes, offSet} = useDraw();

    const {bgColorRef} = useTools()


    const rectHandleMouseDown = (
        event: MouseEvent,
      ) => {
      
        const {offsetX, offsetY} = offSet.current;
        const x = event.clientX  - offsetX;
        const y = event.clientY - offsetY;
      
        startPosRef.current = { x, y };
        isDrawingRef.current = true;
      
      };
      
    const rectHandleMouseMove = (
        event: MouseEvent
      ) => {
      
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const ctx = canvas.getContext("2d");
          
        if (!isDrawingRef.current || !startPosRef.current  || !ctx) return;
        const {offsetX, offsetY} = offSet.current;

        const currentX = event.clientX -offsetX 
        const currentY = event.clientY  - offsetY
      
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
        ctx.save();
        ctx.translate(offSet.current.offsetX, offSet.current.offsetY);
        ctx.strokeStyle = colorRef.current;
        ctx.strokeRect(x, y, width, height);
        ctx.restore();
      
        
      };
      
    const rectHandleMouseUp = (
        event: MouseEvent,
      ) => {
        if (!isDrawingRef.current || !startPosRef.current) return;
        const {offsetX, offsetY} = offSet.current;
      
        const currentX = event.clientX - offsetX;
        const currentY = event.clientY - offsetY;
      
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
          startX:x ,
          startY:y ,
          strokeColor:colorRef.current,
          bgColor:bgColorRef.current,
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
