$(document).on("click", "#start-button", function (event) {
  start(event);
});

function start(event) {
  const blocksCountOnStart = 30;
  const gameTime = 60;
  $(event.currentTarget).hide();
  $('#pause-button').show();
  addCubes(blocksCountOnStart);
  startTimer(gameTime);
}

function addCubes(count) {
  var step;
  for (step = 0; step < count; step++) {
    addCube();
  }
}

function addCube() {
  const gameField = $("[data-role='game-field']");
  const cubeFaceLength = 60;
  const gameFieldWidth = gameField.width() - cubeFaceLength;
  const gameFieldHeight = gameField.height() - cubeFaceLength;
  const colours = ['red', 'blue', 'gray', 'green', 'yellow', 'orange'];
  const colour = colours[getRandomInt(colours.length)];
  var gameCube = $(document.createElement('div'));
  gameCube.addClass('game-block');
  gameCube.attr('data-role', "game-block");
  gameCube.css('background', colour);
  gameCube.css('top', getRandomInt(gameFieldHeight) + 'px');
  gameCube.css('left', getRandomInt(gameFieldWidth) + 'px');
  gameField.append(gameCube);
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function startTimer(gameTime) {
  var initialTimerTime = new Date();
  const timer = $('#time-remaining');
  initialTimerTime.setSeconds(initialTimerTime.getSeconds() + gameTime);
  timer.countdown('resume');
  timer.countdown('option', {until: initialTimerTime});
}

function initTimer() {
  $('#time-remaining').countdown({
    compact: true,
    format: 'MS',
    onExpiry: finishGame
  });
}

function finishGame() {}

initTimer();
