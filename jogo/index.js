let speed=40;
let tempSpeed;
var timeInterval=0;
let snake=document.getElementsByTagName("circle")[0];
let positionX
let positionY;
let buttonGame=document.getElementById("start-game");
var lostGame=false;
buttonGame.addEventListener("click",startGame());
function startGame(){

    document.addEventListener("keydown",logKey); 
};
function logKey(e){
    snake=document.getElementsByTagName("circle")[0];
    positionX=parseInt(snake.getAttribute("cx"));
    positionY=parseInt(snake.getAttribute("cy"));
    
    if(e.key==="ArrowRight"){  
        if(e.repeat){
        }else{
            
            clearInterval(timeInterval);
            timeInterval=setInterval(moveRight, speed);
            
            
        }
    }else if(e.key==="ArrowDown"){
        if(e.repeat){
        }else{
            
            clearInterval(timeInterval);
            timeInterval=setInterval(moveDown, speed);
        }
    }else if(e.key==="ArrowLeft"){
        if(e.repeat){
        }else{
            
            clearInterval(timeInterval);
            timeInterval=setInterval(moveLeft, speed);
        }
    }else if(e.key==="ArrowUp"){
        if(e.repeat){
        }else{
            
            clearInterval(timeInterval);
            timeInterval=setInterval(moveUp, speed);
        }
    }else if(e.key==="Escape"){
        clearInterval(timeInterval);
    }
};
function loseGame(){
    lostGame=true;
    document.removeEventListener("keydown",logKey);
    buttonGame.onclick=startGame();
    alert("Perdeu!");
}
function moveUp(){
    positionY=parseInt(snake.getAttribute("cy"));
        if(positionY>1){
            positionY=positionY-1;
            snake.setAttribute("cy",positionY + "vh");
        }else if(positionY===1){
        clearInterval(timeInterval);
        loseGame();
    }
}
function moveDown(){
    positionY=parseInt(snake.getAttribute("cy"));
    if(positionY<79){
        positionY=positionY+1;
        snake.setAttribute("cy",positionY + "vh");
    }else if(positionY===79){
        clearInterval(timeInterval);
        loseGame();
    }
}
function moveLeft(){
    positionX=parseInt(snake.getAttribute("cx"));
    if(positionX>1){
        positionX=positionX-1;
        snake.setAttribute("cx",positionX + "vh");
        
    }else if(positionX===1){
        clearInterval(timeInterval);
        loseGame();
    }
}
function moveRight(){
    positionX=parseInt(snake.getAttribute("cx"));
    if(positionX<79){
        positionX=positionX+1;
        snake.setAttribute("cx",positionX + "vh");
        
    }else if(positionX===79){
        clearInterval(timeInterval);
        loseGame();
    }
}
