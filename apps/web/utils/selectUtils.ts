import { Shape } from "../contexts/drawContext";




export const getElementAtPosition =(x:number, y:number, shapes:Shape[]) => {

    return [...shapes].reverse().find(shape => iSWithinElement(x, y, shape));
  }

 export const iSWithinElement = (x:number, y:number, shape:Shape) => {

    const {type} = shape;
    const {x1, y1, x2, y2} = shape;

    if(type == "rect") {


        // const minX = Math.min(startX, startX +width);
        // const minY = Math.min(startY, startY +height);
        // const maxX = Math.max(startX, startX +width);
        // const maxY = Math.max(startY, startY +height);

        return x >= x1 && x<= x2 && y>= y1 && y<=y2;

    }

    if(type == "line") {

   

        const a = {x:x1, y:y1};
        const b = {x:x2, y:y2};
        const c = {x,y};

        const offSet = distance(a,b) - distance(a,c) - distance(b,c);

        return Math.abs(offSet) <1;

    }

    if(type == "circle") {

  // 1) Compute center point
  const centerX = (x1 + x2) / 2;
  const centerY = (y1 + y2) / 2;

  // 2) Compute radii
  const radiusX = Math.abs(x2 - x1) / 2;
  const radiusY = Math.abs(y2 - y1) / 2;



     // 3) Precise ellipse check
     const dx = x - centerX;
     const dy = y - centerY;
     return (dx * dx) / (radiusX * radiusX) + (dy * dy) / (radiusY * radiusY) <= 1


    }
;

  }

  export const distance = (
    a:{x:number, y:number},
    b:{x:number, y:number},

  ) =>  {
    return Math.sqrt(Math.pow(a.x -b.x, 2) + Math.pow(a.y - b.y, 2));

  }



//   type Handle = "nw" | "n" | "ne" | "e" | "se" | "s" | "sw" | "w";

//   export function getHandleAtPosition(
//     x:number,
//     y:number,
//     shape:Shape

//   ): Handle | null {


//   }