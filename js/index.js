//Game constants & variables
let inputDir = { x: 0, y: 0 };
let board = document.getElementById("board");
const foodSound = new Audio("./music/food.mp3");
const gameOverSound = new Audio("./music/gameover.mp3");
const moveSound = new Audio("./music/move.mp3");
const musicSound = new Audio("./music/music.mp3");
let speed = 10;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];

food = { x: 12, y: 12 };

// Game Functions
function main(ctime) {
  window.requestAnimationFrame(main);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(snake) {
  // if bump into the yourself
  for (let i = 1; i < snakeArr.length; i++)
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true;
    // if bump into the walls
  if (snake[0].x <= 0 || snake[0].x >= 18 || snake[0].y <= 0 || snake[0].y >= 18)
    return true;
  return false;
}

function gameEngine() {
  // Part 1: Updating the snake array & Food
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    moveSound.pause();
    inputDir = { x: 0, y: 0 };
    score = 0;
    alert("Game Over.Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    scoreBox.innerHTML = "Score : " + score;
    // musicSound.play();
    
  }
  // if you have eaten the food,increment the score and regenerate the food
  if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
    foodSound.play();
    score += 1;
    if(score > highScoreVal){
      highScoreVal = score;
      localStorage.setItem("highScore ",JSON.stringify(highScoreVal));
    }
    highScoreBox.innerHTML = "Hi Score: " + highScoreVal;
    scoreBox.innerHTML = "Score : " + score;
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //Moving the snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;
  // Part2: Display the snake and Food
  // Display the Snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });

  //  Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridColumnStart = food.x;
  foodElement.style.gridRowStart = food.y;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

let highScoreVal = 0;
// Main logic goes here
let highScore = window.localStorage.getItem("highScore");
if(highScore === null ){
  highScoreVal = 0;
  localStorage.setItem("highScore ",JSON.stringify(highScoreVal));
} else {
  highScoreVal = JSON.parse(highScore);
  highScoreBox.innerHTML = "highScore: " + highScoreVal;
}
console.log(highScore);
window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  moveSound.play();
  inputDir = { x: 0, y: 1 };
  switch (e.key) {
    case "ArrowUp":
      console.log("ArrowUp");
      inputDir.x = 0;
      inputDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      inputDir.x = 0;
      inputDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      inputDir.x = -1;
      inputDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      inputDir.x = 1;
      inputDir.y = 0;
      break;

    default:
      break;
  }
});
