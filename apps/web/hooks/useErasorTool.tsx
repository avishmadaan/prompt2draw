import React from 'react'
import { useDraw } from './useDraw';
import { getElementAtPosition } from '../utils/selectUtils';

const useErasorTool = () => {

    const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet} = useDraw();

    const erasorHandleMouseDown = (
        event: MouseEvent,
      ) => {
    
        const {offsetX, offsetY} = offSet.current;
        const x = event.clientX  - offsetX;
        const y = event.clientY - offsetY;
      
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
        event: MouseEvent,
      ) => {

        if (canvasRef.current) {
            canvasRef.current.style.cursor = getElementAtPosition(event.clientX -offSet.current.offsetX, event.clientY -offSet.current.offsetY, shapesRef.current)?"crosshair":"";
        }

      }
    




  return {
    erasorHandleMouseDown, eraserHandleMouseMove
  }
}

export default useErasorTool
