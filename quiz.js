const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");
const restartb = document.getElementById("restartb");

let questions1 = [
    {
        question : "Frage 1 / Level 1",
        imgSrc : "img/js.png",
        choiceA : "Richtig",
        choiceB : "Falsch",
        choiceC : "Falsch",
        correct : "A"
    },{
        question : "Frage 2 / Level 1",
        imgSrc : "img/js.png",
        choiceA : "Falsch",
        choiceB : "Richtig",
        choiceC : "Falsch",
        correct : "B"
    },{
        question : "Frage 3 / Level 1",
        imgSrc : "img/js.png",
        choiceA : "Falsch",
        choiceB : "Falsch",
        choiceC : "Richtig",
        correct : "C"
    },{
        question : "Frage 4 / Level 1",
        imgSrc : "img/js.png",
        choiceA : "Falsch",
        choiceB : "Falsch",
        choiceC : "Richtig",
        correct : "C"
    }
];

let questions2 = [
    {
        question : "Frage 1 / Level 2",
        imgSrc : "img/html.png",
        choiceA : "Richtig",
        choiceB : "Falsch",
        choiceC : "Falsch",
        correct : "A"
    },{
        question : "Frage 2 / Level 2",
        imgSrc : "img/html.png",
        choiceA : "Falsch",
        choiceB : "Richtig",
        choiceC : "Falsch",
        correct : "B"
    },{
        question : "Frage 3 / Level 2",
        imgSrc : "img/html.png",
        choiceA : "Falsch",
        choiceB : "Falsch",
        choiceC : "Richtig",
        correct : "C"
    },{
        question : "Frage 4 / Level 2",
        imgSrc : "img/html.png",
        choiceA : "Falsch",
        choiceB : "Falsch",
        choiceC : "Richtig",
        correct : "C"
    }
];

let questions3 = [
    {
        question : "Frage 1 / Level 3",
        imgSrc : "img/css.png",
        choiceA : "Richtig",
        choiceB : "Falsch",
        choiceC : "Falsch",
        correct : "A"
    },{
        question : "Frage 2 / Level 3",
        imgSrc : "img/css.png",
        choiceA : "Falsch",
        choiceB : "Richtig",
        choiceC : "Falsch",
        correct : "B"
    },{
        question : "Frage 3 / Level 3",
        imgSrc : "img/css.png",
        choiceA : "Falsch",
        choiceB : "Falsch",
        choiceC : "Richtig",
        correct : "C"
    },{
        question : "Frage 4 / Level 3",
        imgSrc : "img/css.png",
        choiceA : "Falsch",
        choiceB : "Falsch",
        choiceC : "Richtig",
        correct : "C"
    }
];

let levelQuestions = [questions1, questions2, questions3];

let lastQuestion = 5;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10s
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let lives = 3;
let level = 0;

function renderQuestion(){
    let q = levelQuestions[level][runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

function startQuiz(){
    if(level == levelQuestions.length) level = 0;
    lastQuestion = levelQuestions[level].length -1;
    lives = 3;
    runningQuestion = 0;
    count = 0;
    score = 0;

    finish = document.getElementById("finish");
    finish.innerHTML = "";
    progress.innerHTML = "";
    scoreDiv.innerHTML = finish.outerHTML;
    scoreDiv.innerHTML += restartb.outerHTML;
    restartb.innerHTML = "<div class=" + '"' + "restart" +'"' +" id=" + '"' + "restart"+'"' +" onclick=" +'"' + "startQuiz()" +'"' + "></div>";

    start.style.display = "none";
    scoreDiv.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderLives();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}

function renderLives(){
    for(let qIndex = 0; qIndex < lives; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
        document.getElementById(qIndex).style.backgroundColor = "#0f0";
    }
}


function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;

        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
 
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


function checkAnswer(answer){
    if( answer == levelQuestions[level][runningQuestion].correct){
        // answer is correct
        score++;
    }else{
        // answer is wrong
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        clearInterval(TIMER);
        scoreRender();
    }
}

function answerIsWrong(){
    lives--;
    document.getElementById(lives).style.backgroundColor = "#f00";
    if(lives == 0){
        clearInterval(TIMER);
        scoreRender();
    }
}

function scoreRender(){
    scoreDiv.style.display = "block";
    
    const scorePerCent = Math.round(100 * score/levelQuestions[level].length);
    
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML += "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    if((level+1) == levelQuestions.length && lives > 0){
        finish = document.getElementById("finish");
        finish.innerHTML += "<p>Glückwunsch du hast alle Level geschafft!</p>";
    }

    restart = document.getElementById("restart");
    if(lives > 0){
        level++;
        if(level == levelQuestions.length){
            restart.innerHTML = "Von vorne";
        }else{
            restart.innerHTML = "Nächster Level";
        }  
    }else{
        restart.innerHTML = "Restart";
    }
    
}





















