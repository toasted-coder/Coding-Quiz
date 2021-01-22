var startBtn = document.getElementById("startBtn");
var submitBtn = document.querySelector("button.submitBtn")
var timerElement = document.getElementById("timer");
var secondsLeft = (questions.length * 20 + 1);
var questionHead = document.getElementById("questions");
var answerChoices = document.getElementById("answers");
var questionNumber = -1;
var answer;
var submitScoreElement = document.querySelector("#submit-score");
var userScoreElement = document.getElementById("user-score");
var userNameInput;



function startTimer() {
    document.getElementById("home").classList.add('d-none');
    document.getElementById("quiz").classList.remove('d-none');
    // timer set and begins 120 second countdown
    setTimer();
    // create questions to display
    makeQuestions();
}
function setTimer() {
    var countdown = setInterval(function () {
        secondsLeft--;
        timerElement.textContent = "Time: " + secondsLeft;

        if (secondsLeft === 0 || questionNumber === questions.length) {
            clearInterval(countdown);
            setTimeout(displayScore, 500);
        }
    }, 1000);
}

function makeQuestions() {
    questionNumber++;
    answer = questions[questionNumber].answer

    questionHead.textContent = questions[questionNumber].title;
    answerChoices.innerHTML = "";

    var choices = questions[questionNumber].choices;

    for (var i = 0; i < choices.length; i++) {
        var nextChoice = document.createElement("button");
        nextChoice.textContent = choices[i]
        answerBtn = answerChoices.appendChild(nextChoice).setAttribute("class", "p-4 m-2 btn btn-dark btn-block");
    }
}

// displays add name to score board
function displayScore() {
    document.getElementById("quiz").classList.add('d-none');
    document.getElementById("submit-score").classList.remove('d-none');
    userScoreElement.textContent = "FINAL SCORE: " + secondsLeft + ".";
}

// Event Listeners for main buttons
startBtn.addEventListener("click", startTimer);
submitBtn.addEventListener("click", function (event) {
    event.stopPropagation();
    addScore();
    window.location.href = 'highscores.html'
});

function addScore () {
    userNameInput = document.getElementById("userName").value
    
    // creates a new object with name and score value
var newScore = {
        name: userNameInput,
        score: secondsLeft
    };
    // checks localStorage for saved scores, if none creates new array
    var highScores = JSON.parse(localStorage.getItem("highScores") || "[]");
    // pushes player score into newly created array
    highScores.push(newScore)
    // turn objects into strings array and saves in localStorage
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function hideFeedback(){
    var feedbackEl = document.getElementsByClassName("feedback")[0]
    feedbackEl.style.display='none'
}

function showFeedback(){
    var feedbackEl = document.getElementsByClassName("feedback")[0]
    feedbackEl.removeAttribute('style');
}

answerChoices.addEventListener("click", function (event) {
    var feedbackEl = document.getElementsByClassName("feedback")[0]
    
    // displays if answer is correct or incorrect
    if (answer === event.target.textContent) {   
        feedbackEl.innerHTML = "CORRECT";
        setTimeout(hideFeedback,1200);
        showFeedback();   
        
    } else {
        feedbackEl.innerHTML = "INCORRECT";
        setTimeout(hideFeedback,1200);
        secondsLeft = secondsLeft - 20;
        showFeedback();
    }    
    makeQuestions();
});