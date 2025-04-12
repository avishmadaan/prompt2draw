
import {  Shape } from '../contexts/draw-context'
import { getElementAtPosition } from '../utils/selectUtils';
import { useDraw } from './useDraw';

const useSelectTool = () => {

  const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet} = useDraw();

  let selectedElement:Shape | undefined;


   const selectHandleMouseDown = (
    event: MouseEvent,
  ) => {

    const {offsetX, offsetY} = offSet.current;
    const x = event.clientX  - offsetX;
    const y = event.clientY - offsetY;
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;

    selectedElement = getElementAtPosition(x,y, shapesRef.current);
  
  };


  const selectHandleMouseMove = (
    event: MouseEvent) => {


    if (canvasRef.current) {
            canvasRef.current.style.cursor = getElementAtPosition(event.clientX -offSet.current.offsetX, event.clientY -offSet.current.offsetY, shapesRef.current)?"move":"";
        }
  

    if(!selectedElement || !startPosRef.current) return;

    const shapes = shapesRef.current;

    const {id, type} = selectedElement;


    console.log("selected eLEMENTS")
    console.log(selectedElement);
    const index = shapes.findIndex((shape) => shape.id == id)



    const {x,y} =startPosRef.current;
    let {clientX, clientY} = event;

    const {offsetX, offsetY} = offSet.current;

    const currentX = event.clientX -offsetX 
    const currentY = event.clientY  - offsetY

    clientX = currentX;
    clientY = currentY

    if(type == "line") {

      const {lastX, lastY, startX, startY,strokeColor, id } =selectedElement;

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
          strokeColor:strokeColor
      }

    }

    if(type == "rect") {

      const {startX, startY, width, height,strokeColor, bgColor, id } =selectedElement;

      const offsetX = x -startX;
      const offsetY = y - startY;
      
      const newX = clientX -offsetX;
      const newY = clientY -offsetY;

      shapesRef.current[index] = {
        id,
        strokeColor,
        bgColor,
        type:"rect",
        startX:newX,
        startY:newY,
        width,
        height
    }
    }

    if(type == "circle") {

      const {centerX, centerY, radiusX, radiusY,strokeColor, bgColor, id } =selectedElement;

      const offsetX = x -centerX;
      const offsetY = y - centerY;
      
      const newX = clientX -offsetX;
      const newY = clientY -offsetY;

      shapesRef.current[index] = {
        id,
        strokeColor,
        bgColor,
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
