// Game constants
let direction = { x: 0, y: 0 };
let board = document.querySelector(".board");
let moveSound = new Audio('mixkit-game-ball-tap-2073.wav');
let backgroundSound = new Audio('mixkit-game-level-music-689.wav');
let gameOverSound = new Audio('mixkit-arcade-game-opener-222.wav');
let sc = document.querySelector("#sc");
let speed = 5;
var score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let food = { x: 4, y: 8 };
let inputDir = { x: 0, y: 0 };

// Game functions
function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    if (snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0) {
        return true;
    }
    return false;
}

function gameEngine() {
    if (isCollide(snakeArr)) {
        backgroundSound.pause();
        gameOverSound.play();
        inputDir = { x: 0, y: 0 };
        alert("Game Over! Press OK to restart.");
        snakeArr = [{ x: 13, y: 15 }];
        score = 0;
        sc.innerHTML = score;
    }

    if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y });
        let a = 3;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
        score += 1;
        sc.innerHTML = score;
        console.log(score);
    }

    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };
    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
        } else {
            snakeElement.classList.add('snb');
        }
        board.appendChild(snakeElement);
    });

    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}

window.requestAnimationFrame(main);

window.addEventListener('keydown', e => {
    backgroundSound.play();
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            inputDir = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            inputDir = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            inputDir = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            inputDir = { x: 1, y: 0 };
            break;
        default:
            break;
    }
});

// Add event listeners for buttons
document.getElementById('up').addEventListener('click', () => {
    moveSound.play()
    backgroundSound.play();
    inputDir = { x: 0, y: -1 };
});
document.getElementById('down').addEventListener('click', () => {
    moveSound.play()
    backgroundSound.play();
    inputDir = { x: 0, y: 1 };
});
document.getElementById('left').addEventListener('click', () => {
    moveSound.play();
    backgroundSound.play();
    inputDir = { x: -1, y: 0 };
});
document.getElementById('right').addEventListener('click', () => {
    moveSound.play()
    backgroundSound.play();
    inputDir = { x: 1, y: 0 };
});
