//ELEMENT VARIABLES

const quizBox = document.getElementById("quiz-box");
const scoreText = document.getElementById("score-text");
const timeText = document.getElementById("timer-text");
const instructionsEl = document.getElementById("instructions-el")
const inputEl = document.getElementById("input-el");
const questionEl = document.getElementById("question-el");
const questionButton = document.getElementById("question-button");
const initialsBoxEl = document.getElementById("initials-box");
const buttonBoxEl = document.getElementById("button-box");
const answerA = document.getElementById("a");
const answerB = document.getElementById("b");
const answerC = document.getElementById("c");
const answerD = document.getElementById("d");
const answers = [answerA, answerB, answerC, answerD];
const rightMark = document.getElementById("right-div");
const wrongMark = document.getElementById("wrong-div");


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
    answer:'camelVar',
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
let timeLeft = 60;
let questionTimer;



//HELPER FUNCTIONS

function random(num){
    return Math.floor(Math.random() * num);
};

function writeScore() {
    scoreText.textContent = currentScore;
};

function writeTime() {
    timeText.textContent = timeLeft;
};



//LOCAL STORAGE FUNCTIONS

function writeInitials(){
    console.log(`WI: writing. First step: call getLocalStorageOrDefault`);
    let initialsArray = getLocalStorageOrDefault("userInitials");
    console.log(`WI: getting userInitials: ${initialsArray}`);
    buttonBoxEl.classList.add("hidden");
    initialsBoxEl.classList.remove("hidden");
    for (answer of answers) {
        answer.classList.add("hidden")
    }//end for
    for (k=0; k < initialsArray.length; k++) {
        let initialsDiv = document.createElement("button");
        initialsDiv.classList.add("btn", "btn-warning", "my-2", "not-active");
        initialsDiv.textContent = initialsArray[k][0] + ": " + initialsArray[k][1];
        initialsBoxEl.appendChild(initialsDiv);
    }//end for
};//end writeInitials()

function getLocalStorageOrDefault(key) {
    console.log(`GL: getting from storage: key: ${key}`);
    if (localStorage.getItem(key) === null) {
        console.log(`GL: local storage was empty`);
        return [];
    } else {
        let tempArray = JSON.parse(localStorage.getItem(key));
        console.log(`GL: got userInitials from local storage as tempArray: ${tempArray}`);
        tempArray.sort(function(a,b) {
            return (parseInt(b[1]) - parseInt(a[1]))
        });
        console.log(`GL: sorted tempArray: ${tempArray}`);
        return tempArray;
    }//end if else
};//end getLocalStorageOrDefault()

function addToLocalStorage(key, value, score) {
    console.log(`AL: adding to local storage: key: ${key}, value: ${value}, score ${score}.` );
    let storedItem = getLocalStorageOrDefault(key);
    console.log(`AL: getting userInitials as storedItem: ${storedItem}`);
    storedItem.push([value, score]);
    console.log(`AL: pushed ${value}, ${score}, new value: ${storedItem}`);
    localStorage.setItem(key, JSON.stringify(storedItem));
    console.log(`AL: set userInitials to local storage as: ${key}, ${JSON.stringify(storedItem)}`);
};//end addToLocalStorage()



//PRIMARY FUNCTIONS



//end of quiz behavior
function endQuiz() {
    console.log("QE: quiz ended");
    clearInterval(questionTimer);
    calculateFinalScore();

    //button end messages
    const endMessage = ["Good", "job", "you're", "done!"]
    for (let k = 0; k<4; k++) {
        answers[k].classList.add("not-active");
        answers[k].textContent = endMessage[k];
    };//end for

    //new div
    instructionsEl.classList.remove("hidden")
    questionEl.classList.add("hidden");
    inputEl.classList.remove("hidden");

    //new div's event listener
    inputEl.addEventListener("keypress", function(e){
        if (e.key === "Enter") {
            if (e.target.value !== ''){
                console.log("QE: calling addToLocalStorage");
                addToLocalStorage("userInitials", e.target.value, currentScore);
                console.log(`EQ: added to userInitials: ${e.target.value}, ${currentScore}`);
                e.target.value = '';
                inputEl.classList.add("hidden");
                questionEl.classList.remove("hidden")
                questionButton.textContent = "⭐High Score Hall of Fame⭐"
                instructionsEl.classList.add("hidden");
                //set up initials
                console.log("QE: calling writeInitials");
                writeInitials();    
            }//end if

            //make restart button
            document.getElementById("time-text-path").innerHTML = " &nbsp R e s t a r t ?";
            timeText.textContent = "✔️"
            document.getElementById("time-bubble").addEventListener("click", beginQuiz);

            //make clear button
            document.getElementById("score-text-path").innerHTML = "&nbsp Clear Scores";
            scoreText.textContent = "🆑"
            document.getElementById("score-bubble").addEventListener("click", function(){
                console.log("clear clicked");
                localStorage.clear();
                initialsBoxEl.textContent = '';
            });

        };//end if
    });//end questionEl event listener function
};//end endQuiz()



function calculateFinalScore(){
    let timeHolder = 0;
    const scoreInterval = setInterval(function(){
        timeLeft --;
        timeHolder ++;
        if (timeLeft >= 0){
            writeTime();
        };//end if  
        if (timeHolder % 5 === 0) {
            currentScore ++;
            writeScore();
        };//end if
        if (timeLeft <= 0){
            clearInterval(scoreInterval);
            writeScore();
        };//end if
    }, 100);
};//end calculateFinalScore()



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




//select multiple choice answer
function submitAnswer(event) {
    if (event.target.matches("button")) {
        let userAnswer = event.target.textContent;
        if (userAnswer === JSQuestions[index].answer) {
            rightMark.classList.remove("hidden");
            window.setTimeout(function(){
                currentScore += 1;
                writeScore();
                nextQuestion();
                rightMark.classList.add("hidden");
            },500)
        } else {
            wrongMark.classList.remove("hidden");
            window.setTimeout(function(){
                currentScore -= 1;
                timeLeft -= 5;
                writeScore();            
                nextQuestion();
                wrongMark.classList.add("hidden");
            }, 500)

        };//end if else
    };//end if
};//end submitAnswer()



//begin timer
function timerCountDown() {
    questionTimer = setInterval(function(){
        timeLeft --;
        writeTime();

        if (timeLeft === 0) {
            endQuiz();
        };//end if
    }, 1000);// end questionTimer interval
}//end timerCountDown()



//begin quiz
function beginQuiz() {

    //initialize values
    document.getElementById("time-bubble").removeEventListener("click", beginQuiz);
    document.getElementById("score-text-path").innerHTML = "&nbsp &nbsp &nbspS c o r e";
    pastQuestionIndexes = [];
    pastAnswerIndexes = [];
    currentScore = 0;
    writeScore();
    timeLeft = 60;
    writeTime();
    document.getElementById("time-text-path").innerHTML = "T i m e &nbsp L e f t"
    initialsBoxEl.innerHTML = '';
    initialsBoxEl.classList.add("hidden");
    buttonBoxEl.classList.remove("hidden");
    for (answer of answers) {
        answer.classList.remove("hidden")
    }

    //set elements for quiz questions
    questionButton.classList.add("not-active");
    for (button of answers) {
        button.classList.remove("not-active");
    };//end for

    //begin quiz
    timerCountDown();
    nextQuestion();
};//end beginQuiz()







//PAGE INIT

writeScore();



//eventListeners

questionButton.addEventListener("click", beginQuiz);
buttonBoxEl.addEventListener("click", submitAnswer);
