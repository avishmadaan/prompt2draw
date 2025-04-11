import { Shape } from "../contexts/draw-context";




export const getElementAtPosition =(x:number, y:number, shapes:Shape[]) => {

    return shapes.reverse().find(shape =>  iSWithinElement(x,y,shape))
  }

 export const iSWithinElement = (x:number, y:number, shape:Shape) => {

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



        const { centerX, centerY, radiusX, radiusY } = shape;
        // Calculate normalized distance based on the ellipse equation.
        const ellipseValue =
          ((x - centerX) ** 2) / (radiusX ** 2) +
          ((y - centerY) ** 2) / (radiusY ** 2);
        // If ellipseValue is less than or equal to 1, the point is inside the ellipse.
        return ellipseValue <= 1;

    }


  }

  export const distance = (
    a:{x:number, y:number},
    b:{x:number, y:number},

  ) =>  {
    return Math.sqrt(Math.pow(a.x -b.x, 2) + Math.pow(a.y - b.y, 2));

  }