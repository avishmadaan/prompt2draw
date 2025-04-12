import React from 'react'
import { useDraw } from './useDraw';
import { getElementAtPosition } from '../utils/selectUtils';
import { OurMouseEvent } from '../contexts/draw-context';

const useErasorTool = () => {

    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet} = useDraw();

    const erasorHandleMouseDown = (
        event: OurMouseEvent,
      ) => {

        const x = event.clientX 
        const y = event.clientY 
      
        startPosRef.current = { x, y };
        isDrawingRef.current = true;

        console.log("erasor called");
    
        const selectedElement = getElementAtPosition(x,y, shapesRef.current);

        if(selectedElement){
            const {id} = selectedElement;

            const shapes = shapesRef.current.filter((shape) =>  shape.id != id);

            shapesRef.current = shapes;

            reDrawShapes()
        }
      
      };


      const eraserHandleMouseMove = (
        event: OurMouseEvent,
      ) => {

        if (canvasRef.current) {
            canvasRef.current.style.cursor = getElementAtPosition(event.clientX , event.clientY , shapesRef.current)?"crosshair":"";
        }

      }
    




  return {
    erasorHandleMouseDown, eraserHandleMouseMove
  }
}

export default useErasorTool
