import { Canvas, ICanvas } from "../../../src/engine/dom/Canvas";

describe('Canvas', () => {
    let canvas: ICanvas<any>;
    let element: any;
    let spy: jasmine.Spy;

    beforeEach(() => {
        element = {
            width: 200,
            height: 120,
            getContext: () => {}
        };

        spy = spyOn(element, 'getContext');

        canvas = new Canvas<any>(element, '2d');
    });

    it("cache width, height, and center coordinates", () => {
        expect(canvas.width).toEqual(200);
        expect(canvas.height).toEqual(120);

        expect(canvas.centre.x).toEqual(100);
        expect(canvas.centre.y).toEqual(60);

        expect(spy.calls.count()).toEqual(1);
    });

    it("updates cached width, height, and center coordinates", () => {
        canvas.setDimension(400, 500);

        expect(canvas.width).toEqual(400);
        expect(canvas.height).toEqual(500);

        expect(element.width).toEqual(400);
        expect(element.height).toEqual(500);

        expect(canvas.centre.x).toEqual(200);
        expect(canvas.centre.y).toEqual(250);
    });
});