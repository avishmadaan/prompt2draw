import React from 'react'
import { useDraw } from './useDraw'

const useHandTool = () => {

    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes} = useDraw();


    const shapes = shapesRef.current;
    const zoom = zoomRef.current;

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;


    const handeHandleMouseDown = (
        event: MouseEvent,
      ) => {
      

        const x = event.clientX;
        const y = event.clientY;
    
      
        startPosRef.current = { x, y };
        isDrawingRef.current = true;
    
        console.log("hand down")
      };
    
    
    const handHandleMouseMove = (
        event: MouseEvent
      ) => {
      
          
        if (!isDrawingRef.current || !startPosRef.current ) return;
    
        console.log("hand moving")
     
        const currentX = event.clientX;
        const currentY = event.clientY;
    
        const { x, y } = startPosRef.current;
    
        const dx = (currentX - x ) *0.5;
        const dy = (currentY -y) * 0.5;

    //       // Translate the canvas context
      ctx.translate(dx, dy);
      reDrawShapes();
    
    //   startPosRef.current = { x: currentX, y: currentY };
        // canvas.style.transform = `translate(${dx}px, ${dy}px)`;
    
    
    
      };
    
    
      return {
        handeHandleMouseDown, handHandleMouseMove
    
      }
    
}

export default useHandTool
