export interface IGameLoop {
    start(): void;

    stop(): void;
}

export interface IRequestAnimation {
    requestAnimationFrame(callback: FrameRequestCallback): number;

    cancelAnimationFrame(handle: number): void;
}

export class GameLoop implements IGameLoop {
    private _handler: number = -1;
    private _lastGameLoopFrame: number;
    private _loop: () => void;
    private _window: IRequestAnimation;


    constructor(window: IRequestAnimation, update: (dt: number) => void) {
        this._window = window;
        this._lastGameLoopFrame = 0;
        this._loop = () => {
            let now = Date.now();
            this._handler = this._window.requestAnimationFrame(this._loop);
            update((now - this._lastGameLoopFrame) / 1000);
            this._lastGameLoopFrame = now;
        };
    }

    start() {
        this._lastGameLoopFrame = Date.now();
        this._window.requestAnimationFrame(this._loop);
    }

    stop() {
        this._window.cancelAnimationFrame(this._handler);
    }
}