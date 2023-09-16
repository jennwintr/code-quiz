var startButton = $("#start-btn"); 
var nextButton = $("#next-btn"); 
var questionBoxElement = $("#question-container"); 
var questionElement = $("#question"); 
var answerBtnElement = $("#answer-btns"); 
var doneBoxElement = $("#done-container"); 
var formEl = $("#enter-initials-box"); 
var scoreBox = $("#scoreBox");
var timerEl = $("#countdown"); 

var shuffleQuestions, currentQuestionIndex; 

var timeInterval;
var timeLeft = 60;
var score = 0;


var finalInfo = [];

function startQuiz() {
  countdown();
  startButton.classList.add("hide"); 
  doneBoxElement.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionBoxElement.classList.remove("hide");
  nextQuestion();
}

function countdown() {
  var timeInterval = setInterval(function () {
    if (timeLeft >= 1) {
      timerEl.textContent = "Time: " + timeLeft + " seconds left";
      timeLeft--;
    } else if (timeLeft === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}

function nextQuestion() {
  resetAnswer();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
  questionBoxElement.classList.remove("hide");
  console.log(currentQuestionIndex);
}

startButton.addEventListener("click", () => {
  restart();
  startQuiz();
});

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    var button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerBtnElement.appendChild(button);
  });
}





countdown();
startQuiz();