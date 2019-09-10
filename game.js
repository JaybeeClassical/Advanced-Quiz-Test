const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById('questionCounter');
const score = document.getElementById('score')


let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "How do you include Javascript file?",
        choice1: "Using script tag",
        choice2: "Using scripting tag",
        choice3: "Using scripting tag",
        choice4: "Using <Html>",
        answer: 1
    },

    {
        question: "How do you display Javascript on the webpage?",
        choice1: "Using console.log()",
        choice2: "Using alert('');",
        choice3: "Using print",
        choice4: "Using echo",
        answer: 1
    },

    {
        question: "How do you change the value of html text using Javascript?",
        choice1: "ReplaceText.text",
        choice2: "getElementById('').change",
        choice3: "getElementById('').innerHTML",
        choice4: "all of the above",
        answer: 3
    },

    {
        question: "is the ';' a most in the recent Javascript Programming?",
        choice1: "yes",
        choice2: "No",
        choice3: "Not really",
        choice4: "I don't Know",
        answer: 2
    },
]

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions === 0 || questionCounter > MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        // const classToApply = 'incorrect';
        // if (selectedAnswer == currentQuestion.answer) {
        //     classToApply = 'correct';
        // }

        const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';

        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);
    });
});

startGame();