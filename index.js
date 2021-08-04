var score = 0;
var timeLeft = 10;
var interval;
var currentQuestion;
var scores = [];
var getHighScore = function (scoresArr) {
  return Math.max(...scoresArr);
}

var updateTimeLeft = function (amount) {
  timeLeft += amount;
  $('.time-left').text(timeLeft);
}

var updateScore = function (amount) {
  score += amount
  $('.current-score span').text(score);
}

var startGame = function () {
  if (!interval) {
    interval = setInterval( function () {
      updateTimeLeft(-1);
      if (timeLeft === 0) {
        clearInterval(interval);
        interval = undefined;
        scores.push(score);
        $('.high-score span').text(getHighScore(scores));
        updateTimeLeft(10);
        updateScore(-score);
      }
    }, 1000);
  }
}

var updateNumberLimitValue = function() {
  numberLimitValue = ($('#number-range').val())
  $('.number-limit h5').text(numberLimitValue);
}

var randomNumber = function (range) {
  return Math.ceil(Math.random() * range);
}

var generateQuestion = function () {
  var question = {};
  var num1 = randomNumber($('#number-range').val());
  var num2 = randomNumber($('#number-range').val());

  question.answer = num1 + num2;
  question.equation = String(num1) + ' + ' + String(num2);
  
  return question;
}

var renderNewQuestion = function() {
  currentQuestion = generateQuestion();
  $('#equation').text(currentQuestion.equation);
}

var checkAnswer = function (input, answer) {
  if (input === answer) {
    $('#answer-input').val('');
    renderNewQuestion();
    updateTimeLeft(1);
    updateScore(1);
  }
}

$(document).ready(function() {
  renderNewQuestion();
  $('.number-limit input').on('input', updateNumberLimitValue);
  $('#answer-input').on('keyup', function () {
    startGame();
    checkAnswer(Number($(this).val()), currentQuestion.answer);
  });
});