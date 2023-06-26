const introAudio = new Audio("./assets/audio/main-menu.wav");
const clickAudio = new Audio("./assets/audio/click.mp4");
const backgroundAudio = new Audio("./assets/audio/background.wav");
const battleAudio = new Audio("./assets/audio/battle.wav");
const winAudio = new Audio("./assets/audio/win.mp4");
const extendedWinAudio = new Audio("./assets/audio/win-extended.mp4");
const attackAudio = new Audio("./assets/audio/attack.mp4");
const loseAudio = new Audio("./assets/audio/lose.wav");

function playIntro() {
  introAudio.loop = true;
  introAudio.play();
}

function pauseIntro() {
  introAudio.pause();
}

function playBackgroundAudio() {
  backgroundAudio.loop = true;
  backgroundAudio.play();
}

function pauseBackgroundAudio() {
  backgroundAudio.pause();
}

function playBattleAudio() {
  battleAudio.loop = true;
  battleAudio.play();
}

function pauseBattleAudio() {
  battleAudio.pause();
  battleAudio.currentTime = 0;
}

function audioClick() {
  clickAudio.play();
}

function playWindAudio() {
  winAudio.play();
}

function playExtendedWinAudio() {
  extendedWinAudio.loop = true;
  extendedWinAudio.play();
}

function pauseExtendedWinAudio() {
  extendedWinAudio.pause();
  extendedWinAudio.currentTime = 0;
}

function playAttackAudio() {
  attackAudio.play();
}

function playLoseAudio() {
  loseAudio.loop = true;
  loseAudio.play();
}
