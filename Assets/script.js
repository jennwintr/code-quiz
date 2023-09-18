let start = document.getElementById("start-btn");
let next = document.getElementById("next-btn"); 
let questionContainer = document.getElementById("question-container"); 
let questionElement = document.getElementById("question"); 
let answerButton = document.getElementById("answer-btns"); 
let doneBox = document.getElementById("done-container");
let usersName = document.getElementById("enter-initials-box"); 
let scoreEl = document.getElementById("scoreEl"); 
let timerEl = document.getElementById("countdown");
let shuffleQuestions, currentQuestionIndex; 

let timeInterval;
let timeLeft = 60;
let score = 0;


let finalQuiz = [];

function beginQuiz() {
  countdown();
  start.classList.add("hide"); 
  doneBox.classList.add("hide");
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  nextQ();
}

function countdown() {
  let timeInterval = setInterval(function () {
    if (timeLeft >= 1) {
      timerEl.textContent = "Time: " + timeLeft + " seconds left";
      timeLeft--;
    } else if (timeLeft === 0) {
      clearInterval(timeInterval);
      endGame();
    }
  }, 1000);
}


function nextQ() {
  resetAnswer();
  showQ(shuffleQuestions[currentQuestionIndex]);
  questionContainer.classList.remove("hide");
  console.log(currentQuestionIndex);
}

start.addEventListener("click", function() {
  restart();
  beginQuiz();
});

next.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQ();
});

function showQ(question) {
  questionElement.innerText = question.question;
  question.answers.forEach((answer) => {
    let button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButton.appendChild(button);
  });
}

function resetAnswer() {
  next.classList.add("hide");
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(event) {
  let selectedButton = event.target;
  let correct = selectedButton.dataset.correct;
  if (correct) {
    score += timeLeft;
    console.log("time" + score);
  } else {
    timeLeft -= 10;
  }

  questionContainer.classList.add("hide");
    next.classList.remove("hide");
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    next.classList.remove("hide");
  } else {
    endGame();
  }
}

function endGame() {
  let finalScore = score;
  scoreEl.textContent = "Your score is " + finalScore + ".";
  console.log(finalScore);
  localStorage.setItem("finalScore", finalScore);
  timeLeft = "";
  timerEl.textContent = "";

  questionContainer.classList.add("hide");
  answerButton.classList.add("hide");
  next.classList.add("hide");
  doneBox.classList.remove("hide");

  usersName.addEventListener("submit", (event) => {
    event.preventDefault();
    let userInput = document.querySelector("input[name='Initials']").value;
    console.log(userInput);
    localStorage.setItem("User", userInput);

    let userScore = {
      initials: userInput,
      score: finalScore,
    };
    let finalQuiz = JSON.parse(localStorage.getItem("finalQuiz")) || [];
    finalQuiz.push(userScore);
    localStorage.setItem("finalQuiz", JSON.stringify(finalQuiz));
    showScores();
  });
}

function showScores() {
  usersName.remove();
  start.innerText = "Restart";
  start.classList.remove("hide");

  let finalQuiz = JSON.parse(localStorage.getItem("finalQuiz")) || [];
  for (i = 0; i < finalQuiz.length; i++) {
    let submitEl = document.createElement("li");
    submitEl.className = "result";
    submitEl.textContent = finalQuiz[i].initials + " : " + finalQuiz[i].score;
    scoreEl.appendChild(submitEl);
  }
}

function restart() {
  questionContainer.classList.remove("hide");
  answerButton.classList.remove("hide");
  next.classList.remove("hide");
  doneBox.classList.add("hide");
  timeLeft = 60;
}



let questions = [
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
