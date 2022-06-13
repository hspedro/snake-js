'use strict'

class Board {
    constructor() {
        this.ref = document.getElementById('canvas');
        this.ctx = this.ref.getContext('2d');
    }

    getTextPadding(text) {
        const paddingPerChar = 20;
        return 100 + (paddingPerChar * `${text}`.length);
    }

    setScore(score = 0) {
        this.ctx.font = '30px Arial';
        this.ctx.fillStyle = 'green';
        this.ctx.fillText(
            `Score: ${score}`,
            this.ref.width - this.getTextPadding(score),
            30,
        );
    }

    clear() {
        this.ctx.clearRect(0, 0, this.ref.width, this.ref.height);
    }

    drawRect(x, y, color, width = this.ref.width, height = this.ref.height) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, width, height);
    }

    drawSnake(snake) {
        for (let i = 0; i < snake.body.length; i++) {
            this.drawRect(
                snake.body[i].x + 2.5,
                snake.body[i].y + 2.5,
                'white',
                snake.size - 5,
                snake.size - 5,
            )
        }
    }
}

class Snake {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.body = [
            {
                x: this.x,
                y: this.y,
            }
        ];
        this.curMove = 'STOP';
    }

    get head() {
        return this.body[this.body.length - 1];
    }

    get moves() {
        return {
            RIGHT: {
                x: this.head.x + this.size,
                y: this.head.y,
            },
            LEFT: {
                x: this.head.x - this.size,
                y: this.head.y,
            },
            UP: {
                x: this.head.x,
                y: this.head.y - this.size,
            },
            DOWN: {
                x: this.head.x,
                y: this.head.y + this.size,
            },
        }
    }

    move() {
        if (!this.moves[this.curMove]) {
            return;
        }

        this.body.push(this.moves[this.curMove]);
        this.body.shift();
    }
}

const board = new Board();
const snake = new Snake(
    board.ref.width / 2,
    board.ref.height / 2,
    20
);

const updateState = () => {
    board.clear();
    snake.move();
}

const draw = () => {
    board.drawRect(0, 0, 'black');
    board.drawRect(0, 0);

    // TODO: add score based on snake size
    board.setScore();

    board.drawSnake(snake)

    // TODO: draw apple
}

const show = () => {
    updateState();
    draw();
}

const mainLoop = () => {
    const FPS = 15;
    setInterval(show, 1000/FPS);
}

window.onload = () => {
    mainLoop();
}
