// h1
var h1title = document.querySelector("h1");
// p
var pTimer = document.querySelector("#p-timer");
var pInstructions = document.querySelector("#instructions");
// buttons
var btnHiscore = document.querySelector("#button-hiscore");
var btnStart = document.querySelector("#button-start");
var btnSubmit = document.querySelector("#button-submit");
var btnBack = document.querySelector("#button-back");
var btnClear = document.querySelector("#button-clear");
// span
var spanTime = document.querySelector("#span-time");
var spanScore = document.querySelector("#span-score");
// input
var userInput = document.querySelector("#userInput");
// lists
var choicesList = document.querySelector("#choicesList");
var hiscoresList = document.querySelector("#hiscoresList");
// sections
var sectionIsCorrect = document.querySelector("#isCorrect");
var sectionIsIncorrect = document.querySelector("#isIncorrect");
var sectionGameOver = document.querySelector("#gameOver");
var sectionHiscores = document.querySelector("#hiscores");

var quiz = [
    {
        question: "Commonly used data types DO NOT include:",
        choices: ["String", "Boolean", "Alert", "Number"],
        answer: "2",
    },
    {
        question:
            "The condition in an if/else statement is enclosed with _____.",
        choices: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets"],
        answer: "2",
    },
    {
        question: "Arrays in JavaScript can be used to store _____.",
        choices: [
            "Numbers and Strings",
            "Other Arrays",
            "Booleans",
            "All of the above",
        ],
        answer: "3",
    },
    {
        question:
            "String values must be enclosed within _____ when being assigned to variables.",
        choices: ["Commas", "Curly brackets", "Quotes", "Parenthesis"],
        answer: "2",
    },
    {
        question:
            "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "Terminal/Bash", "For Loops", "console.log"],
        answer: "3",
    },
];

// variables
var globalTime = 75;
var timeLeft = globalTime;
var questionIndex = 0;
var score = 0;
var isGameOver = true;

function reset() {
    timeLeft = globalTime;
    spanTime.textContent = globalTime;
    spanTime.style = "color: green";

    sectionHiscores.style.display = "none";
    btnHiscore.style.display = "block";
    h1title.textContent = "Coding Quiz Challenge";
    h1title.style.display = "block";
    pInstructions.style.display = "block";
    btnStart.style.display = "block";
}

function startTimer() {
    var timerInterval = setInterval(function () {
        if (isGameOver === true) {
            clearInterval(timerInterval);
        }
        if (timeLeft < 1) {
            clearInterval(timerInterval);
            gameOver();
        }
        spanTime.textContent = timeLeft;
        spanTime.style = "color: green";
        timeLeft--;
    }, 1000);
}

function gameStart() {
    isGameOver = false;
    questionIndex = 0;

    btnHiscore.style.display = "none";
    pInstructions.style.display = "none";
    btnStart.style.display = "none";
    pTimer.style.display = "block";

    createQuestion(questionIndex);
    startTimer();
}

function createQuestion(currQuestionIndex) {
    h1title.textContent = quiz[currQuestionIndex].question;
    createChoices(currQuestionIndex);

    return;
}

function createChoices(currQuestionIndex) {
    choicesList.innerHTML = "";

    for (let a = 0; a < quiz[currQuestionIndex].choices.length; a++) {
        var choice = document.createElement("button");

        choice.textContent = quiz[currQuestionIndex].choices[a];
        choice.value = a;
        choicesList.appendChild(choice);
    }
}

function checkChoice(event) {
    if (event.target != choicesList) {
        if (event.target.value != quiz[questionIndex].answer) {
            timeLeft -= 10;
            spanTime.style = "color: red";
            sectionIsCorrect.style.display = "none";
            sectionIsIncorrect.style.display = "block";
        } else {
            sectionIsIncorrect.style.display = "none";
            sectionIsCorrect.style.display = "block";
        }
        nextQuestion();
    }
}

function nextQuestion() {
    questionIndex++;

    if (questionIndex >= quiz.length) {
        gameOver();
    } else {
        createQuestion(questionIndex);
    }
}

function gameOver() {
    isGameOver = true;
    score = timeLeft;
    spanScore.textContent = score;

    btnHiscore.style.display = "none";
    h1title.style.display = "none";
    sectionGameOver.style.display = "block";
    choicesList.innerHTML = "";
}

function viewHiscores() {
    sectionGameOver.style.display = "none";
    btnHiscore.style.display = "none";
    pTimer.style.display = "none";
    h1title.style.display = "none";
    pInstructions.style.display = "none";
    btnStart.style.display = "none";
    sectionHiscores.style.display = "block";
}

function submitHiscore() {
    sectionIsIncorrect.style.display = "none";
    sectionIsCorrect.style.display = "none";

    viewHiscores();
}

function clearHiscores() {
    reset();
}

function init() {
    btnHiscore.addEventListener("click", viewHiscores);
    btnStart.addEventListener("click", gameStart);
    choicesList.addEventListener("click", checkChoice);
    btnSubmit.addEventListener("click", submitHiscore);
    btnBack.addEventListener("click", reset);
    btnClear.addEventListener("click", clearHiscores);

    reset();
}

init();
