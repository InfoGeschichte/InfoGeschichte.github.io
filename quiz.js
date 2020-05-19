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
        choiceB : "Extrem schnelles Betriebs- system",
        choiceC : "Erste Sicherheits- software",
        correct : "A"
    },{
        question : "Welche Firma, neben Apple und Microsoft, trug einen großen Teil zur Weiterentwicklung von Computersoftware bei?",
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
        imgSrc : "img/level2.jpg",
        choiceA : "Commodore 64",
        choiceB : "Apple2",
        choiceC : "Alto",
        correct : "C"
    },{
        question : "Welche Firma kaufte die Features von Xerox und machte User Interfaces populär?",
        imgSrc : "img/level2.jpg",
        choiceA : "Microsoft",
        choiceB : "Apple",
        choiceC : "IBM",
        correct : "B"
    },{
        question : "Wie lautet der Name des von Apple 1984 inklusive GUI – gekauft von Xerox – auf den Markt gebrachten PCs?",
        imgSrc : "img/level2.jpg",
        choiceA : "Macintosh",
        choiceB : "Atari",
        choiceC : "Amiga",
        correct : "A"
    },{
        question : "Was hat Richard Stallman 1983 eingeleitet?",
        imgSrc : "img/level2.jpg",
        choiceA : "Software- kooperation",
        choiceB : "Polarisier- ung von Microsoft und Apple",
        choiceC : "Anstieg der Hackerkultur",
        correct : "A"
    }
];

let questions3 = [
    {
        question : "Was lehnt Stallman und jeder gute Hacker ab?",
        imgSrc : "img/level3.jpg",
        choiceA : "Einschränk- ungen und geschlossene Türen",
        choiceB : "Unsicheren Code",
        choiceC : "Überlassung von Quellcode an Firmen",
        correct : "A"
    },{
        question : "Welches entscheidende Element fehlte Stallman, um das Betriebssystem fertigzustellen?",
        imgSrc : "img/level3.jpg",
        choiceA : "Compiler",
        choiceB : "Systemkern",
        choiceC : "Text-Editor",
        correct : "B"
    },{
        question : "Welches 1971 entwickelte Betriebssystem, wird als Standard für Universitäten und Hacker verwednet?",
        imgSrc : "img/level3.jpg",
        choiceA : "UNIX",
        choiceB : "FreeBSD",
        choiceC : "GNU",
        correct : "A"
    },{
        question : "Wie wollte der Entwickler von Linux sein Betriebssystem ursprünglich nennen?",
        imgSrc : "img/level3.jpg",
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
let questionTime = 12; // 10s
const gaugeWidth = 150; // 150px
let gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;
let lives = 2;
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
    if(level == 0){
        questionTime = 12;
        gaugeUnit = gaugeWidth / questionTime 
    } 
    if(level == 1){
        questionTime = 10;
        gaugeUnit = gaugeWidth / questionTime 
    } 
    if(level == 2){
        questionTime = 8;
        gaugeUnit = gaugeWidth / questionTime 
    } 

    lastQuestion = levelQuestions[level].length -1;
    lives = 2;
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





















