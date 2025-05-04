"use client";
import React, { useRef, useEffect } from 'react'
import { useDraw } from './useDraw'
import { OurMouseEvent } from '../contexts/drawContext';

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

      let panScheduled = false;
    
    const handHandleMouseMove = (
        event: OurMouseEvent
      ) => {

        if (!isDrawingRef.current || !startPosRef.current ) return;
     
        const currentX = event.clientX;
        const currentY = event.clientY;
        const { x, y } = startPosRef.current;
    
        // Scale the movement by the inverse of the zoom level
        const dx = (currentX - x) ;
        const dy = (currentY - y) ;
      
        offSet.current = {
            offsetX: dx + initialOffSetRef.current.offsetX,
            offsetY:dy + initialOffSetRef.current.offsetY
        }

       if(!panScheduled) {
        panScheduled =true;

        window.requestAnimationFrame(() => {
            reDrawShapes();
            panScheduled =false;
        })
       }



    
      };
    
    return {
        handeHandleMouseDown, handHandleMouseMove
    }
}

export default useHandTool
