export interface IVector {
    x: number;
    y: number;
}

export class Vector implements IVector {
    public x: number;
    public y: number;

    public static From(other: IVector) {
        return new Vector(other.x, other.y);
    }

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public traject(speed: number, direction: number): void {
        this.x += speed * Math.cos(direction);
        this.y += speed * Math.sin(direction);
    }

    public reverse(): IVector {
        this.x = -this.x;
        this.y = -this.y;

        return this;
    }

    public offset(offset: IVector): IVector {
        this.x += offset.x;
        this.y += offset.y;
        return this;
    }

    public scale(n: number): IVector {
        this.x *= n;
        this.y *= n;

        return this;
    }

    public min(other: IVector): IVector {
        this.x = Math.min(this.x, other.x);
        this.y = Math.min(this.y, other.y);

        return this;
    }

    public max(other: IVector): IVector {
        this.x = Math.max(this.x, other.x);
        this.y = Math.max(this.y, other.y);

        return this;
    }

    public equal(other: IVector): boolean {
        return (other.x === this.x && other.y === this.y);
    }

    public set(x: number, y: number): void {
        this.x = x;
        this.y = y;
    }

    public copy(other: IVector): IVector {
        this.x = other.x;
        this.y = other.y;
        return this;
    }

    public reset(): void {
        this.x = 0;
        this.y = 0;
    }

    public add(other: IVector): IVector {
        this.x += other.x;
        this.y += other.y;

        return this;
    }

    public sub(other: IVector): IVector {
        this.x -= other.x;
        this.y -= other.y;

        return this;
    }

    public multiply(other: IVector): IVector {
        this.x *= other.x;
        this.y *= other.y;

        return this;
    }

    public divide(other: IVector): IVector {
        this.x /= other.x;
        this.y /= other.y;

        return this;
    }

    public floor(): void {
        this.x = ~~this.x;
        this.y = ~~this.y;
    }

    public clamp(min: IVector, max: IVector): IVector {
        this.x = Math.min(Math.max(this.x, min.x), max.x);
        this.y = Math.min(Math.max(this.y, min.y), max.y);

        return this;
    }

    public normalize(): IVector {
        var d = this.len();
        if (d > 0) {
            this.x = this.x / d;
            this.y = this.y / d;
        }
        return this;
    }

    public dot(other: IVector): number {
        return this.x * other.x + this.y * other.y;
    }

    public len(): number {
        return Math.sqrt(this.dot(this));
    }
}