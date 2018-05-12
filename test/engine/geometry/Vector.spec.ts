import { Vector } from "../../../src/engine/geometry/Vector";

describe('Vector', function () {

    it('copy', function() {
        let vector1 = new Vector(1, 2);
        let vector2 = new Vector(4, 5);

        vector1.copy(vector2);

        expect(vector1.x).toEqual(4);
        expect(vector1.y).toEqual(5);
    });
});