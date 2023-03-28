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
  let timeLeft = 0;
  let score = 0;
  let questionIndex = 0;
  let timerInterval;
  
  // Get the elements from the HTML
  const timerEl = document.getElementById("time");
  const highscoresEl = document.getElementById("highscores");
  const initialsEl = document.getElementById("initials");
  const startButtonEl = document.getElementById("starter");
  const quizEl = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const choicesEl = document.getElementById("choices");
  
  // Add an event listener to the start button
  startButtonEl.addEventListener("click", startQuiz);
  
  // Define the startQuiz function
  function startQuiz() {
    // Hide the start button and highscores
    startButtonEl.style.display = "none";
    highscoresEl.style.display = "none";
  
    // Show the quiz
    quizEl.style.display = "block";
  
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
  
  // Define the displayQuestion function
  function displayQuestion() {
    // Get the current question object
    const currentQuestion = questions[questionIndex];
  
    // Display the question text
    questionEl.textContent = currentQuestion.question;
  
    // Remove any existing choices
    choicesEl.innerHTML = "";
  
    // Loop through the choices and create a button for each one
    for (let i = 0; i < currentQuestion.choices.length; i++) {
      // Create a new button element
      const choiceButton = document.createElement("button");
  
      // Set the button text to the current choice
      choiceButton.textContent = currentQuestion.choices[i];
  
      // Add an event listener to the button
      choiceButton.addEventListener("click", function() {
        // Check if the answer is correct
        if (currentQuestion.choices[i] === currentQuestion.answer) {
          // Increment score and questionIndex if the answer is correct
          score += 10;
          questionIndex++;
          // Render the next question
          renderQuestion();
        } else {
          // Decrement time if the answer is incorrect
          timeLeft -= 10;
          // Render the same question again
          renderQuestion();
        }
        // Check if game is over
        if (questionIndex === questions.length || timeLeft <= 0) {
          // Stop the timer
          clearInterval(timerId);
          // Display the final score to the user
          let finalScore = timeLeft + score;
          quizContainer.innerHTML = `
            <h1>All done!</h1>
            <p>Your final score is ${finalScore}.</p>
            <label for="initials">Enter initials:</label>
            <input type="text" id="initials" name="initials" maxlength="3">
            <button id="submit-score">Submit</button>
            <button id="restart-quiz">Restart Quiz</button>
          `;
          // Store high score and initials in local storage
          let initialsInput = document.getElementById("initials");
          let submitScoreButton = document.getElementById("submit-score");
          submitScoreButton.addEventListener("click", function() {
            let initials = initialsInput.value.toUpperCase();
            let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
            let newScore = { initials: initials, score: finalScore };
            highScores.push(newScore);
            highScores.sort((a, b) => b.score - a.score);
            highScores.splice(5);
            localStorage.setItem("highScores", JSON.stringify(highScores));
            window.location.href = "highscores.html";
          });
          // Add event listener to restart quiz button
          let restartQuizButton = document.getElementById("restart-quiz");
          restartQuizButton.addEventListener("click", function() {
            questionIndex = 0;
            timeLeft = 60;
            score = 0;
            renderQuestion();
            startTimer();
          });
        }
      });