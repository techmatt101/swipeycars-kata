import { Vector, IVector } from "./Vector";

export interface ICircle {
    radius: number;
    pos: IVector;
}

export class Circle {
    public radius: number;
    public pos: IVector;

    constructor(radius: number, pos: IVector = new Vector(0, 0)) {
        this.radius = radius;
        this.pos = pos;
    }

    public isCollidingWith(circle: ICircle): boolean {
        let a = this.radius + circle.radius;
        let x = this.pos.x - circle.pos.x;
        let y = this.pos.y - circle.pos.y;
        return a > Math.sqrt((x * x) + (y * y));
    }
}