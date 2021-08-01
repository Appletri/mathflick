const box8 = document.querySelector("#box8");
const box7 = document.querySelector("#box7");
const box6 = document.querySelector("#box6");
const box5 = document.querySelector("#box5");
const box4 = document.querySelector("#box4");
const box3 = document.querySelector("#box3");
const box2 = document.querySelector("#box2");
const box1 = document.querySelector("#box1");
const equationBox = document.querySelector("#equation");
const targets = document.getElementsByClassName("target");
const timer = document.querySelector(`#timer`);
const scoreboard = document.querySelector(`#score`);
const resetButton = document.querySelector(`#resetButton`);
const highScoreBox = document.querySelector(`#highScore`);
const flickboard = document.querySelector("#flickboard");
const scoreSummary = document.querySelector("#score-summary");
const newGame = document.querySelector("#newGame");
const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)


let highScore = localStorage.getItem('HS');
let gameState = "";
let equation = 1;
let solved = true;
let round = 1;
let roundCheck = 0;
let combo = 0;
let a;
let b;
let score = 0;

let interval; //time interval
let gameTime = 0;

let targetArray = [1,2,3,4,5,6,7,8]; //targets start value

let indicatorEq;
let blinkingState = true;

preGame();//will present `hover to start` screen

//pre game vvvv
function preGame(){
    solved = true;
    gameState = "pregame";
    setHighScore();
    reset();
    resetButton.addEventListener(`click`, preGame);
    box1.innerHTML = ``;
    box2.innerHTML = ``;
    box3.innerHTML = ``;
    box4.innerHTML = ``;
    box5.innerHTML = ``;
    box6.innerHTML = ``;
    box7.innerHTML = ``;
    box8.innerHTML = ``;
    box1.removeEventListener(`mouseover`, box1Colors);
    box2.removeEventListener(`mouseover`, box2Colors);
    box3.removeEventListener(`mouseover`, box3Colors);
    box4.removeEventListener(`mouseover`, box4Colors);
    box5.removeEventListener(`mouseover`, box5Colors);
    box6.removeEventListener(`mouseover`, box6Colors);
    box7.removeEventListener(`mouseover`, box7Colors);
    box8.removeEventListener(`mouseover`, box8Colors);
    equationBox.removeEventListener("mouseout", alertRed); //there was a bug with the mouseout when the game resets, this fixes it
    equationBox.style.background = "";
    if (viewportWidth <= 768) {
          equationBox.innerHTML =  `Click <br>to start!`;
        } else {
          equationBox.innerHTML = `Hover <br>to start!`;
        }
    equationBox.addEventListener("mouseover", playGame); //starts the game
    scoreboard.innerHTML = `Score: ` + score;
    timer.innerHTML = `Time: ` + gameTime;
}

//play the game, start countdown vvvv
function playGame(){
  equationBox.removeEventListener(`mouseover`, playGame);
  equationBox.addEventListener("mouseout", alertRed);
  gameTime = 60; //debugging
  gameState = "playgame";
  assignColors();
  assignMouseout();
  countdown();
  scoreboard.innerHTML = `Score: ` + score;
}


//countdown timer and alert game over vvvv
function countdown(){
  clearInterval(interval);
  timer.innerHTML = `Time: ` + gameTime;
  interval = setInterval(tickTock, 1000);
  function tickTock(){
    if(gameTime > 0 && gameState == "playgame"){
        gameTime--;
        timer.innerHTML = `Time: ` + gameTime;
    }
    
    else{
        timer.innerHTML = `Time: ` + 0;
        clearInterval(interval);
        // alert(`Game Over!\n\nYour Score: ` + score);
        if (gameTime === 0) {
          flickboard.className = "flickboard-hidden";
          scoreSummary.className = "summary-display";
          scoreSummary.innerHTML = `Game Over!\n\nYour Score: ` + score;
        }
        setHighScore();
        preGame();
    }
  }
}

//reset variables vvvv
function reset(){
  score = 0;
  round = 1;
  roundCheck = 0;
  combo = 0;
}

//High score vvvv
function setHighScore(){
  if (score > highScore) {
    localStorage.setItem(`HS`, score);
    highScore = score;
    // alert(`You have the new high score!\nHigh score: ` + score);
    if (gameTime === 0) {
      scoreSummary.innerHTML = `You have the new high score!\nHigh score: ` + score;
    }
    highScoreBox.innerHTML = "High Score: " + highScore;
  } 
  else{
    highScoreBox.innerHTML = "High Score: " + highScore;
  }
}

// Start a new game after displaying high score
newGame.addEventListener("click", function() {
  flickboard.className = "flickboard-display";
  scoreSummary.className = "summary-hidden";
})

// event listeners for mouseover listener vvvv
function assignColors(){
box1.addEventListener("mouseover", box1Colors);
box2.addEventListener("mouseover", box2Colors);
box3.addEventListener("mouseover", box3Colors);
box4.addEventListener("mouseover", box4Colors);
box5.addEventListener("mouseover", box5Colors);
box6.addEventListener("mouseover", box6Colors);
box7.addEventListener("mouseover", box7Colors);
box8.addEventListener("mouseover", box8Colors);
}

