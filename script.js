// Define the questions, answers, and choices
var questions = [
  {
    question: "What is the result of 2 + 2?",
    choices: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "What is the result of 10 / 2?",
    choices: ["2", "5", "10", "20"],
    answer: "5",
  },
  {
    question: "What is the result of 5 * 3?",
    choices: ["8", "12", "15", "18"],
    answer: "15",
  },
  {
    question: "What is the result of 20 - 8?",
    choices: ["10", "12", "15", "18"],
    answer: "12",
  },
];

// Define the time for each question, and the penalty for a wrong answer
var timePerQuestion = 15; // seconds
var timePenalty = 10; // seconds

// Define variables for the quiz state
var timeLeft = 0;
var score = 0;
var questionIndex = 0;
var timerInterval;

// Get the elements from the HTML
var timerEl = document.getElementById("time");
var highscoresEl = document.getElementById("highscores");
var nameEl = document.getElementById("name");
var startButtonEl = document.getElementById("start-button");
var quizContainerEl = document.getElementById("quiz-container");
var questionEl = document.getElementById("question");
var choicesEl = document.getElementById("choices");
var scoreContainerEl = document.getElementById("score-container");
var scoreEl = document.getElementById("score");

// Add an event listener to the start button
startButtonEl.addEventListener("click", startQuiz);

// Define the startQuiz function
function startQuiz() {
  // Hide the start button and highscores
  startButtonEl.style.display = "none";
  highscoresEl.style.display = "none";

  // Show the quiz
  quizContainerEl.style.display = "block";

  // Reset the quiz state
  timeLeft = questions.length * timePerQuestion;
  score = 0;
  questionIndex = 0;

  // Start the timer
  setTimer();

  // Display the first question
  displayQuestion();
}


// Define the setTimer function
function setTimer() {
  // Update the timer display
  timerEl.textContent = timeLeft;

  // Set an interval to update the timer every second
  timerInterval = setInterval(function() {
    // Decrement the time left
    timeLeft--;

    // Update the timer display
    timerEl.textContent = timeLeft;

    // If the time runs out, end the quiz
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
  // Stop the timer
  clearInterval(timerInterval);

  // Hide the quiz container
  quizContainerEl.style.display = "none";

  // Show the score container
  scoreContainerEl.style.display = "block";

  // Display the final score
  scoreEl.textContent = score;
}
// Define the displayQuestion function
function displayQuestion() {
  // Get the current question object
  var currentQuestion = questions[questionIndex];

  // Display the question text
  questionEl.textContent = currentQuestion.question;

  // Remove any existing choices
  choicesEl.innerHTML = "";

  // Loop through the choices and create a button for each one
  for (let i = 0; i < currentQuestion.choices.length; i++) {
    // Create a new button element
    var choiceButton = document.createElement("button");
  
    // Set the button text to the current choice
    choiceButton.textContent = currentQuestion.choices[i];

    // Add the choice to the button element
    choicesEl.appendChild(choiceButton);

    // Attach an event listener to the button that handles when the user selects the choice
    choiceButton.addEventListener("click", function() {
      // Check if the user's choice is correct
      if (currentQuestion.answer === i) {
        // Increase the score by 1
        score++;

        // Display the updated score
        scoreEl.textContent = score;

        // Display a message indicating that the answer is correct
        messageEl.textContent = "Correct!";
      } else {
        // Display a message indicating that the answer is incorrect
        messageEl.textContent = "Sorry, that's incorrect.";
        
        // Deduct time for wrong answer
        timeLeft -= timePenalty;
        
        // Update the timer display
        timerEl.textContent = timeLeft;
      }

      // Move on to the next question, or end the quiz if there are no more questions
      questionIndex++;
      if (questionIndex >= questions.length) {
        endQuiz();
      } else {
        displayQuestion();
      }
    });
  }
}
