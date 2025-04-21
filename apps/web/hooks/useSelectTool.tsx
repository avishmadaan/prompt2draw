
import {  OurMouseEvent, Shape } from '../contexts/draw-context'
import { getElementAtPosition } from '../utils/selectUtils';
import { useDraw } from './useDraw';

const useSelectTool = () => {

  const {canvasRef, startPosRef,isDrawingRef, shiftPressed, shapesRef, colorRef, zoomRef, reDrawShapes, offSet} = useDraw();

  let selectedElement:Shape | undefined;


   const selectHandleMouseDown = (
    event: OurMouseEvent,
  ) => {

    const x = event.clientX;
    const y = event.clientY ;
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;

    selectedElement = getElementAtPosition(x,y, shapesRef.current);
  
  };


  const selectHandleMouseMove = (
    event: OurMouseEvent) => {


    if (canvasRef.current) {
            canvasRef.current.style.cursor = getElementAtPosition(event.clientX , event.clientY , shapesRef.current)?"move":"";
        }
  

    if(!selectedElement || !startPosRef.current) return;

    const shapes = shapesRef.current;

    const {id, type} = selectedElement;


    const index = shapes.findIndex((shape) => shape.id == id)



    const {x,y} =startPosRef.current;
    let {clientX, clientY} = event;


    const currentX = event.clientX ;
    const currentY = event.clientY;

    clientX = currentX;
    clientY = currentY

    if(type == "line") {

      const {x1,y1,x2,y2,strokeColor, id } =selectedElement;

      const offsetX = x -x1;
      const offsetY = y - y1;
      
      const newX = clientX -offsetX;
      const newY = clientY -offsetY;
      
      const newLastX = newX + x2 - x1;
      const newLastY = newY + y2 - y1;


      shapesRef.current[index] = {
          id,
          type:"line",
          x1:newX,
          y1:newY,
          x2:newLastX,
          y2:newLastY,
          strokeColor:strokeColor,
          bgColor:"null"
      }

    }

    if(type == "rect") {
      const { x1, y1, x2, y2, strokeColor, bgColor, id } = selectedElement;
      const offsetX = x - x1;
      const offsetY = y - y1;
      const newX = clientX - offsetX;
      const newY = clientY - offsetY;
      const newX2 = newX + (x2 - x1);
      const newY2 = newY + (y2 - y1);
      shapesRef.current[index] = {
        id,
        strokeColor,
        bgColor,
        type: "rect",
        x1: newX,
        y1: newY,
        x2: newX2,
        y2: newY2,
      };
    }

    if(type == "circle") {
      const { x1, y1, x2, y2, strokeColor, bgColor, id } = selectedElement;
      // Original center
      const centerX0 = (x1 + x2) / 2;
      const centerY0 = (y1 + y2) / 2;
      // Offset from center
      const offsetX = x - centerX0;
      const offsetY = y - centerY0;
      // New center based on mouse movement
      const newCenterX = clientX - offsetX;
      const newCenterY = clientY - offsetY;
      // Radii
      const radiusX = Math.abs(x2 - x1) / 2;
      const radiusY = Math.abs(y2 - y1) / 2;
      // Compute new bounding box corners
      const newX1 = newCenterX - radiusX;
      const newY1 = newCenterY - radiusY;
      const newX2 = newCenterX + radiusX;
      const newY2 = newCenterY + radiusY;
      shapesRef.current[index] = {
        id,
        strokeColor,
        bgColor,
        type: "circle",
        x1: newX1,
        y1: newY1,
        x2: newX2,
        y2: newY2,
      };
    }

    reDrawShapes();


  }


  const selectHandleMouseUp = (
    event: OurMouseEvent) => {

    selectedElement = undefined;


    }



  return {
    selectHandleMouseDown, selectHandleMouseMove, selectHandleMouseUp
  }
}

export default useSelectTool
