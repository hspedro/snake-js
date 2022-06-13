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

    reset() {
        this.body = [
            {
                x: this.x,
                y: this.y,
            }
        ];
        this.curMove = 'STOP';
    }

    move() {
        if (!this.moves[this.curMove]) {
            return;
        }

        this.body.push(this.moves[this.curMove]);
        this.body.shift();
    }
}

class Apple {
    constructor(boardWidth, boardHeight, size) {
        this.boardWidth = boardWidth;
        this.boardHeight = boardHeight;
        this.size = size;
        this.color = 'red';
    }

    getNewPosition() {
        while(true) {
            let isCollidingWithSnake = false;
            this.x = Math.floor(
                Math.random() * this.boardWidth / this.size
            ) * this.size;
            this.y = Math.floor(
                Math.random() * this.boardHeight / this.size
            ) * this.size;

            for (let i = 0; i < snake.body.length; i++) {
                if (this.x === snake.body[i].x && this.y === snake.body[i].y) {
                    isCollidingWithSnake = true;
                }
            }

            if (!isCollidingWithSnake) {
                break;
            }
        }
    }
}

const board = new Board();
const snake = new Snake(
    board.ref.width / 2,
    board.ref.height / 2,
    20
);
const apple = new Apple(board.ref.width, board.ref.height, snake.size);
apple.getNewPosition();

// make it a parameter via button
const collision = false;

const checkWallCollisionAndReset = () => {
    const didCollide = (
        snake.head.x >= board.ref.width ||
        snake.head.y >= board.ref.height ||
        snake.head.y < 0 ||
        snake.head.x < 0
    );
    if (didCollide) {
        snake.reset();
    }
}

const wrapAround = () => {
    if (snake.head.x < 0) {
        snake.head.x = board.ref.width - snake.size;
    } else if (snake.head.x >= board.ref.width) {
        snake.head.x = 0;
    } else if (snake.head.y < 0) {
        snake.head.y = board.ref.height - snake.size;
    } else if (snake.head.y >= board.ref.height) {
        snake.head.y = 0;
    }
}

const updateState = () => {
    board.clear();
    snake.move();
    if (collision) {
        checkWallCollisionAndReset();
    } else {
        wrapAround();
    }
}

const draw = () => {
    board.drawRect(0, 0, 'black');
    board.drawRect(0, 0);

    // TODO: add score based on snake size
    board.setScore();
    board.drawSnake(snake)

    // TODO: draw apple
    board.drawRect(apple.x, apple.y, apple.color, apple.size, apple.size);
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

document.addEventListener('keydown', (event) => {
    const KEY_MAPPING = {
        ArrowRight: 'RIGHT',
        ArrowLeft: 'LEFT',
        ArrowUp: 'UP',
        ArrowDown: 'DOWN',
    }
    const direction = KEY_MAPPING[event.key]
    if (!direction) {
        return;
    }
    setTimeout(() => {
        snake.curMove = direction;
    }, 1);
});
