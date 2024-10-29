let score=document.getElementsByClassName("menu-score")[0].children[1];
let scoreValue=parseInt(score.innerHTML);
var myTime=parseInt(document.getElementsByClassName("menu-time")[0].children[1].innerHTML);
let myLives=document.getElementsByClassName("menu-lives")[0].children[1].innerHTML.charAt(1);
let enemy=document.getElementsByClassName("enemy")[0];
let enemyID=parseInt(enemy.id);
let randIDNumber;
var pause=false;
let startButton=document.getElementById("play");
let stopButton=document.getElementById("stop");
let restartButton=document.getElementById("restart");
var mySquares=document.querySelectorAll(".square");
var timeInterval;
let gameSpeed;
var gameIntervalTime;
let gameInterval;
let myMessage;
startButton.addEventListener("mousedown",playGame);
stopButton.addEventListener("mousedown",stopGame);
restartButton.addEventListener("mousedown",restartGame);
function setDificulty(){
    gameSpeed=document.querySelector("#gameSpeed");
    gameIntervalTime=1600-parseInt(gameSpeed.value)*100;
    return gameIntervalTime;
}
function playGame(){
    mySquares.forEach((square)=>{
        square.addEventListener("mousedown", loseGame);
    })
    gameIntervalTime=setDificulty();
    enemy.removeEventListener("mousedown", loseGame);
    enemy.addEventListener("mousedown", pontuation);
    pause=false;
    timeInterval=setInterval(timeCounting, 1000);
    gameInterval=setInterval(generateEnemy, gameIntervalTime);
}
function restartGame(){
    clearInterval(timeInterval);
    clearInterval(gameInterval);
    mySquares.forEach((square)=>{
        square.addEventListener("mousedown", loseGame);
    })
    gameIntervalTime=setDificulty();
    myTime=30;
    myLives=3;
    scoreValue=0;
    document.getElementsByClassName("menu-time")[0].children[1].innerHTML=myTime;
    document.getElementsByClassName("menu-lives")[0].children[1].innerHTML="x"+myLives;
    score.innerHTML=scoreValue;
    pause=false;
    enemy.removeEventListener("mousedown", loseGame);
    enemy.addEventListener("mousedown", pontuation);
    timeInterval=setInterval(timeCounting, 1000);
    gameInterval=setInterval(generateEnemy, gameIntervalTime);
}
function stopGame(){
    pause=true;
    clearInterval(timeInterval);
    clearInterval(gameInterval);
    enemy.removeEventListener("mousedown", pontuation);
    mySquares.forEach((square)=>{
        square.removeEventListener("mousedown", loseGame);
    })
    startButton.addEventListener("mousedown", playGame);
}
function timeCounting(){
    myTime=myTime-1;
    document.getElementsByClassName("menu-time")[0].children[1].innerHTML=myTime;
    if(myTime<=0){
        myMessage="Tempo encerrado!";
        endGame();
    }
    if(pause || myTime<=0){
        clearInterval(timeInterval);
        clearInterval(gameInterval);
    }
}
function generateEnemy(){
    randIDNumber=Math.round(Math.random()*8)+1;
    while(randIDNumber===enemyID){
        randIDNumber=Math.round(Math.random()*8)+1;
    }
    enemy.className="square";
    enemy.addEventListener("mousedown", loseGame);
    enemy.removeEventListener("mousedown", pontuation);
    enemy=document.getElementById(randIDNumber);
    enemyID=enemy.id;
    enemy.className="square enemy";
    enemy.removeEventListener("mousedown", loseGame);
    enemy.addEventListener("mousedown", pontuation);     
}
function pontuation(){
    scoreValue+=1;
    score.innerHTML=scoreValue;
    playAudio("hit");
    enemy.removeEventListener("mousedown", pontuation);
    
}
function playAudio(audioname){
    let audio =new Audio(`./assets/audios/${audioname}.m4a`);
    audio.volume=0.05;
    audio.play();
}
function endGame(){
    stopGame();
    document.getElementsByClassName("menu-time")[0].children[1].innerHTML=0;
    enemy.removeEventListener("mousedown", pontuation);
    mySquares.forEach((square)=>{
        square.removeEventListener("mousedown", loseGame);
    })
    alert(`${myMessage} Sua pontuação foi ${scoreValue}!`);
    myTime=30;
    myLives=3;
    document.getElementsByClassName("menu-time")[0].children[1].innerHTML=myTime;
    document.getElementsByClassName("menu-lives")[0].children[1].innerHTML="x"+myLives;
    scoreValue=0;
    score.innerHTML=scoreValue;
    clearInterval(timeInterval);
}
function loseGame(){
    myLives--;
    document.getElementsByClassName("menu-lives")[0].children[1].innerHTML="x"+myLives;
    if(myLives<=0){
        myMessage="Você perdeu!";
        endGame();
    }
}