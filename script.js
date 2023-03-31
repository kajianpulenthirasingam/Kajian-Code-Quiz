var startButton = document.getElementById("start-button");
var quizContainer = document.getElementById("quiz-container");
var scoreContainer = document.getElementById("score-container");
var questionElement = document.getElementById("question");
var choiceButtons = document.querySelectorAll(".choice");
var timeElement = document.getElementById("time");
var scoreElement = document.getElementById("score");
var initialsElement = document.getElementById("initials");
var highscoresElement = document.getElementById("highscores");
var QUIZ_TIME = 60; // in seconds
var SCORE_INCREMENT = 10;
var currentQuestionIndex;
var score;
var quizTime;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  quizContainer.style.display = "block";
  scoreContainer.style.display = "none";
  currentQuestionIndex = 0;
  score = 0;
  quizTime = QUIZ_TIME;
  displayQuestion();
  startTimer();
}

// Define an array of objects that contain each question and its choices
var quizQuestions = [
  {
    question: "Arrays in JavaScript is used to store?",
    choices: ["Number", "String", "Boolean", "All of the above"],
    answerIndex: 3,
  },
  {
    question: "Commonly used Data types DO NOT INCLUDE?",
    choices: ["String", "Boolean", "Alerts", "Numbers"],
    answerIndex: 2,
  },
  {
    question: "The condition in an if / else statement is enclosed within ___?",
    choices: ["Quotes", "Curly Brackets", "Parentheses", "Square Brackets"],
    answerIndex: 2,
  },
];

// Get the quiz elements
var questionEl = document.querySelector("h3");
var choicesEl = document.querySelector(".choices");
var submitBtn = document.querySelector(".submit");

// Show the current question and choices
function displayQuestion() {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  questionElement.innerText = currentQuestion.question;
  choiceButtons.forEach(button => {
    var choice = currentQuestion.choices[button.dataset.index];
    button.innerText = choice;
    button.dataset.correct = choice === currentQuestion.choices[currentQuestion.answerIndex];
    button.addEventListener("click", handleChoiceClick);
  });
}

function handleChoiceClick(event) {
  var selectedButton = event.target;
  var isCorrect = selectedButton.dataset.correct === "true";
  if (isCorrect) {
    score += SCORE_INCREMENT;
  } else {
    quizTime -= 5; // penalty for wrong answer
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    displayQuestion();
  } else {
    endQuiz();
  }
}
//Starts the timer and decreases every second
function startTimer() {
  var timerId = setInterval(() => {
    quizTime--;
    timeElement.innerText = quizTime;
    if (quizTime <= 0) {
      clearInterval(timerId);
      endQuiz();
    }
  }, 1000);
}
//Ends the quiz
function endQuiz() {
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";
  scoreElement.innerText = score;
  quizTime = 0;
  if (quizTime != 0){
    quizTime = 0;
  }
}

function saveScore(event) {
  event.preventDefault();
  var initials = initialsElement.value;
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscores.push({ initials, score });
  localStorage.setItem("highscores", JSON.stringify(highscores));
  displayHighscores();
}

function displayHighscores() {
  var highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  highscoresElement.innerHTML = "";
  highscores.forEach((highscore, index) => {
    var scoreElement = document.createElement("div");
    scoreElement.innerText = `${index + 1}. ${highscore.initials} - ${highscore.score}`;
    highscoresElement.appendChild(scoreElement);
  });
}

document.forms[0].addEventListener("submit", saveScore);
