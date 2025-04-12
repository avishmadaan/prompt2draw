"use client";
import React, { useEffect, useRef } from "react";
import { useDraw } from "../hooks/useDraw";
import useRectTool from "../hooks/useRectTool";
import useCircleTool from "../hooks/useCircleTool";
import useLineTool from "../hooks/useLineTool";
import useHandTool from "../hooks/useHandTool";
import useSelectTool from "../hooks/useSelectTool";
import useErasorTool from "../hooks/useErasorTool";
import useTools from "../hooks/useTools";
import { OurMouseEvent } from "../contexts/draw-context";

const Canvas = () => {


  const {canvasRef, isDrawingRef, startPosRef, toolRef, colorRef, shiftPressed, shapesRef, zoomRef, offSet, scaleOffSetRef} = useDraw();


  const {setToolSelected, toolSelected} = useTools();

  const { rectHandleMouseDown, rectHandleMouseMove, rectHandleMouseUp} = useRectTool() || {};

  const { circleHandleMouseDown, circleHandleMouseMove, circleHandleMouseUp} = useCircleTool() || {};


  const { lineHandleMouseDown, lineHandleMouseMove, lineHandleMouseUp } = useLineTool() || {};


  const { handeHandleMouseDown, handHandleMouseMove } = useHandTool() || {};

  const { selectHandleMouseDown, selectHandleMouseMove , selectHandleMouseUp} = useSelectTool() || {};

  const { erasorHandleMouseDown, eraserHandleMouseMove} = useErasorTool() || {};


  const previousToolRef = useRef(toolSelected);

  useEffect(() => {
    console.log("setting dimensions")

    const canvas = canvasRef.current;

    if(canvas && canvasRef.current) {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;

       canvasRef.current.style.cursor= "crosshair"
    }
  }, []);

  const getClientCoordinates = (event:MouseEvent) : OurMouseEvent=> {

    const {offsetX, offsetY} = offSet.current;
    const {x: scaleOffsetX,y:scaleOffsetY} = scaleOffSetRef.current;
    const scale = zoomRef.current

    const x = (event.clientX  - offsetX*scale + scaleOffsetX)/scale;
    const y = (event.clientY  - offsetY*scale + scaleOffsetY)/scale;

    return {
      clientX:x,
      clientY:y
    }

  }



  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!canvas || !ctx) return;
    canvas?.focus();

    console.log(toolRef.current)

    const handleMouseDown = (event: MouseEvent) => {
      const ourEvent = getClientCoordinates(event);
      if(toolRef.current == "rect" && rectHandleMouseDown) {
        rectHandleMouseDown(ourEvent);
      }

      if(toolRef.current == "circle" && circleHandleMouseDown) {
        circleHandleMouseDown(ourEvent);
      }
      

           if(toolRef.current == "line" && lineHandleMouseDown) {

        lineHandleMouseDown(ourEvent);
      }

      if(toolRef.current == "hand" && handeHandleMouseDown) {
        handeHandleMouseDown(ourEvent );
      }
      if(toolRef.current == "select" && selectHandleMouseDown) {
        selectHandleMouseDown(ourEvent );
      }
      if(toolRef.current == "eraser" && erasorHandleMouseDown) {
        erasorHandleMouseDown(ourEvent );
      }

    };
    const handleMouseMove = (event: MouseEvent) => {
      const ourEvent = getClientCoordinates(event);


      if(toolRef.current == "rect" && rectHandleMouseMove) {
        rectHandleMouseMove(ourEvent)
      } 

      if(toolRef.current == "circle" && circleHandleMouseMove) {
        circleHandleMouseMove(ourEvent)
      } 

      if(toolRef.current == "line" && lineHandleMouseMove ) {
        lineHandleMouseMove(ourEvent)
      } 

      if(toolRef.current == "hand" && handHandleMouseMove) {
        handHandleMouseMove(ourEvent)
      } 
      if(toolRef.current == "select" && selectHandleMouseMove) {
        selectHandleMouseMove(ourEvent)
      } 
      if(toolRef.current == "eraser" && eraserHandleMouseMove) {
        eraserHandleMouseMove(ourEvent)
      } 


      
    };

    const handleMouseUp = (event: MouseEvent) => {

      const ourEvent = getClientCoordinates(event);

      if(toolRef.current == "rect" && rectHandleMouseUp ) {
        rectHandleMouseUp(ourEvent);
      } 

      if(toolRef.current == "circle"  && circleHandleMouseUp) {
        circleHandleMouseUp(ourEvent)
      } 
      if(toolRef.current == "line" && lineHandleMouseUp ) {
        lineHandleMouseUp(ourEvent)
      }
      if(toolRef.current == "select" && selectHandleMouseUp ) {
        selectHandleMouseUp(ourEvent)
      }


      isDrawingRef.current = false;
      startPosRef.current = null;

    };


    const handleKeyDown = (event:KeyboardEvent) => {

      if(event.key =="Shift") {

        shiftPressed.current = true;
      }

      if(event.key ==" " && !event.repeat) {
        console.log("coming in if")
        previousToolRef.current =toolRef.current;
        setToolSelected("hand");
      }
    }
    
    const handleKeyUp = (event:KeyboardEvent) => {
      if(event.key =="Shift") {
        shiftPressed.current = false;
      }

      if(event.key ==" " ) {
        console.log("coming up")
        setToolSelected(previousToolRef.current);
      }
    }

    


    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    
    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={""}
      height={""}
      className={`inset-0 absolute w-full h-full    `}
    />
  );
};

export default Canvas;
