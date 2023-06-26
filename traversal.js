const keys = {
  ArrowUp: {
    pressed: false,
  },
  ArrowDown: {
    pressed: false,
  },
  ArrowRight: {
    pressed: false,
  },
  ArrowLeft: {
    pressed: false,
  },
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = true;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = true;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = true;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = true;
      break;
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
      keys.ArrowUp.pressed = false;
      break;
    case "ArrowDown":
      keys.ArrowDown.pressed = false;
      break;
    case "ArrowRight":
      keys.ArrowRight.pressed = false;
      break;
    case "ArrowLeft":
      keys.ArrowLeft.pressed = false;
      break;
  }
});

function playerMoveUp(speed) {
  player.moving = true;
  moving = true;
  player.image = player.sprites.up;
  for (let i = 0; i < collisionBlocks.length; i++) {
    const block = collisionBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...block,
          position: {
            x: block.position.x,
            y: block.position.y + speed,
          },
        },
      })
    ) {
      moving = false;
      break;
    }
  }
  for (let i = 0; i < battleBlocks.length; i++) {
    const battleBlock = battleBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...battleBlock,
          position: {
            x: battleBlock.position.x,
            y: battleBlock.position.y + speed,
          },
        },
      })
    ) {
      battle.start = true;
      break;
    }
  }
  if (moving)
    movingBlocks.forEach((block) => {
      block.position.y += speed;
    });
}

function playerMoveDown(speed) {
  player.moving = true;
  moving = true;
  player.image = player.sprites.down;
  for (let i = 0; i < collisionBlocks.length; i++) {
    const block = collisionBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...block,
          position: {
            x: block.position.x,
            y: block.position.y - speed,
          },
        },
      })
    ) {
      moving = false;
      break;
    }
  }
  for (let i = 0; i < battleBlocks.length; i++) {
    const battleBlock = battleBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...battleBlock,
          position: {
            x: battleBlock.position.x,
            y: battleBlock.position.y - speed,
          },
        },
      })
    ) {
      battle.start = true;
      break;
    }
  }
  if (moving)
    movingBlocks.forEach((block) => {
      block.position.y -= speed;
    });
}

function playerMoveRight(speed) {
  player.moving = true;
  moving = true;
  player.image = player.sprites.right;
  for (let i = 0; i < collisionBlocks.length; i++) {
    const block = collisionBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...block,
          position: {
            x: block.position.x - speed,
            y: block.position.y,
          },
        },
      })
    ) {
      moving = false;
      break;
    }
  }
  for (let i = 0; i < battleBlocks.length; i++) {
    const battleBlock = battleBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...battleBlock,
          position: {
            x: battleBlock.position.x - speed,
            y: battleBlock.position.y,
          },
        },
      })
    ) {
      battle.start = true;
      break;
    }
  }
  if (moving)
    movingBlocks.forEach((block) => {
      block.position.x -= speed;
    });
}

function playerMoveLeft(speed) {
  player.moving = true;
  moving = true;
  player.image = player.sprites.left;
  for (let i = 0; i < collisionBlocks.length; i++) {
    const block = collisionBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...block,
          position: {
            x: block.position.x + speed,
            y: block.position.y,
          },
        },
      })
    ) {
      moving = false;
      break;
    }
  }
  for (let i = 0; i < battleBlocks.length; i++) {
    const battleBlock = battleBlocks[i];
    if (
      rectangularCollision({
        rectangle1: player,
        rectangle2: {
          ...battleBlock,
          position: {
            x: battleBlock.position.x + speed,
            y: battleBlock.position.y,
          },
        },
      })
    ) {
      battle.start = true;
      break;
    }
  }
  if (moving)
    movingBlocks.forEach((block) => {
      block.position.x += speed;
    });
}
