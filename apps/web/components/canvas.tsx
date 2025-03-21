"use client"
import React, { useEffect, useRef } from 'react'

const Canvas = () => {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        // set canvas size

        if (ctx) {
            ctx.fillStyle = "red";
            ctx.fillRect(50,50,200,100);
        }

        window.addEventListener("mousedown", (event:any) => {
            console.log(event.clientX);
        })

        

    })

  return (
    <canvas
    ref={canvasRef}
    className=' inset-0 absolute  w-full h-full'
    />
  )
}

export default Canvas
