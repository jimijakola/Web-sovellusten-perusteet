import { Shape } from "./shape.js"

export class Circle extends Shape {
    #radius
    #strokeColor

    constructor(x, y, radius, lineWidth, strokeColor) {
        super(x, y, lineWidth)
        this.#radius = radius
        this.#strokeColor = strokeColor
    }

    draw(ctx) {
        ctx.beginPath()
        ctx.arc(this._x, this._y, this.#radius, 0, 2 * Math.PI)
        ctx.lineWidth = this._lineWidth
        ctx.strokeStyle = this.#strokeColor
        ctx.stroke()
    }
}
