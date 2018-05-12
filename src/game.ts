import { GameLoop } from "./engine/GameLoop";
import { Canvas, ICanvas } from "./engine/dom/Canvas";
import { Box, IBox } from "./engine/geometry/Box";

class Game {
    public distance = 0;

    public static vehicleImage = new Image();

    public static loadGame(): void {
        Game.vehicleImage.src = '/assets/player-vehicle.png';
        Game.vehicleImage.onload = function() {
            new Game().start();
        };
    }

    public start(): void {
        let score = 0;

        const canvas = new Canvas<CanvasRenderingContext2D>(document.getElementById('game') as HTMLCanvasElement, '2d');
        const gameLoop = new GameLoop(window,(dt : number) => {
            score += 0.1;
            render();
        });

        let player = {
            x: canvas.width / 3 + 30,
            y: canvas.height - 150
        };

        window.addEventListener('keyup', (event) => {
            switch(event.code) {
                case 'ArrowLeft':
                    player.x -= 150;
                    break;
                case 'ArrowRight':
                    player.x += 150;
                    break;
            }
        });

        let render = () => {
            canvas.context.clearRect(0, 0, canvas.width, canvas.height);
            this.drawRoad(canvas.context, canvas);
            Game.drawImage(canvas.context, Game.vehicleImage, new Box(Game.vehicleImage.width, Game.vehicleImage.height, player));
            this.drawUI(canvas.context, Math.floor(score));
        };

        gameLoop.start();
    }

    public static drawImage(ctx: CanvasRenderingContext2D, image: HTMLImageElement, size: IBox): void {
        ctx.drawImage(
            image,
            size.pos.x - size.width / 2,
            size.pos.y - size.height / 2,
            size.width,
            size.height
        );
    }

    public drawRoad(ctx: CanvasRenderingContext2D, canvas: ICanvas<any>): void {
        this.distance += 2;
        ctx.fillStyle = '#fff';
        for(let line = 1; line <= 3; line++) {
            for(let row = -1; row < canvas.height / 5; row++) {
                ctx.fillRect(canvas.width / 4 * line, (canvas.height / 5) * row + this.distance, 10, 80);
            }
        }

        if(this.distance > canvas.height / 5) {
            this.distance = 0;
        }
    }

    public drawUI(ctx: CanvasRenderingContext2D, score: number): void {
        ctx.fillStyle = '#fff';
        ctx.font = "22px Arial";
        ctx.fillText(`Score: ${score}`, 20, 35);
    }
}

window.addEventListener('load', Game.loadGame);