import { Shape } from "../hooks/useDraw";

export const reDrawShapes = (
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    shapes:Shape[]

) => {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    shapes.map((shape) => {

        if(shape.type == "rect") {
            ctx.fillStyle = shape.color;
            ctx.fillRect(shape.startX, shape.startY, shape.width, shape.height)

        }

        if(shape.type =="circle" ) {
            ctx.fillStyle = shape.color;
            ctx.beginPath();
            ctx.ellipse(shape.centerX, shape.centerY,shape.radiusX,shape.radiusY,0,0, Math.PI*(2) );
            ctx.fill()
            ctx.closePath();

        }

        if(shape.type =="line" ) {
            ctx.strokeStyle = shape.color;
            ctx.beginPath();
            ctx.moveTo(shape.startX,shape.startY);
            ctx.lineTo(shape.lastX, shape.lastY)
            ctx.lineWidth =2;
            ctx.stroke();
            ctx.closePath();

        }
    })

}