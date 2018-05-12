import { Vector, IVector } from "../geometry/Vector";

export interface ICanvas<T> {
    element: HTMLCanvasElement;
    context: T;
    centre: IVector;
    width: number;
    height: number;

    setDimension(width: number, height: number): void;
}

export class Canvas<T> implements ICanvas<T> {
    element: HTMLCanvasElement;
    context: T;
    centre: IVector;
    width: number;
    height: number;


    constructor(element: HTMLCanvasElement, context: string) {
        this.element = element;
        this.width = this.element.width;
        this.height = this.element.height;
        this.centre = new Vector(this.width / 2, this.height / 2);
        this.context = <any>this.element.getContext(context);
    }

    setDimension(width: number, height: number) {
        this.width = this.element.width = width;
        this.height = this.element.height = height;
        this.centre.x = this.width / 2;
        this.centre.y = this.height / 2;
    }
}