var timer = document.getElementbyID("#time");
var secondsLeft = 10;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    time.textContent = secondsLeft + " seconds left till colorsplosion.";

    if(secondsLeft === 0) {
        console.log(secondsLeft);
      clearInterval(timerInterval);
      
    }

  }, 1000);
}
