import { GameLoop, IGameLoop } from "../../src/engine/GameLoop";

describe('GameLoop', () => {
    let gameLoop : IGameLoop;
    let mockAction: () => void;
    let timeout = 100;
    let timeoutId: number;

    beforeEach(() => {
        jest.useFakeTimers();
        mockAction = jest.fn();
        gameLoop = new GameLoop({
            requestAnimationFrame: (func) => timeoutId = setTimeout(func, timeout),
            cancelAnimationFrame: (id) => clearTimeout(id)
        }, mockAction);
    });

    afterEach(() => {
        clearTimeout(timeoutId);
    });

    describe('while running', () => {
        it("runs an assigned callback", () => {
            gameLoop.start();
            jest.advanceTimersByTime(timeout);
            expect(mockAction).toHaveBeenCalled();
        });

        it("can run iterate more than once", () => {
            gameLoop.start();
            jest.advanceTimersByTime(timeout * 3);
            expect(mockAction).toHaveBeenCalledTimes(3);
        });

        it("can stop the loop", () => {
            gameLoop.start();
            jest.advanceTimersByTime(timeout * 3);
            gameLoop.stop();
            jest.advanceTimersByTime(timeout * 2);
            expect(mockAction).toHaveBeenCalledTimes(3);
        });
    });
});