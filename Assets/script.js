var startButton = document.getElementById("start-btn");
var nextButton = document.getElementById("next-btn"); 
var questionBoxElement = document.getElementById("question-container"); 
var questionElement = document.getElementById("question"); 
var answerBtnElement = document.getElementById("answer-btns"); 
var doneBoxElement = document.getElementById("done-container");
var formEl = document.getElementById("enter-initials-box"); 
var scoreBox = document.getElementById("scoreBox"); 
var timerEl = document.getElementById("countdown");
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

function resetAnswer() {
  nextButton.classList.add("hide");
  while (answerBtnElement.firstChild) {
    answerBtnElement.removeChild(answerBtnElement.firstChild);
  }
}

function selectAnswer(event) {
  var selectedButton = event.target;
  var correct = selectedButton.dataset.correct;
  if (correct) {
    score += timeLeft;
    console.log("time" + score);
  } else {
    timeLeft -= 10;
  }

  questionBoxElement.classList.add("hide");
    nextButton.classList.remove("hide");
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide");
  } else {
    endGame();
  }
}

function endGame() {
  var finalScore = score;
  scoreBox.textContent = "Your score is " + finalScore + ".";
  console.log(finalScore);
  localStorage.setItem("finalScore", finalScore);
  timeLeft = "";
  timerEl.textContent = "";

  questionBoxElement.classList.add("hide");
  answerBtnElement.classList.add("hide");
  nextButton.classList.add("hide");
  doneBoxElement.classList.remove("hide");

  formEl.addEventListener("submit", (event) => {
    event.preventDefault();
    var userInput = document.querySelector("input[name='Initials']").value;
    console.log(userInput);
    localStorage.setItem("User", userInput);

    var userScore = {
      initials: userInput,
      score: finalScore,
    };
    var finalInfo = JSON.parse(localStorage.getItem("finalInfo")) || [];
    finalInfo.push(userScore);
    localStorage.setItem("finalInfo", JSON.stringify(finalInfo));
    showScores();
  });
}

function showScores() {
  formEl.remove();
  startButton.innerText = "Restart";
  startButton.classList.remove("hide");

  var finalInfo = JSON.parse(localStorage.getItem("finalInfo")) || [];
  for (i = 0; i < finalInfo.length; i++) {
    var submitEl = document.createElement("li");
    submitEl.className = "result";
    submitEl.textContent = finalInfo[i].initials + " : " + finalInfo[i].score;
    scoreBox.appendChild(submitEl);
  }
}

function restart() {
  questionBoxElement.classList.remove("hide");
  answerBtnElement.classList.remove("hide");
  nextButton.classList.remove("hide");
  doneBoxElement.classList.add("hide");
  timeLeft = 60;
}

var questions = [
  {
    question:
      "What does HTML stand for?",
    answers: [
      { text: "How To Make Layouts", correct: false },
      { text: "Hyper Tool Markup Language ", correct: false },
      { text: "Header Title Markup Language", correct: false },
      { text: "Hyper Text Markup Language", correct: true },
    ],
  },
  {
    question:
      "Choose the largest heading HTML element:",
    answers: [
      { text: "<h6>", correct: false },
      { text: "<body>", correct: false },
      { text: "<h1>", correct: true },
      { text: "<head>", correct: false },
    ],
  },
  {
    question: "Which is the correct CSS syntax?",
    answers: [
      { text: "{body;color:black;}", correct: false },
      { text: "body:color=black;", correct: false },
      { text: "{body:color=black;}", correct: false },
      { text: "body {color: black;}", correct: true },
    ],
  },
  {
    question:
      "Which CSS property is used to change the text color of an element?",
    answers: [
      { text: "color", correct: true },
      { text: "text-color", correct: false },
      { text: "color-code", correct: false },
      { text: "font-color", correct: false },
    ],
  },
  {
    question:
      "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "<js>", correct: false },
      { text: "<script>", correct: true },
      { text: "<javascript>", correct: false },
      { text: "<scripting>", correct: false },
    ],
  },
];
