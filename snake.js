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

    drawRect (x, y, color) {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x, y, this.ref.width, this.ref.height);
    }
}

const board = new Board();

const draw = () => {
    board.drawRect(0, 0, 'black');
    board.drawRect(0, 0);

    // TODO: add score based on snake size
    board.setScore();

    // TODO: draw apple
}

const show = () => {
    board.clear();
    draw();
}

const mainLoop = () => {
    const FPS = 15;
    setInterval(show, 1000/FPS);
}

window.onload = () => {
    mainLoop();
}
