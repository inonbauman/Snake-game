// Game variables
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
var velocityX = 0;
var velocityY = 0;
var snakeBody = [];
var foodX;
var foodY;
var score = 0;
var highScore = 0;
var gameOver = false;

// Initialize the game
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);
    document.getElementById("newGameButton").addEventListener("click", startNewGame);
    loadHighScore();
    setInterval(update, 1000 / 10);
};

// Update the game state
function update() {
    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockSize, blockSize);

    if (snakeX === foodX && snakeY === foodY) {
        score++;
        updateScore();
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length > 0) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "lime";
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX, snakeY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
    }

    if (snakeX < 0 || snakeX >= cols * blockSize || snakeY < 0 || snakeY >= rows * blockSize) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX === snakeBody[i][0] && snakeY === snakeBody[i][1]) {
            endGame();
        }
    }
}

// Change the direction of the snake
function changeDirection(e) {
    if (e.code === "ArrowUp" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.code === "ArrowDown" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.code === "ArrowLeft" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
    } else if (e.code === "ArrowRight" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Place the food at a random position on the board
function placeFood() {
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows) * blockSize;
}

// Start a new game
function startNewGame() {
    snakeX = blockSize * 5;
    snakeY = blockSize * 5;
    velocityX = 0;
    velocityY = 0;
    snakeBody = [];
    score = 0;
    updateScore();
    gameOver = false;
    clearBoard();
    placeFood();
}

// End the game
function endGame() {
    gameOver = true;
    if (score > highScore) {
        highScore = score;
        updateHighScore();
        localStorage.setItem("highScore", highScore.toString());
        alert("Congratulations! You set a new High Score: " + highScore);
    } else {
        alert("Game Over. Your score is: " + score);
    }
}

// Update the score display
function updateScore() {
    document.getElementById("score").textContent = "Score: " + score;
}

// Load the high score from local storage
function loadHighScore() {
    if (localStorage.getItem("highScore")) {
        highScore = parseInt(localStorage.getItem("highScore"));
        updateHighScore();
    }
}

// Update the high score display
function updateHighScore() {
    document.getElementById("highScore").textContent = "High Score: " + highScore;
}

// Clear the game board
function clearBoard() {
    context.clearRect(0, 0, board.width, board.height);
}
