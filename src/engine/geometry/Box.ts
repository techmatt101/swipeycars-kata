import { Vector, IVector } from "./Vector";

export interface IBox {
    width: number;
    height: number;
    pos: IVector;
}

export class Box implements IBox {
    public width: number;
    public height: number;
    public pos: IVector;

    constructor(width: number, height: number, pos: IVector = new Vector(0, 0)) {
        this.width = width;
        this.height = height;
        this.pos = pos;
    }

    public isCollidingWith(box: IBox): boolean {
        return this.pos.x - this.width / 2 < box.pos.x + box.width / 2 &&
            this.pos.x + this.width / 2 > box.pos.x - box.width / 2 &&
            this.pos.y - this.height / 2 < box.pos.y + box.height / 2 &&
            this.pos.y + this.height / 2 > box.pos.y - box.height / 2;
    }

    public getOffset(box: IBox): IVector {
        const offset = this.getIntersectionDepth(box);

        if (Math.abs(offset.x) <= Math.abs(offset.y)) {
            offset.y = 0;
        } else {
            offset.x = 0;
        }

        return offset;
    }

    public getIntersectionDepth(rectB: IBox): IVector {
        let offset = new Vector(0, 0);
        offset.x = this.pos.x - rectB.pos.x;
        offset.x = ((offset.x > 0) ? 1 : -1) * ((this.width + rectB.width) / 2) - offset.x;

        offset.y = this.pos.y - rectB.pos.y;
        offset.y = ((offset.y > 0) ? 1 : -1) * ((this.height + rectB.height) / 2) - offset.y;

        return offset;
    }
}