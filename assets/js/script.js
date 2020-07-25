//ELEMENT VARIABLES

const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score-text");
const timeText = document.getElementById("timer-text");
const questionEl = document.getElementById("question-el");
const questionButton = document.getElementById("question-button");
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
let index;
let currentScore = 0;
let userInitials = [];



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
    pastAnswerIndexes = [];
    done = false;
    while (done === false) {
        index = random(JSQuestions.length);
        if (JSQuestions.length === pastQuestionIndexes.length) {
            done = true;
            endQuiz();
        }
        if (pastQuestionIndexes.indexOf(index) === -1) {
            pastQuestionIndexes.push(index);

            //question setup
            questionButton.textContent = JSQuestions[index].question;
            for (let p=0; p<4;) {
                let whichAnswer = random(4);
                if (pastAnswerIndexes.indexOf(whichAnswer) === -1) {
                    answers[p].textContent = JSQuestions[index].multiples[whichAnswer];
                    pastAnswerIndexes.push(whichAnswer);
                    p++;
                }//end if
            }//end for

            done = true;//found a unique index and filled the elements with its information
        }//end else
    }//end while
};//end nextQuestion()


//begin quiz
function beginQuiz() {
    questionButton.classList.add("not-active");
    for (button of answers) {
        button.classList.remove("not-active");
    };//end for
    nextQuestion();
};//end beginQuiz()


//select multiple choice answer
function submitAnswer(event) {
    if (event.target.matches("button")) {
        let userAnswer = event.target.textContent;
        console.log(`user answer: ${userAnswer}, correct answer: ${JSQuestions[index].answer}`);
        if (userAnswer === JSQuestions[index].answer) {
            currentScore += 1;
            writeScore();
            nextQuestion();
            console.log("right " + JSQuestions[index].answer);
        } else {
            currentScore -= 1;
            writeScore();            
            nextQuestion();
            console.log("wrong " + JSQuestions[index].answer);
        };//end if else
    };//end if
};//end submitAnswer()



//end of quiz behavior
function endQuiz() {
    console.log("quiz ended");


    //new div
    const instructionDiv = document.createElement("div");
    instructionDiv.textContent = "Type your initials here!";
    quizBox.prepend(instructionDiv);
    questionEl.innerHTML = "<input id='userInitials'></input>";
    questionEl.style.padding = "2vw";
    questionEl.style.border = "fuchsia solid 2px";
    //new div's event listener
    questionEl.addEventListener("keypress", function(e){
        if (e.key === "Enter") {
            userInitials.push(e.target.value);
            e.target.value = '';
            questionEl.innerHTML = "⭐High Score Hall of Fame⭐"
            instructionDiv.classList.add("hidden");
            //set up basic look in case no initials
            writeInitials();
    }//end if
});//end questionEl event listener function

    const endMessage = ["Good", "job", "you're", "done!"]
    for (let k = 0; k<4; k++) {
        answers[k].classList.add("not-active");
        answers[k].textContent = endMessage[k];
    };//end for
};//end endQuiz()

function writeInitials(){
    for (answer of answers){
        answer.textContent = "---";
    }
};










//PAGE INIT

writeScore();



//eventListeners

questionButton.addEventListener("click", beginQuiz);
buttonBoxEl.addEventListener("click", submitAnswer);
