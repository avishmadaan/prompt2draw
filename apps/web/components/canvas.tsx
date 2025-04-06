"use client";
import React, { useEffect, useRef, useState } from "react";

const Canvas = ({
  selectedTool,
  selectedColor,
}: {
  selectedTool: string;
  selectedColor: string;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawingRef = useRef<boolean>(false);
  const startPosRef = useRef<{x:number, y:number} | null>(null);
  const toolRef = useRef<string>(selectedTool);
  const colorRef = useRef<string>(selectedColor);

  useEffect(() => {
    colorRef.current = selectedColor;
  }, [selectedColor])

  useEffect(() => {
    toolRef.current = selectedTool;
  }, [selectedTool])


  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");

    if (!canvas || !ctx) return;

    ctx.fillStyle= "red";
    ctx.fillRect(50,50,200,200);

  

    const handleMouseDown = (event: MouseEvent) => {
      
      if(toolRef.current != "rect") return ;
      
      console.log("handleMouseDown")
      const rect =  canvas.getBoundingClientRect()
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      startPosRef.current ={x,y};
      isDrawingRef.current = true;

    };
    const handleMouseMove = (event: MouseEvent) => {

      console.log("mouse mvoing")
      console.log(toolRef.current)
      console.log(isDrawingRef.current)
      console.log(startPosRef.current)

      if(toolRef.current != "rect" || !isDrawingRef.current  || !startPosRef.current) return ;
      
      console.log("mouseMoveEvent")
      const rect =  canvas.getBoundingClientRect()
      const currentX = event.clientX -rect.left;
      const currentY = event.clientY - rect.top;
      

      const width = currentX - startPosRef.current.x;
      const height =currentY -  startPosRef.current.y ;

      console.log("cooridintates")
      const x = startPosRef.current.x
      const y = startPosRef.current.y
      console.log(x);
      console.log(y);

      ctx.clearRect(0,0, canvas.width, canvas.height);
      ctx.strokeStyle = colorRef.current;
      ctx.strokeRect(x,y, width, height)


    };

    const handleMouseUp = (event: MouseEvent) => {
      if(toolRef.current != "rect" || !isDrawingRef.current  || !startPosRef.current) return ;

      const rect = canvas.getBoundingClientRect();
      const currentX = event.clientX - rect.left;
      const currentY = event.clientY - rect.top;

      const width = currentX - startPosRef.current.x;
      const height = currentY - startPosRef.current.y ;

      ctx.fillStyle = colorRef.current;
      ctx.fillRect(startPosRef.current.x, startPosRef.current.y, width, height);

      isDrawingRef.current = false;
      startPosRef.current = null;

    };



    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", handleMouseUp);
    canvas.addEventListener("mousemove", handleMouseMove);

    return () => {
      canvas.removeEventListener("mousedown", handleMouseDown);
      canvas.removeEventListener("mouseup", handleMouseUp);
      canvas.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
<canvas
  ref={canvasRef}
  width={window.innerWidth}
  height={window.innerHeight}
  className="inset-0 absolute w-full h-full "
/>
  );
};

export default Canvas;
