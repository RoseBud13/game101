const canvas = document.getElementById('pongCanvas');
const context = canvas.getContext('2d');

// Paddle properties
const paddleWidth = 10;
const paddleHeight = 100;
const paddleSpeed = 5;

// Ball properties
const ballSize = 10;
let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
let ballSpeedX = 4;
let ballSpeedY = 4;

// Player paddle
let playerY = (canvas.height - paddleHeight) / 2;

// AI paddle
let aiY = (canvas.height - paddleHeight) / 2;

// Key states
const keys = { up: false, down: false };

// Event listeners for key presses
document.addEventListener('keydown', event => {
    if (event.key === 'ArrowUp') keys.up = true;
    if (event.key === 'ArrowDown') keys.down = true;
});

document.addEventListener('keyup', event => {
    if (event.key === 'ArrowUp') keys.up = false;
    if (event.key === 'ArrowDown') keys.down = false;
});

function drawRect(x, y, width, height, color) {
    context.fillStyle = color;
    context.fillRect(x, y, width, height);
}

function drawCircle(x, y, radius, color) {
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, radius, 0, Math.PI * 2, false);
    context.closePath();
    context.fill();
}

function drawNet() {
    for (let i = 0; i <= canvas.height; i += 20) {
        drawRect(canvas.width / 2 - 1, i, 2, 10, '#FFF');
    }
}

function moveBall() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Ball collision with top and bottom walls
    if (ballY + ballSize > canvas.height || ballY - ballSize < 0) {
        ballSpeedY = -ballSpeedY;
    }

    // Ball collision with paddles
    let playerHit = ballX - ballSize < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight;
    let aiHit = ballX + ballSize > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight;

    if (playerHit || aiHit) {
        ballSpeedX = -ballSpeedX;
    }

    // Ball out of bounds
    if (ballX + ballSize > canvas.width || ballX - ballSize < 0) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX = -ballSpeedX;
    }
}

function movePlayer() {
    if (keys.up && playerY > 0) {
        playerY -= paddleSpeed;
    } else if (keys.down && playerY < canvas.height - paddleHeight) {
        playerY += paddleSpeed;
    }
}

function moveAI() {
    if (ballY < aiY + paddleHeight / 2) {
        aiY -= paddleSpeed;
    } else if (ballY > aiY + paddleHeight / 2) {
        aiY += paddleSpeed;
    }
}

function gameLoop() {
    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the net
    drawNet();

    // Draw paddles
    drawRect(0, playerY, paddleWidth, paddleHeight, '#FFF');
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, '#FFF');

    // Draw the ball
    drawCircle(ballX, ballY, ballSize, '#FFF');

    // Move elements
    moveBall();
    movePlayer();
    moveAI();

    // Loop
    requestAnimationFrame(gameLoop);
}

// Start the game
gameLoop();
