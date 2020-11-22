$(document).on("click", "#start-button", function (event) {
  start(event);
});

$(document).on("click", "#pause-button", function(event) {
  pause(event);
});

function start(event) {
  const blocksCountOnStart = 30;
  const gameTime = 60;
  $(event.currentTarget).hide();
  $('#pause-button').show();
  addCubes(blocksCountOnStart);
  startTimer(gameTime);
  initClickHandler();
}

function addCubes(count) {
  var step;
  for (step = 0; step < count; step++) {
    addCube();
  }
}

function addCube() {
  const gameField = $('#game-field');
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

function pause (event) {
  var button = $(event.currentTarget);
  if (button.text() === 'Pause') {
    button.text('Resume');
    $('#time-remaining').countdown('pause');
    disableClickHandler()
  } else {
    button.text('Pause');
    $('#time-remaining').countdown('resume');
    initClickHandler();
  }
}

function initClickHandler () {
  $(document).on("click", '[data-role="game-block"]', function (event) {
    $(event.currentTarget).remove();
    const currentPoints = $('#points').val();
    $('#points').val(parseInt(currentPoints) + 1);
    if ($('[data-role="game-block"]').length < 25) {
      addCubes(getRandomInt(3));
    }
  });
}

function disableClickHandler () {
  $(document).off('click', '[data-role="game-block"]')
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

function finishGame() {
  $('#player-name').val('');
  $('.modal').modal({ backdrop: 'static', keyboard: false });
  $('#final-score').text($('#points').val());
  $('#pause-button').hide();
  disableClickHandler();
}

function saveScore (playerName) {
  $('.modal').modal('hide');
  var results = $('#results');
  var userNameField = $("[data-role='blank-user-rating']").clone();
  userNameField.removeClass('hidden');
  userNameField.attr('data-role', 'user-rating');
  userNameField.find("[data-role='user-name']").text(playerName);
  userNameField.find("[data-role='user-score']").text($('#points').val());
  results.append(userNameField);
  $('#score-form').removeClass('was-validated');
}

$(document).on("click", '#save-score', function() {
  var playerName = $('#player-name').val();
  if (playerName.length > 1) {
    saveScore(playerName)
  } else {
    $('#score-form').addClass('was-validated');
  }
});

initTimer();
