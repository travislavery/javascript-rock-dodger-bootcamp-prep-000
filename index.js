
const DODGER = document.getElementById('dodger');
const GAME = document.getElementById('game');
const GAME_HEIGHT = 400;
const GAME_WIDTH = 400;
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

function checkCollision(rock) {
  const top = positionToInteger(rock.style.top)
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
    const dodgerRightEdge = dodgerLeftEdge+40;
    const rockLeftEdge = positionToInteger(rock.style.left)
    const rockRightEdge = rockLeftEdge+20;

    if (rockLeftEdge<dodgerLeftEdge && rockRightEdge>dodgerLeftEdge) {
      return true
    } else if (rockLeftEdge>=dodgerLeftEdge && rockRightEdge<=dodgerRightEdge) {
      return true
    } else if (rockLeftEdge<=dodgerRightEdge && rockRightEdge>= dodgerRightEdge) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0

  rock.style.top = top

  GAME.appendChild(rock);
  window.requestAnimationFrame(moveRock)
  function moveRock() {
    rock.style.top = `${top += 2}px`
    if (checkCollision(rock)) {
      endGame();
    } else if (rock.style.top<`380px`) {
      
      window.requestAnimationFrame(moveRock)
    } else if (rock.style.top>=`380px`) {
      rock.remove();
    }
  }

  ROCKS.push(rock);

  return rock;
}

function endGame() {
  clearInterval(gameInterval);
  for (var i = 0; i < ROCKS.length; i++) {
    ROCKS[i].remove();
  }
  window.removeEventListener('keydown', moveDodger);
}

function moveDodger(e) {
  if (e.which===LEFT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
    window.requestAnimationFrame(moveDodgerLeft);
  } else if (e.which === RIGHT_ARROW) {
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
    window.requestAnimationFrame(moveDodgerRight);
  }
}

function moveDodgerLeft() {
  var left = positionToInteger(DODGER.style.left)
  
  if (left > 0) {
    DODGER.style.left = `${left -= 4}px`;
    window.requestAnimationFrame(moveDodgerLeft);
  }
}

function moveDodgerRight() {
  var right = positionToInteger(DODGER.style.left)
  
  if (right < 360) {
    DODGER.style.left = `${right += 4}px`;
    window.requestAnimationFrame(moveDodgerRight);
  }
}

function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000)
}
