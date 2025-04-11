import {
    colorRefType,
    isDrawingRefType,
    Shape,
    shapes,
    shiftPressedRefType,
    startPosRefType,
  } from "../hooks/useDraw";
  import { reDrawShapes } from "../utils/redraw";
  import {v4 as uuidv4} from 'uuid';

  let selectedElement:Shape | undefined;
  
  export const selectHandleMouseDown = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType
  ) => {
  

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
  
    startPosRef.current = { x, y };
    isDrawingRef.current = true;

    selectedElement = getElementAtPosition(x,y, shapes);
  
  };

  const getElementAtPosition =(x:number, y:number, shapes:Shape[]) => {

    return shapes.reverse().find(shape =>  iSWithinElement(x,y,shape))
  }



  const iSWithinElement = (x:number, y:number, shape:Shape) => {

    const {type} = shape;

    if(type == "rect") {

        const {startX, startY, width, height} = shape;

        const minX = Math.min(startX, startX +width);
        const minY = Math.min(startY, startY +height);
        const maxX = Math.max(startX, startX +width);
        const maxY = Math.max(startY, startY +height);

        return x >= minX && x<= maxX && y>= minY && y<=maxY;

    }

    if(type == "line") {

        const {startX, startY, lastX, lastY} = shape;

        const a = {x:startX, y:startY};
        const b = {x:lastX, y:lastY};
        const c = {x,y};

        const offSet = distance(a,b) - distance(a,c) - distance(b,c);

        return Math.abs(offSet) <1;

    }

    if(type == "circle") {

        const {centerX, centerY} = shape;


    }


  }

  const distance = (
    a:{x:number, y:number},
    b:{x:number, y:number},

  ) =>  {
    return Math.sqrt(Math.pow(a.x -b.x, 2) + Math.pow(a.y - b.y, 2));

  }


  const selectHandleMouseMove = (
    event: MouseEvent,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    startPosRef: startPosRefType,
    isDrawingRef: isDrawingRefType,
    colorRef: colorRefType,
    shiftPressed:shiftPressedRefType,
    shapes: Shape[],
    zoom:number
  ) => {

    if(!selectedElement) return;

    const {id, type} = selectedElement;

    const index = shapes.findIndex((shape) => shape.id == id)

    let shape:Shape;

    if(type == "line") {
        shape = {
            type:"line",
            id,
            startX:selectedElement.startX +10;
        }
    }

    shapes[index] = 




  }