
import {  Shape, shapes } from '../contexts/draw-context'
import { getElementAtPosition } from '../utils/selectUtils';
import { useDraw } from './useDraw';

const useSelectTool = () => {

  const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, drawLine} = useDraw();

  let selectedElement:Shape | undefined;


   const selectHandleMouseDown = (
    event: MouseEvent,
  ) => {

    const x = event.clientX ;
    const y = event.clientY ;
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;

    selectedElement = getElementAtPosition(x,y, shapesRef.current);
  
  };


  const selectHandleMouseMove = (
    event: MouseEvent) => {


    if (canvasRef.current) {
            canvasRef.current.style.cursor = getElementAtPosition(event.clientX, event.clientY, shapesRef.current)?"move":"";
        }
  

    if(!selectedElement || !startPosRef.current) return;

    const shapes = shapesRef.current;

    const {id, type} = selectedElement;


    console.log("selected eLEMENTS")
    console.log(selectedElement);
    const index = shapes.findIndex((shape) => shape.id == id)



    const {x,y} =startPosRef.current;
    const {clientX, clientY} = event;

    if(type == "line") {

      const {lastX, lastY, startX, startY,color, id } =selectedElement;

      const offsetX = x -startX;
      const offsetY = y - startY;
      
      const newX = clientX -offsetX;
      const newY = clientY -offsetY;
      
      const newLastX = newX + lastX - startX;
      const newLastY = newY + lastY - startY;


      shapesRef.current[index] = {
          id,
          type:"line",
          startX:newX,
          startY:newY,
          lastX:newLastX,
          lastY:newLastY,
          color:color
      }

    }

    if(type == "rect") {

      const {startX, startY, width, height,color, id } =selectedElement;

      const offsetX = x -startX;
      const offsetY = y - startY;
      
      const newX = clientX -offsetX;
      const newY = clientY -offsetY;

      shapesRef.current[index] = {
        id,
        color,
        type:"rect",
        startX:newX,
        startY:newY,
        width,
        height
    }
    }

    if(type == "circle") {

      const {centerX, centerY, radiusX, radiusY,color, id } =selectedElement;

      const offsetX = x -centerX;
      const offsetY = y - centerY;
      
      const newX = clientX -offsetX;
      const newY = clientY -offsetY;

      shapesRef.current[index] = {
        id,
        color,
        type:"circle",
        centerX:newX,
        centerY:newY,
        radiusX,
        radiusY
    }
    }

    reDrawShapes();


  }


  const selectHandleMouseUp = (
    event: MouseEvent) => {

    selectedElement = undefined;


    }



  return {
    selectHandleMouseDown, selectHandleMouseMove, selectHandleMouseUp
  }
}

export default useSelectTool
