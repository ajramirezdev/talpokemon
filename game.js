//MAIN MENU
const mainMenuScreen = document.getElementById("main-menu");
const playBtn = document.getElementById("play");
const homeBtn = document.getElementById("home-btn");

function mainMenu() {
  playBtn.addEventListener("click", () => {
    pauseIntro();
    audioClick();
    mainMenuScreen.style.display = "none";
    homeBtn.style.display = "block";
    playBackgroundAudio();
    animate();
  });
}

mainMenu();

const instructionBtn = document.getElementById("instructions-btn");
const instructionScreen = document.getElementById("instructions");
const closeBtn = document.getElementById("close");

function showHideInstructions() {
  instructionBtn.addEventListener("click", () => {
    audioClick();
    instructionScreen.style.display = "block";
  });
  closeBtn.addEventListener("click", () => {
    audioClick();
    instructionScreen.style.display = "none";
  });
}

window.addEventListener("DOMContentLoaded", () => {
  playIntro();
});

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 1024;
canvas.height = 576;

const collisionsMap = [];
for (let i = 0; i < collisions.length; i += 70) {
  collisionsMap.push(collisions.slice(i, i + 70));
}

const battleZonesMap = [];
for (let i = 0; i < battleZones.length; i += 70) {
  battleZonesMap.push(battleZones.slice(i, i + 70));
}

const collisionBlocks = [];
const offset = {
  x: -90,
  y: -450,
};

collisionsMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 308) {
      collisionBlocks.push(
        new Boundaries({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

const battleBlocks = [];

battleZonesMap.forEach((row, i) => {
  row.forEach((symbol, j) => {
    if (symbol === 308) {
      battleBlocks.push(
        new Boundaries({
          position: {
            x: j * 80 + offset.x,
            y: i * 80 + offset.y,
          },
        })
      );
    }
  });
});

const image = new Image();
image.src = "./assets/main-map.png";

const foregroundImage = new Image();
foregroundImage.src = "./assets/foreground-map.png";

const playerDownImage = new Image();
playerDownImage.src = "./assets/playerdown.png";

const playerUpImage = new Image();
playerUpImage.src = "./assets/playerup.png";

const playerRightImage = new Image();
playerRightImage.src = "./assets/playerright.png";

const playerLeftImage = new Image();
playerLeftImage.src = "./assets/playerleft.png";

const player = new Sprite({
  position: {
    x: canvas.width / 2 - 280 / 4 / 2,
    y: canvas.height / 2 - 80 / 2,
  },
  image: playerDownImage,
  frames: {
    max: 4,
  },
  sprites: {
    up: playerUpImage,
    right: playerRightImage,
    left: playerLeftImage,
    down: playerDownImage,
  },
});

const background = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: image,
});

const foreground = new Sprite({
  position: {
    x: offset.x,
    y: offset.y,
  },
  image: foregroundImage,
});

const movingBlocks = [
  background,
  ...collisionBlocks,
  foreground,
  ...battleBlocks,
];

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.position.x + rectangle1.width >= rectangle2.position.x &&
    rectangle1.position.x <= rectangle2.position.x + rectangle2.width &&
    rectangle1.position.y + rectangle1.height >= rectangle2.position.y &&
    rectangle1.position.y <= rectangle2.position.y + rectangle2.height / 2
  );
}

showHideInstructions();

const battle = {
  start: false,
};
const attackInterface = document.getElementById("attack-interface");
const healthInterface = document.getElementById("health-interface");
const clickBlock = document.getElementById("click-block");

attackInterface.style.display = "none";
healthInterface.style.display = "none";
clickBlock.style.display = "none";

function animate() {
  const animationId = window.requestAnimationFrame(animate);
  background.draw();
  collisionBlocks.forEach((block) => {
    block.drawSquare();
  });
  battleBlocks.forEach((block) => {
    block.drawSquare();
  });
  player.draw();
  foreground.draw();

  if (battle.start) {
    pauseBackgroundAudio();
    playBattleAudio();
    document.getElementById("battle").style.opacity = 1;
    window.cancelAnimationFrame(animationId);
    initializeBattle(); //TURN BACK TO 3 AFTER FINISHING RESTART BUTTON
    homeBtn.style.display = "none";
    battleStart();
    return;
  }

  const moveSpeed = 3;
  player.moving = false;

  if (keys.ArrowUp.pressed) {
    playerMoveUp(moveSpeed);
  }
  if (keys.ArrowDown.pressed) {
    playerMoveDown(moveSpeed);
  }
  if (keys.ArrowRight.pressed) {
    playerMoveRight(moveSpeed);
  }
  if (keys.ArrowLeft.pressed) {
    playerMoveLeft(moveSpeed);
  }
}

const battleBackgroundImage = new Image();
battleBackgroundImage.src = "./assets/battle-background-alternative.jpg";

const battleBackground = new Sprite({
  image: battleBackgroundImage,
  position: {
    x: 0,
    y: 0,
  },
});

let battleID;

