//ELEMENT VARIABLES

const scoreText = document.getElementById("score-text");
const timeText = document.getElementById("timer-text");
const questionEl = document.getElementById("question-el");
const buttonBoxEl = document.getElementById("button-box");
const answerA = document.getElementById("a");
const answerB = document.getElementById("b");
const answerC = document.getElementById("c");
const answerD = document.getElementById("d");
const answers = [answerA, answerB, answerC, answerD];


//QUESTION VARIABLE

//questions assembled from multiple google searches
const JSQuestions = [
    {
    question:"Where can you put a script?",
    multiples:["head only", "anywhere in html", "head and body", "body only"],
    answer:"head and body",
    },
    {
    question:'How many scripts can you have in one html document?',
    multiples:['infinite', 'one', 'same # as elements', '21'],
    answer:'infinite',
    },
    {
    question:'Javascript sources are placed in what tag?',
    multiples:['<code></code>', '<js></js>', '<script></script>', '<link></link>'],
    answer:'<script></script>',
    },
    {
    question:'Which of the following is not a JS comparison operator?',
    multiples:['>=', '!=', '!>', '=='],
    answer:'!>',
    },
    {
    question:'What is at the end of JavaScript statements to separate one from another?',
    multiples:[':', ';', ',', '.'],
    answer:';',
    },
    {
    question:'What is an example of camel casing?',
    multiples:['CaMeLvAr', 'camelvar', 'cAMELVAR', 'camelVar'],
    answer:'camvelVar',
    },
    {
    question:'How do you put in multi-line comments in JavaScript?',
    multiples:['//  //', '<!--  -->', '"""  """', '/*  */'],
    answer:'/*  */',
    },
    {
    question:'In JavaScript, a character or group of characters is called a:',
    multiples:['string', 'line', 'thread', 'yarn'],
    answer:'string',
    },
    {
    question:'What do you use to separate multiple variables declared at the same time?',
    multiples:['/', ';', ',', '\\'],
    answer:',',
    },
    {
    question:'Which of the following is not an event listener?',
    multiples:['click', 'resize', 'mouseover', 'clickup'],
    answer:'clickup',
    },
]


//HELPER VARIABLES

let pastQuestionIndexes = [];
let pastAnswerIndexes = [];
let i;
let currentScore = 0;



//HELPER FUNCTIONS

function random(num){
    return Math.floor(Math.random() * num);
};

function writeScore() {
    scoreText.textContent = currentScore;
}






//FUNCTIONS

//switch to next
function nextQuestion(){
    i = random(JSQuestions.length);
    pastAnswerIndexes = [];
    let p = 0;
    while (p===0) {
        if (pastQuestionIndexes.indexOf(i) === -1) {
            console.log("I made a new question!");
            questionEl.textContent = JSQuestions[i].question;
            let n = 0;
    
            while (n<4) {
                k = random(4);
                if (pastAnswerIndexes.indexOf(k) === -1) {
                    pastAnswerIndexes.push(k);
                    answers[n].textContent = JSQuestions[i].multiples[k];
                    n++;
                };
            };
            p++
        } else {
            console.log("I didn't make a new question this");
        }
        pastQuestionIndexes.push(i);
    };
};


//begin quiz
function beginQuiz() {
    questionEl.classList.add("not-active");
    for (button of answers) {
        button.classList.remove("not-active");
    };
    nextQuestion();
};


//select multiple choice answer
function submitAnswer(event) {
    if (event.target.matches("button")) {
        let userAnswer = event.target.textContent;
        console.log(`user answer: ${userAnswer}, correct answer: ${JSQuestions[i].answer}`);
        if (userAnswer === JSQuestions[i].answer) {
            currentScore += 1;
            writeScore();
            nextQuestion();
            console.log("right " + JSQuestions[i].answer);
        } else {
            currentScore -= 1;
            writeScore();
            nextQuestion();
            console.log("wrong " + JSQuestions[i].answer);
        }
    }
}








//PAGE INIT

writeScore();



//eventListeners

questionEl.addEventListener("click", beginQuiz);
buttonBoxEl.addEventListener("click", submitAnswer);
