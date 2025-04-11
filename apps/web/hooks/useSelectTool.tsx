import React, { useContext } from 'react'
import { DrawContext, Shape, shapes } from '../contexts/draw-context'
import { getElementAtPosition } from '../utils/selectUtils';

const useSelectTool = () => {

  const drawContext = useContext(DrawContext);

  if(!drawContext) return;

  const {canvasRef, startPosRef,isDrawingRef} = drawContext;

  let selectedElement:Shape | undefined;
   const selectHandleMouseDown = (
    event: MouseEvent,
  ) => {

    const x = event.clientX ;
    const y = event.clientY ;
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;

    selectedElement = getElementAtPosition(x,y, shapes);
  
  };


  const selectHandleMouseMove = (
    event: MouseEvent) => {

    if(!selectedElement) return;

    const {id, type} = selectedElement;

    const index = shapes.findIndex((shape) => shape.id == id)

    let shape:Shape;

    // if(type == "line") {
    //     shape = {
    //         type:"line",
    //         id,
    //         startX:selectedElement.startX +10;
    //     }
    // }

    // shapes[index] = 


  }



  return {
    selectHandleMouseDown, selectHandleMouseMove
  }
}

export default useSelectTool