function battleStart() {
  battleID = window.requestAnimationFrame(battleStart);
  setTimeout(() => {
    document.getElementById("battle").style.opacity = 0;
    attackInterface.style.display = "block";
    healthInterface.style.display = "block";
    homeBtn.style.display = "block";
    restartBtn.style.display = "block";
  }, 1000);
  battleBackground.draw();
}

const restartBtn = document.getElementById("restart-btn");
restartBtn.addEventListener("click", () => {
  battle.start = false;
  window.cancelAnimationFrame(battleID);
  audioClick();
  pauseBattleAudio();
  setTimeout(() => {
    initializeBattle();
    playBattleAudio();
    battle.start = true;
    document.getElementById("battle").style.opacity = 1;
    attackInterface.style.display = "none";
    healthInterface.style.display = "none";
    clickBlock.style.display = "none";
    homeBtn.style.display = "none";
    restartBtn.style.display = "none";
    battleStart();
  }, 1000);
  return;
});

const attackButtons = document.querySelectorAll("#attacks button");
const enemyHealth = document.querySelector(
  "#enemy-healthbar .remaining-healthbar"
);
const myHealth = document.querySelector("#my-healthbar .remaining-healthbar");

let enemyRemainingHealthPoints = document.querySelector(
  "#enemy-healthbar .health-points"
);
let myRemainingHealthPoints = document.querySelector(
  "#my-healthbar .health-points"
);

const attackStatus = document.querySelector("#attack-status p");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lose-screen");

let myHPPercentage = 98.5;
let myHP = 50;
let enemyHPPercentage = 98.5;
let enemyHP = 50;

function initializeBattle() {
  document.querySelector("#my-healthbar .remaining-healthbar").style.width =
    "98.5%";
  document.querySelector("#enemy-healthbar .remaining-healthbar").style.width =
    "98.5%";
  document.querySelector("#enemy-healthbar .health-points").innerHTML = "50/50";
  document.querySelector("#my-healthbar .health-points").innerHTML = "50/50";
  myHPPercentage = 98.5;
  myHP = 50;
  enemyHPPercentage = 98.5;
  enemyHP = 50;
}

const missChance = 3;

attackButtons.forEach((button) => {
  button.addEventListener("click", () => {
    audioClick();
    if (myHP !== 0 && enemyHP !== 0) {
      if (Math.ceil(Math.random() * 10) > missChance) {
        playAttackAudio();
        enemyHealth.style.width = `${enemyHPPercentage - 19.7}%`;
        enemyHPPercentage -= 19.6;
        enemyHP -= 10;
        enemyRemainingHealthPoints.innerHTML = `${enemyHP}/50`;
        attackStatus.innerHTML = "Attack Successful";
        if (enemyHP <= 0) {
          pauseBattleAudio();
          playWindAudio();
          window.cancelAnimationFrame(battleID);
          setTimeout(() => {
            playExtendedWinAudio();
            winScreen.style.display = "flex";
            homeBtn.style.display = "none";
            restartBtn.style.display = "none";
          }, 2500);
        }
      } else {
        attackStatus.innerHTML = "Attack Missed";
      }
    }
    if (enemyHP !== 0) {
      clickBlock.style.display = "block";
      clickBlock.innerHTML = "Dejado tried to attack!!";
      setTimeout(() => {
        clickBlock.innerHTML = "But Llamado tried to counter!!";
      }, 1000);
    }
    setTimeout(() => {
      if (enemyHP !== 0) {
        if (Math.ceil(Math.random() * 10) > missChance) {
          playAttackAudio();
          myHealth.style.width = `${myHPPercentage - 19.7}%`;
          myHPPercentage -= 19.6;
          myHP -= 10;
          myRemainingHealthPoints.innerHTML = `${myHP}/50`;
          attackStatus.innerHTML = "Llamado's Attack is Successful";
          if (myHP <= 0) {
            playLoseAudio();
            pauseBattleAudio();
            window.cancelAnimationFrame(battleID);
            setTimeout(() => {
              loseScreen.style.display = "flex";
              homeBtn.style.display = "none";
              restartBtn.style.display = "none";
            }, 2500);
          }
          return;
        } else {
          attackStatus.innerHTML = "Llamado's Attack Missed";
        }
      }
    }, 1500);
    setTimeout(() => {
      attackStatus.innerHTML = "Attack Status";
      clickBlock.style.display = "none";
    }, 2000);
  });
});

const exploreButton = document.querySelector(".keep-exploring-btn");

function explore() {
  exploreButton.addEventListener("click", () => {
    battle.start = false;
    audioClick();
    pauseExtendedWinAudio();
    playBackgroundAudio();
    window.cancelAnimationFrame(battleID);
    document.getElementById("battle").style.opacity = 0;
    homeBtn.style.display = "block";
    winScreen.style.display = "none";
    attackInterface.style.display = "none";
    healthInterface.style.display = "none";
    clickBlock.style.display = "none";
    animate();
  });
}
explore();

const mainMenuBtns = document.querySelectorAll(".main-menu-btn");

function goToMainMenu() {
  mainMenuBtns.forEach((button) => {
    button.addEventListener("click", () => {
      audioClick();
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
  });
}

goToMainMenu();
