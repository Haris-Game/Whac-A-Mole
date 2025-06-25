let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

let level = 1;
let maxLevel = 10;
let timeLeft = 15;
let timeInterval;
let moleInterval;
let plantInterval;

window.onload = function () {
    setGame();
}

function setGame() {
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement("div");
        tile.id = i.toString();
        tile.addEventListener("click", selectTile);
        document.getElementById("board").appendChild(tile);
    }
    startLevel();
}

function startLevel() {
    timeLeft = 15;
    updateLevelDisplay();
    resetBoard();
    setTimers();
    startTimer();
}

function resetBoard() {
    for (let i = 0; i < 9; i++) {
        let tile = document.getElementById(i.toString());
        tile.innerHTML = "";
    }
    currMoleTile = null;
    currPlantTile = null;
}

function setTimers() {
    clearInterval(moleInterval);
    clearInterval(plantInterval);

    moleInterval = setInterval(setMole, 1000);
    plantInterval = setInterval(setPlant, 2000);
}

function getRandomTile() {
    return Math.floor(Math.random() * 9).toString();
}

function setMole() {
    if (gameOver) return;
    if (currMoleTile) currMoleTile.innerHTML = "";

    let mole = document.createElement("img");
    mole.src = "./monty-mole.png";

    let num = getRandomTile();
    if (currPlantTile && currPlantTile.id == num) return;

    currMoleTile = document.getElementById(num);
    currMoleTile.appendChild(mole);
}

function setPlant() {
    if (gameOver) return;
    if (currPlantTile) currPlantTile.innerHTML = "";

    let plant = document.createElement("img");
    plant.src = "./piranha-plant.png";

    let num = getRandomTile();
    if (currMoleTile && currMoleTile.id == num) return;

    currPlantTile = document.getElementById(num);
    currPlantTile.appendChild(plant);
}

function selectTile() {
    if (gameOver) return;

    if (this == currMoleTile) {
        score += 1;
        document.getElementById("score").innerText = score.toString();
        checkLevelUp();
    } else if (this == currPlantTile) {
        endGame("GAME OVER: " + score.toString());
    }
}

function checkLevelUp() {
    let targetScore = 5 * level;
    if (score >= targetScore) {
        clearInterval(timeInterval);
        clearInterval(moleInterval);
        clearInterval(plantInterval);
        if (level >= maxLevel) {
            endGame("🎉 YOU WIN! Final Score: " + score);
        } else {
            level++;
            score = 0;
            document.getElementById("score").innerText = score.toString();
            timeLeft = 15;
            setTimeout(startLevel, 1000);
        }
    }
}


function startTimer() {
    document.getElementById("timeLeft").innerText = timeLeft;
    timeInterval = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").innerText = timeLeft;
        if (timeLeft <= 0) {
            endGame("⏰ TIME'S UP! Final Score: " + score);
        }
    }, 1000);
}

function endGame(message) {
    gameOver = true;
    clearInterval(moleInterval);
    clearInterval(plantInterval);
    clearInterval(timeInterval);
    document.getElementById("score").innerText = message;
}

document.getElementById("restartBtn").addEventListener("click", restartGame);

function restartGame() {
    score = 0;
    level = 1;
    timeLeft = 15;
    gameOver = false;
    document.getElementById("score").innerText = "0";
    resetBoard();
    startLevel();
}


function updateLevelDisplay() {
    document.getElementById("level").innerText = level;
}
