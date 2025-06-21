
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let score = 0;

// Initial snake with one block
let snake = [{ x: 9 * box, y: 10 * box }];

// Randomly placed food
let food = {
  x: Math.floor(Math.random() * (canvasSize / box)) * box,
  y: Math.floor(Math.random() * (canvasSize / box)) * box
};

// Initial direction
let direction = "RIGHT";

// Listen to keyboard events
document.addEventListener("keydown", setDirection);

function setDirection(event) {
  const key = event.key;

  if (key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
  else if (key === "ArrowDown" && direction !== "UP") direction = "DOWN";
}

function drawGame() {
  // Draw background
  ctx.fillStyle = "#111";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, box, box);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "lime" : "#0f0";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Snake head position
  let headX = snake[0].x;
  let headY = snake[0].y;

  // Move head
  if (direction === "LEFT") headX -= box;
  if (direction === "RIGHT") headX += box;
  if (direction === "UP") headY -= box;
  if (direction === "DOWN") headY += box;

  // Game over conditions
  if (
    headX < 0 || headX >= canvasSize ||
    headY < 0 || headY >= canvasSize ||
    isCollision(headX, headY, snake)
  ) {
    clearInterval(game);
    alert("Game Over! Score: " + score);
    return;
  }

  // If snake eats food
  if (headX === food.x && headY === food.y) {
    score++;
    document.getElementById("score").innerText = score;
    food = {
      x: Math.floor(Math.random() * (canvasSize / box)) * box,
      y: Math.floor(Math.random() * (canvasSize / box)) * box
    };
  } else {
    snake.pop(); // remove tail
  }

  // Add new head
  const newHead = { x: headX, y: headY };
  snake.unshift(newHead);
}

function isCollision(x, y, array) {
  for (let i = 0; i < array.length; i++) {
    if (x === array[i].x && y === array[i].y) return true;
  }
  return false;
}

// Start the game loop
const game = setInterval(drawGame, 100);
