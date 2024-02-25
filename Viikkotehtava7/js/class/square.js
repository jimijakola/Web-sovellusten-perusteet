import { Rectangle } from "./rectangle.js"

export class Square extends Rectangle {
    constructor(x, y, side, lineWidth = 1, color = "black") {
        super(x, y, side, side, lineWidth, color)
    }
}