function box1Colors(){
  if (equation == targetArray[0]) {  
    box1.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
    
  }
  else {
    box1.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box2Colors(){
  if (equation == targetArray[1]) {  
    box2.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
    
  }
  else {
    box2.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box3Colors(){
  if (equation == targetArray[2]) {  
    box3.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box3.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box4Colors(){
  if (equation == targetArray[3]) {  
    box4.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box4.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box5Colors(){
  if (equation == targetArray[4]) {  
    box5.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box5.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box6Colors(){
  if (equation == targetArray[5]) {  
    box6.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box6.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box7Colors(){
  if (equation == targetArray[6]) {  
    box7.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box7.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

function box8Colors(){
  if (equation == targetArray[7]) {  
    box8.style.background = "green";
    addPoint();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box8.style.background = "red";
    minusPoint();
    comboReset();
    return solved = false; 
  }
}

// event listeners for mouseout vvvvv
function assignMouseout(){
  box1.addEventListener("mouseout", box1Mouseout);
  box2.addEventListener("mouseout", box2Mouseout);
  box3.addEventListener("mouseout", box3Mouseout);
  box4.addEventListener("mouseout", box4Mouseout);
  box5.addEventListener("mouseout", box5Mouseout);
  box6.addEventListener("mouseout", box6Mouseout);
  box7.addEventListener("mouseout", box7Mouseout);
  box8.addEventListener("mouseout", box8Mouseout);
}

function box1Mouseout(){
  box1.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box2Mouseout(){
  box2.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box3Mouseout(){
  box3.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box4Mouseout(){
  box4.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box5Mouseout(){
  box5.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box6Mouseout(){
  box6.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box7Mouseout(){
  box7.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}
function box8Mouseout(){
  box8.style.background = "";
  equationBox.style.background = "";
  clearInterval(indicatorEq);
}

//equation event listener. It will generate a new equation and array of numbers.
//It will then add the correct answer in the array.
equationBox.addEventListener("mouseover", function() {

let randomNumber= 1;
let randomBoxNumber = "";

if (solved == true) {
    updateArray();
    equation = getEquation();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    randomNumber = getRandomBoxNumber();
    randomBoxNumber="box"+(randomNumber+1);
    // difficulty();
    // console.log (randomNumber);
    // console.log (randomBoxNumber);
    // console.log (targetArray);
    
    
    eval(randomBoxNumber).textContent = equation;
    targetArray[randomNumber] = equation;

    roundCheck++;
    comboChain();
    // console.log (combo);
    // console.log (randomNumber);
    // console.log (randomBoxNumber);
    // console.log (targetArray);
    // console.log (round);
    // console.log (roundCheck);
    // console.log (score);

    
  }
  else {
    equationBox.style.background = "rgba(225,0,0,0.5)";
    // difficulty();
    indicatorT = setInterval(indicatorTargets,500);
    
  }
});
  
function alertRed () {
    document.getElementById("equation").style.background = "";
    
    solved = false;    
}


document.getElementById(`equation`).addEventListener("mouseover", function() {
    document.getElementById('equation').innerHTML = a + " + " + b;
  });

//functions
function getRandomBoxNumber() {
    return Math.floor((Math.random() * 8));
}

function getRandomTotal() {
    return Math.floor(Math.random() * 11);
}

function getRandomInt() {
   return Math.floor(Math.random() * 21);
}

function getEquation() {
    a = getRandomTotal();
    b = getRandomTotal();

    return a+b;
}

function comboChain() {
    if (solved == true) {
        combo++;
        document.getElementById('comboMeter').innerHTML = "x" + combo;
        document.getElementById('comboMeter').style.fontSize = `${10 * (1 + (combo/10))}px`;
    }
    else {
        return;
    }
}

function comboReset() {
    combo = 1;
    document.getElementById('comboMeter').innerHTML = "x" + combo;
    document.getElementById('comboMeter').style.fontSize = '10px';
}

function addPoint() {
    if (round == roundCheck){
        score = score + combo;
        round++;
        scoreboard.innerHTML = `Score: ` + score;
    }
    
    else{
        return;
    }
}



function minusPoint() {
  score--;
  scoreboard.innerHTML = `Score: ` + score;
}







function indicatorEquation () {
    
    
    if (blinkingState == true){
        equationBox.style.background = "rgba(0,225,0,0.2)";
        blinkingState = false;
    }
    else 
    {
        equationBox.style.background = "";
        blinkingState = true;
    }
    
}




function updateArray() {
  targetArray[0] = getRandomInt();
  targetArray[1] = getRandomInt();
  targetArray[2] = getRandomInt();
  targetArray[3] = getRandomInt();
  targetArray[4] = getRandomInt();
  targetArray[5] = getRandomInt();
  targetArray[6] = getRandomInt();
  targetArray[7] = getRandomInt();
  box1.textContent = targetArray[0];
  box2.textContent = targetArray[1]; 
  box3.textContent = targetArray[2]; 
  box4.textContent = targetArray[3]; 
  box5.textContent = targetArray[4]; 
  box6.textContent = targetArray[5]; 
  box7.textContent = targetArray[6]; 
  box8.textContent = targetArray[7];       
}

function difficulty() {
    
}