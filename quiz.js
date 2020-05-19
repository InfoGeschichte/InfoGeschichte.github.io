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
        question : "Welcher Computerhersteller war zu Beginn des Computerzeitalters Vorreiter?",
        imgSrc : "img/level1.jpg",
        choiceA : "Microsoft",
        choiceB : "IBM",
        choiceC : "Apple",
        correct : "C"
    },{
        question : "Bill Gates und Paul Allen sind bekannt für?",
        imgSrc : "img/level1.jpg",
        choiceA : "Apple",
        choiceB : "Microsoft",
        choiceC : "Spotify",
        correct : "B"
    },{
        question : "IBMs erster Vorteil gegenüber anderen Firmen?",
        imgSrc : "img/level1.jpg",
        choiceA : "Verwendung der Hardware anderer Hersteller",
        choiceB : "Extrem schnelles Betriebssystem",
        choiceC : "Erste Sicherheitssoftware",
        correct : "A"
    },{
        question : "Welche Firma, neben Apple und Microsoft, trug in den 70er im Silicon Valley Jahren einen großen Teil zur Weiterentwicklung von Computersoftware bei?",
        imgSrc : "img/level1.jpg",
        choiceA : "HP",
        choiceB : "Xerox PARC",
        choiceC : "Sony",
        correct : "B"
    }
];

let questions2 = [
    {
        question : "Welcher Computer von Xerox fasste zum ersten Mal alle gesammelten Features, wie Icons, GUI und LAN.",
        imgSrc : "img/html.png",
        choiceA : "Commodore 64",
        choiceB : "Apple2",
        choiceC : "Alto",
        correct : "C"
    },{
        question : "Welche Firma kaufte die Features von Xerox und machte User Interfaces populär?",
        imgSrc : "img/html.png",
        choiceA : "Microsoft",
        choiceB : "Apple",
        choiceC : "IBM",
        correct : "B"
    },{
        question : "Wie lautet der Name des von Apple 1984 inklusive GUI (Graphic User Interface) – gekauft von Xerox – auf den Markt gebrachten PCs?",
        imgSrc : "img/html.png",
        choiceA : "Macintosh",
        choiceB : "Atari",
        choiceC : "Amiga",
        correct : "A"
    },{
        question : "Was hat Richard Stallman 1983 eingeleitet?",
        imgSrc : "img/html.png",
        choiceA : "Software- kooperation und unentgeltliche Teilung",
        choiceB : "Polarisierung von Microsoft und Apple",
        choiceC : "Anstieg der Hackerkultur",
        correct : "A"
    }
];

let questions3 = [
    {
        question : "Was lehnt Stallman und jeder gute Hacker ab?",
        imgSrc : "img/css.png",
        choiceA : "Einschränk- ungen und geschlossene Türen",
        choiceB : "Unsicheren Code",
        choiceC : "Überlassung von Quellcode an Firmen",
        correct : "A"
    },{
        question : "Welches entscheidende Element fehlte Stallman, um das Betriebssystem fertigzustellen?",
        imgSrc : "img/css.png",
        choiceA : "Compiler",
        choiceB : "Systemkern",
        choiceC : "Text-Editor",
        correct : "B"
    },{
        question : "Was was das Betriebssystem, das 1971 bei den Bell Labs entwickelt worden ist und seit jeher als Standard für Universitäten und Hacker verwendet wird. ",
        imgSrc : "img/css.png",
        choiceA : "UNIX",
        choiceB : "FreeBSD",
        choiceC : "GNU",
        correct : "A"
    },{
        question : "Der Name Linux, war nicht der Name mit dem der Entwickler (Linus Torvald) seine neue Software taufen wollte. Wie lautete sein Vorschlag?",
        imgSrc : "img/css.png",
        choiceA : "Monx",
        choiceB : "Junx",
        choiceC : "Freax",
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





















