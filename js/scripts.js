const gameTime = 60;
const blocksCountOnStart = 30;
const cubeFaceLength = 60;
const colours = ['red', 'blue', 'gray', 'green', 'yellow', 'orange'];
const gameField = $('#game-field');
const gameFieldHeight = gameField.height() - cubeFaceLength;
const gameFieldWidth = gameField.width() - cubeFaceLength;
const playerNameInput = $('#player-name');
const scoreForm = $('#score-form');
const pauseButton = $('#pause-button');
const timeRemainingField = $('#time-remaining');
const pointsField = $('#points');
const finalScoreField = $('#final-score');
const modalWindow = $('.modal');
const startButton = $('#start-button');
const results = $('#results');

$(document).on("click", "#start-button", function (event) {
  start(event);
});

$(document).on("click", "#pause-button", function(event) {
  pause(event);
});

$(document).on("click", "#new-game", function() {
  newGame();
});

$(document).on("click", '#save-score', function() {
  var playerName = playerNameInput.val();
  if (playerName.length > 1) {
    saveScore(playerName);
  } else {
    scoreForm.addClass('was-validated');
  }
});

function start(event) {
  $(event.currentTarget).hide();
  pauseButton.show();
  addCubes(blocksCountOnStart);
  startTimer();
  initClickHandler();
}

function addCubes(count) {
  var step;
  for (step = 0; step < count; step++) {
    addCube();
  }
}

function addCube() {
  const colour = colours[getRandomInt(colours.length)];
  var gameCube = $(document.createElement('div'));
  gameCube.addClass('game-block');
  gameCube.attr('data-role', "game-block");
  gameCube.css('background', colour);
  gameCube.css('top', getRandomInt(gameFieldHeight) + 'px');
  gameCube.css('left', getRandomInt(gameFieldWidth) + 'px');
  gameField.append(gameCube);
}

function pause (event) {
  var button = $(event.currentTarget);
  if (button.text() === 'Pause') {
    button.text('Resume');
    timeRemainingField.countdown('pause');
    disableClickHandler();
  } else {
    button.text('Pause');
    timeRemainingField.countdown('resume');
    initClickHandler();
  }
}

function initClickHandler () {
  $(document).on("click", '[data-role="game-block"]', function (event) {
    $(event.currentTarget).remove();
    const currentPoints = pointsField.val();
    pointsField.val(parseInt(currentPoints) + 1);
    if ($('[data-role="game-block"]').length < 25) { addCubes(getRandomInt(3)); }
  });
}

function disableClickHandler () {
  $(document).off('click', '[data-role="game-block"]');
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function startTimer() {
  timeRemainingField.countdown('resume');
}

function restoreTimer() {
  timeRemainingField.countdown('option', { until: gameTime }).countdown('pause');
}

function initTimer() {
  timeRemainingField.countdown({
    compact: true,
    format: 'MS',
    onExpiry: finishGame,
    until: gameTime
  }).countdown('pause');
}

function finishGame() {
  playerNameInput.val('');
  modalWindow.modal({ backdrop: 'static', keyboard: false });
  finalScoreField.text(pointsField.val());
  pauseButton.hide();
  disableClickHandler();
}

function saveScore (playerName) {
  modalWindow.modal('hide');
  var userNameField = $("[data-role='blank-user-rating']").clone();
  userNameField.removeClass('hidden');
  userNameField.attr('data-role', 'user-rating');
  userNameField.find("[data-role='user-name']").text(playerName);
  userNameField.find("[data-role='user-score']").text(pointsField.val());
  results.append(userNameField);
  scoreForm.removeClass('was-validated');
}

function newGame () {
  restoreTimer();
  pauseButton.hide();
  startButton.show();
  pointsField.val(0);
  gameField.find('[data-role="game-block"]').remove();
  disableClickHandler();
}

initTimer();
