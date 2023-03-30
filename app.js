const playBoard = document.querySelector(".play-board");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let setIntervalId;

const changeFoodPosition = () => {
    // pass random 0-30 value as food position
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    // clearing the timer and reloading the page on game over
    clearInterval(setIntervalId);
    alert("Game Over! Press OK to replay...");
    location.reload();
}

const initGame = () => {
    if(gameOver) return handleGameOver();
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        changeFoodPosition();
        snakeBody.push([foodX, foodY]); // push food position to snake body array
    }

    for (let i = snakeBody.length -1; i > 0; i--){
        // shifting forward value of the elements in the snake body by one
        snakeBody[i] = snakeBody[i-1];
    }

    snakeBody[0] = [snakeX, snakeY]; // set first element of snake body to current snake position
    // update snake head position based on velocity 
    snakeX += velocityX;
    snakeY += velocityY;

    // checking if snake head hits wall, if so set gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameOver = true;
    }

    for (let i = 0; i < snakeBody.length; i++){
        // add a div for each part of the body
        htmlMarkup += `<div class="head" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`;

        // check if snake head hits body, if so set gameOver to true
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]){
            gameOver = true;
        }
    }
    
    playBoard.innerHTML = htmlMarkup;
}

const changeDirection = (e) => {
    // change velocity value based on key press
    if(e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if (e.key === "ArrowRight" && velocityX != 1) {
        velocityX = 1;
        velocityY = 0;
    } else if (e.key === "ArrowLeft" && velocityX != -1) {
        velocityX = -1;
        velocityY = 0;
    }

}

changeFoodPosition();
setIntervalId = setInterval(initGame, 125);
document.addEventListener("keydown", changeDirection);