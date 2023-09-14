var startButton = document.getElementById("start-btn"); 
var nextButton = document.getElementById("next-btn"); 
var questionBoxElement = document.getElementById("question-container"); 
var questionElement = document.getElementById("question"); 
var answerBtnElement = document.getElementById("answer-btns"); 
var doneBoxElement = document.getElementById("done-container"); 
var formEl = document.getElementById("enter-initials-box"); 
var scoreBox = document.getElementById("scoreBox"); 
var timerEl = document.getElementById("countdown"); 



var timeInterval;
var timeLeft = 60;
var score = 0;


function startQuiz() {
  countdown();
  startButton.classList.add("hide"); 
  doneBoxElement.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionBoxElement.classList.remove("hide");
  nextQuestion();
}


countdown();
startQuiz();