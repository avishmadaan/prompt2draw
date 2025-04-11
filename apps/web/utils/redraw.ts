
import { Shape } from "../contexts/draw-context";
import { drawCircle } from "../tools/circle";
import { drawLine } from "../tools/line";

export const reDrawShapes = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    shapes:Shape[],
    zoom:number

) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.save();
    ctx.scale(zoom, zoom);

    shapes.map((shape) => {

        if(shape.type == "rect") {
            drawRect(ctx, shape.color, shape.startX, shape.startY, shape.width, shape.height)
        }

        if(shape.type =="circle" ) {
            drawCircle(ctx, shape.color, shape.centerX, shape.centerY, shape.radiusX, shape.radiusY);
        }

        if(shape.type =="line" ) {
            drawLine(ctx, shape.color, shape.startX, shape.startY, shape.lastX, shape.lastY);
        }
    })

    ctx.restore();

}