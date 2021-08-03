const box8 = document.querySelector("#box8");
const box7 = document.querySelector("#box7");
const box6 = document.querySelector("#box6");
const box5 = document.querySelector("#box5");
const box4 = document.querySelector("#box4");
const box3 = document.querySelector("#box3");
const box2 = document.querySelector("#box2");
const box1 = document.querySelector("#box1");
const equationBox = document.querySelector("#equation");
// let equationBox;
// let box1;
const targets = document.getElementsByClassName("target");
const timer = document.querySelector(`#timer`);
const scoreboard = document.querySelector(`#score`);
const resetButton = document.querySelector(`#resetButton`);
const highScoreBox = document.querySelector(`#highScore`);
const flickboard = document.querySelector("#flickboard");
const scoreSummary = document.querySelector("#score-summary");
const highScoreHistory = document.querySelector("#highScore-history"); 
const comboMeter = document.querySelector("#comboMeter");
const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)


let highScore = localStorage.getItem('HS');
let highScoreArray = [];
let gameState = "";
let equation = 1;
let solved = true;
let round = 1;
let roundCheck = 0;
let combo = 0;
let a;
let b;
let score = 0;
let numCorrect = 0;
let numWrong = 0;

let interval; //time interval
let gameTime = 0;
let constantGameTime;

let targetArray = [1,2,3,4,5,6,7,8]; //targets start value

let indicatorEq;
let blinkingState = true;

preGame();//will present `hover to start` screen

//pre game vvvv
function preGame(){
  // box1 = document.createElement("div");
  // box1.textContent = 1;
  // box1.setAttribute("id", "box1");
  // box1.setAttribute("class", "target");
  // flickboard.appendChild(box1);

  // equationBox = document.createElement("div");
  // equationBox.textContent = "equation";
  // equationBox.setAttribute("id", "equation");
  // flickboard.appendChild(equationBox);
  // console.log(equationBox);

    solved = true;
    gameState = "pregame";
    setHighScore();
    reset();
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
          equationBox.innerHTML =  `Tap <br>to <br>start!`;
        } else {
          equationBox.innerHTML = `Hover <br>to <br>start!`;
        }
    equationBox.addEventListener("mouseover", playGame); //starts the game
    scoreboard.innerHTML = `Score: ` + score;
    timer.innerHTML = `Time: ` + gameTime;
}

resetButton.addEventListener(`click`, function() {
  equationBox.style.animation = 'none';
  equationBox.offsetHeight; /* trigger reflow */
  equationBox.style.animation = null; 
  equationBox.style.animation = 'rotationBackwards 60s infinite linear';
  flickboard.style.animation = 'none';
  flickboard.offsetHeight; /* trigger reflow */
  flickboard.style.animation = null;
  flickboard.style.animation = 'rotation 60s infinite linear';
  for (let target of targets) {
    target.style.animation = 'none';
    target.offsetHeight;
    target.style.animation = null;
    target.style.animation = 'rotationBackwards 60s infinite linear';
  }

  // flickboard.innerHTML = "";
  preGame();
  flickboard.className = "flickboard-display";
  comboMeter.className = "comboMeter-display";
  scoreSummary.className = "summary-hidden";
  highScoreHistory.className = "highScoreHistory-hidden";
  resetButton.textContent = "Reset Game";
});

//play the game, start countdown vvvv
function playGame(){
  equationBox.removeEventListener(`mouseover`, playGame);
  equationBox.addEventListener("mouseout", alertRed);
  gameTime = 10; //debugging
  constantGameTime = gameTime;
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
        if (gameTime === 0) {
          flickboard.className = "flickboard-hidden";
          highScoreHistory.className = "highScoreHistory-hidden";
          comboMeter.className = "comboMeter-hidden";
          scoreSummary.className = "summary-display";
          console.log(numCorrect)
          console.log(numWrong)
          scoreSummary.innerHTML = `Game Over! <br>Score: ${score} <br>Accuracy: ${Math.round(numCorrect / (numCorrect + numWrong) * 100)}% <br>Speed: ${Math.round(constantGameTime / (numCorrect + numWrong) * 10) / 10} seconds/question`;
          resetButton.textContent = "New Game";
          equationBox.style.animation = 'none';
          equationBox.offsetHeight; /* trigger reflow */
          equationBox.style.animation = null; 
          flickboard.style.animation = 'none';
          flickboard.offsetHeight; /* trigger reflow */
          flickboard.style.animation = null;      
          for (let target of targets) {
            target.style.animation = 'none';
            target.offsetHeight;
            target.style.animation = null;
          }
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
  numCorrect = 0;
  numWrong = 0;
}

//High score vvvv
function setHighScore(){
  if (score > highScore) {
    localStorage.setItem(`HS`, score);
    highScore = score;
    highScoreArray.push({
      "Score": highScore, 
      "Time": new Date()
    });
    if (gameTime === 0) {
      scoreSummary.innerHTML = `You have the new high score!<br> Score: ${score} <br> Accuracy: ${Math.round(numCorrect / (numCorrect + numWrong) * 100)}% <br> Speed: ${Math.round(constantGameTime / (numCorrect + numWrong) * 10) / 10} seconds/question`;
    }
  }
  highScoreBox.innerHTML = "High Score: " + highScore; 
}

// Show high score history when highScoreBox is clicked at the end of game
highScoreBox.addEventListener("click", function() {
  highScoreHistory.className = "highScoreHistory-display";
  flickboard.className = "flickboard-hidden";
  scoreSummary.className = "summary-hidden";
  comboMeter.className = "comboMeter-hidden";
  if (highScoreArray.length > 0) {
    let scoreHistory = "";
    for (let i = 0; i < highScoreArray.length; i++) {
      scoreHistory +=  `High score [${i + 1}]: ${highScoreArray[i]["Score"]} <br> Time: ${highScoreArray[i]["Time"]} <br>`;
    }
    highScoreHistory.innerHTML = scoreHistory;
  } else {
    highScoreHistory.textContent = "High score history not available if page has been refreshed";
  } 
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
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
    
  }
  else {
    box1.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box2Colors(){
  if (equation == targetArray[1]) {  
    box2.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
    
  }
  else {
    box2.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box3Colors(){
  if (equation == targetArray[2]) {  
    box3.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box3.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box4Colors(){
  if (equation == targetArray[3]) {  
    box4.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box4.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box5Colors(){
  if (equation == targetArray[4]) {  
    box5.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box5.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box6Colors(){
  if (equation == targetArray[5]) {  
    box6.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box6.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box7Colors(){
  if (equation == targetArray[6]) {  
    box7.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box7.style.background = "red";
    minusPoint();
    numWrong++;
    comboReset();
    return solved = false; 
  }
}

function box8Colors(){
  if (equation == targetArray[7]) {  
    box8.style.background = "green";
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box8.style.background = "red";
    minusPoint();
    numWrong++;
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