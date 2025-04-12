import React, { useRef } from 'react'
import { useDraw } from './useDraw'
import { OurMouseEvent } from '../contexts/draw-context';

const useHandTool = () => {

    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet} = useDraw();

    const initialOffSetRef = useRef({
        offsetX:0,
        offsetY:0
    })



    const handeHandleMouseDown = (
        event: OurMouseEvent,
      ) => {

        initialOffSetRef.current = {...offSet.current}
      

        const x = event.clientX;
        const y = event.clientY;
    
      
        startPosRef.current = { x, y };
        isDrawingRef.current = true;

      };
    
    
    const handHandleMouseMove = (
        event: OurMouseEvent
      ) => {

        const canvas = canvasRef.current;
        
        const ctx = canvas?.getContext("2d");
      
          
        if (!isDrawingRef.current || !startPosRef.current ||!ctx) return;
    
        console.log("hand moving")
     
        const currentX = event.clientX;
        const currentY = event.clientY;
    
        const { x, y } = startPosRef.current;
    
        const dx = (currentX - x );
        const dy = (currentY -y) ;

    //       // Translate the canvas context
      
        offSet.current = {
            offsetX:dx + initialOffSetRef.current.offsetX,
            offsetY:dy + initialOffSetRef.current.offsetY
        }

      reDrawShapes();
  
    
      };
    
    
      return {
        handeHandleMouseDown, handHandleMouseMove
    
      }
    
}

export default useHandTool
