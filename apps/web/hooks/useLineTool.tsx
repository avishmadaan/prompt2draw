import { v4 as uuidv4 } from "uuid";
import { useDraw } from "./useDraw";
import { OurMouseEvent } from "../contexts/drawContext";

const useLineTool = () => {
  const {
    canvasRef,
    startPosRef,
    isDrawingRef,
    shiftPressed,
    shapesRef,
    colorRef,
    zoomRef,
    reDrawShapes,
    drawLine,
    offSet,
    scaleOffSetRef,
    
  } = useDraw();

  const lineHandleMouseDown = (event: OurMouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    startPosRef.current = { x, y };
    isDrawingRef.current = true;
  };

  const lineHandleMouseMove = (event: OurMouseEvent) => {


    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!isDrawingRef.current || !startPosRef.current || !ctx) return;

    let currentX = event.clientX;
    let currentY = event.clientY;

    const { x, y } = startPosRef.current;

    if (shiftPressed.current) {
      if (Math.abs(currentX - x) > Math.abs(currentY - y)) {
        currentY = y;
      } else {
        currentX = x;
      }
    }

    // redraw old shapes
    reDrawShapes();

    drawLine(colorRef.current, x, y, currentX, currentY)
  };

  const lineHandleMouseUp = (event: OurMouseEvent) => {
    if (!isDrawingRef.current || !startPosRef.current) return;

    let currentX = event.clientX;
    let currentY = event.clientY;

    const { x, y } = startPosRef.current;

    if (shiftPressed.current) {
      if (Math.abs(currentX - x) > Math.abs(currentY - y)) {
        currentY = y;
      } else {
        currentX = x;
      }
    }

    const id = uuidv4();

    const shapes = shapesRef.current;

    const newShapes = [
      ...shapes,
      {
        type: "line" as const,
        id,
        x1: x,           // your stored mouse-down X
        y1: y,           // your stored mouse-down Y
        x2: currentX,           // the final mouse-up X
        y2: currentY,           // the final mouse-up Y
        strokeColor: colorRef.current,
        bgColor: "null"  // or omit bgColor if unused for lines
      }
    ];

    shapesRef.current = newShapes;

    // redraw old shapes
    reDrawShapes();
  };

  return {
    lineHandleMouseDown,
    lineHandleMouseMove,
    lineHandleMouseUp,
  };
};

export default useLineTool;
