import { snakeSpeed } from './snake.js';
import { update as updateSnake } from './snake.js';
import { draw as drawSnake } from './snake.js';
import { update as updateFood } from './food.js';
import { draw as drawFood } from './food.js';
import { getSnakeHead } from './snake.js';
import { snakeIntersection } from './snake.js';
import { outsideGrid } from './grid.js';

let lastRenderedTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board');

function main(currentTime) {

    if (gameOver) {
        if (confirm('You lost. Press OK to restart'))
            window.location = '/';
        return;
    }

    window.requestAnimationFrame(main);
    const secondsSinceLastRender = (currentTime - lastRenderedTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed)
    {
        return;
    }   
    lastRenderedTime = currentTime;

    update();
    draw();
}

window.requestAnimationFrame(main);

function update() {
    updateSnake();
    updateFood();
    checkDeath();
} 

function draw() {
    gameBoard.innerHTML = '';
    drawSnake(gameBoard);
    drawFood(gameBoard);
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}