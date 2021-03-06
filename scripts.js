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
const timer = document.querySelector(`.timer`);
const scoreboard = document.querySelector(`.score`);
const resetButton = document.querySelector(`.resetButton`);
const highScoreBox = document.querySelector(`.highScore`);
const flickboard = document.querySelector("#flickboard");
const scoreSummary = document.querySelector("#score-summary");
const highScoreHistory = document.querySelector("#highScore-history"); 
const introPage = document.querySelector(`.intro-page`);
const comboMeter = document.querySelector("#comboMeter");
const mathFlickLogo =  document.querySelector("#MFIMG");
const starBlitzText = document.querySelector("#starblitz");
const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);

let gameState = "";
let equation = 1;
let solved = true;
let round = 1;
let roundCheck = 0;
let combo = 0;
let a;
let b;
let wrongEqArr = [];
let wrongEqArrAns = [];

let score = 0;
let scoreMultiplier = 1;
let numCorrect = 0;
let numWrong = 0;

let highScore = localStorage.getItem('HS');
let highScoreArray = [];
let wrongEqSummary;
let starBlitzState = true;

let interval; //time interval
let gameTime = 0;
let constantGameTime;

let targetArray = [1,2,3,4,5,6,7,8]; //targets start value

let indicatorEq;
let indicatorT;
let indicatorTargets;
let blinkingState = true;


//sound variables
let sfxRight = new Audio(`./audio/sfx_coin_double1.wav`);
let sfxWrong = new Audio(`./audio/sfx_sounds_error9.wav`);
let sfxNewGame = new Audio(`./audio/sfx_sounds_button4.wav`);
let sfxGameEnd = new Audio(`./audio/sfx_menu_select4.wav`);
let sfxBlitzRight = new Audio(`./audio/sfx_sounds_powerup18.wav`);
let sfxStarBlitz = new Audio(`./audio/sfx_sounds_powerup2.wav`);
let musicStarBlitz = new Audio(`./audio/15sec-2020-06-18_-_8_Bit_Retro_Funk_-_www.FesliyanStudios.com_David_Renda.mp3`);
//volume control
let historyVolume = 0.5;
function getVolume(){
  if(historyVolume===null){
    historyVolume = localStorage.setItem('volume',0.5);
  }
  else{
    historyVolume = localStorage.getItem('volume');
  }
}


sfxRight.volume = historyVolume ;
sfxWrong.volume = historyVolume ;
sfxGameEnd.volume = historyVolume ;
sfxNewGame.volume = historyVolume ;
sfxStarBlitz.volume = historyVolume ;
sfxBlitzRight.volume = historyVolume ;
musicStarBlitz.volume = historyVolume ; 

//load intro page on load. This should resolve the sound on browser. after loading the page.
window.addEventListener(`load`, aboutUs); 

function aboutUs() {
  highScoreBox.disabled = true;
  flickboard.className = "flickboard-hidden";
  scoreSummary.className = "summary-hidden";
  comboMeter.className = "comboMeter-hidden";
  highScoreHistory.className = "highScoreHistory-hidden";
  introPage.className = "intro-page";
  resetButton.textContent = "";
  equationBox.style.animation = 'none';
  equationBox.offsetHeight; /* trigger reflow */
  equationBox.style.animation = null; 
  flickboard.style.animation = 'none';
  flickboard.offsetHeight; /* trigger reflow */
  flickboard.style.animation = null;
  setHighScore();
  scoreboard.innerHTML = `Score: ` + score;
  timer.innerHTML = `Time: ` + gameTime;
}

//Present `hover to start` screen
function preGame(){
    highScoreBox.disabled = false;
    starBlitzText.style.opacity = 0;
    musicStarBlitz.pause();
    musicStarBlitz.currentTime = 0;
    mathFlickLogo.style.opacity = 1;
    introPage.className = "intro-page-hidden";
    solved = true;
    starBlitzState = false;
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

    equationBox.style.animation = 'rotationBackwards 60s infinite linear';
    flickboard.style.animation = 'rotation 60s infinite linear';
    for (let target of targets) {
      target.style.animation = 'rotationBackwards 60s infinite linear';
    }
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



function resetButt(){
  sfxNewGame.play();
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
  flickboard.className = "flickboard-display";
  comboMeter.className = "comboMeter-display";
  scoreSummary.className = "summary-hidden";
  highScoreHistory.className = "highScoreHistory-hidden";
  resetButton.textContent = "Reset Game";
  starBlitzState = false;
  blitzEffects();
  preGame();
}

//play the game, start countdown vvvv
function playGame(){
  equationBox.removeEventListener(`mouseover`, playGame);
  equationBox.addEventListener("mouseout", alertRed);
  gameTime = 30; //debugging
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
        //star blitz mode engaged
        if ( gameTime == 10 && starBlitzState == false){
          sfxStarBlitz.load();
          musicStarBlitz.load();
          sfxStarBlitz.play();
          musicStarBlitz.play();
          starBlitzText.style.opacity = 1;
          starBlitzState = true;
          sbi = 0;
          starBlitz();
          blitzEffects();
          scoreboard.innerHTML = "Score: " + score + " x " + scoreMultiplier;
        }
    }
    else{
        timer.innerHTML = `Time: ` + 0;
        clearInterval(interval);
        if (gameTime === 0) {
          sfxGameEnd.play();
          starBlitzState = false;
          blitzEffects();
          score = score * scoreMultiplier;
          flickboard.className = "flickboard-hidden";
          highScoreHistory.className = "highScoreHistory-hidden";
          comboMeter.className = "comboMeter-hidden";
          scoreSummary.className = "summary-display";

          //End-of-game summary
          document.querySelector(".score-value").innerHTML = `${score}`;
          document.querySelector(".speed-value").innerHTML = `${Math.round(constantGameTime / (numCorrect + numWrong) * 10) / 10} seconds/question`;
          document.querySelector(".accuracy-value").innerHTML = `${Math.round(numCorrect / (numCorrect + numWrong) * 100)}%`;
          
          //Displaying wrong equations for review
          // generate unique array of wrong equations
          let uniqueWrongArr = wrongEqArr.filter((value, index, self) => self.indexOf(value) === index);

          //Create another table to hold wrong equations
          if (uniqueWrongArr.length !== 0) {
            wrongEqSummary = document.createElement("table");
            wrongEqSummary.setAttribute("id", "wrong-equations");

            let wrongEqHeaderRow = document.createElement("tr");
            let wrongEqHeader = document.createElement("th");
            wrongEqHeader.innerHTML = `Equations to review (click for answer)`;
            wrongEqHeaderRow.appendChild(wrongEqHeader);
            wrongEqSummary.appendChild(wrongEqHeaderRow);

            for (let equation of uniqueWrongArr) {
              let row = document.createElement("tr");
              row.setAttribute("class", "new-row");

              let wrongEq = document.createElement("td");
              wrongEq.innerHTML = `${equation}`;
              wrongEq.onclick = function() {
                wrongEq.innerHTML = `${equation} = ${wrongEqArrAns[wrongEqArr.indexOf(equation)]}`
              }
              wrongEq.onmouseover = function() {
                wrongEq.style.cursor = "pointer";
              }
              row.appendChild(wrongEq);

              wrongEqSummary.appendChild(row);
            }
            scoreSummary.appendChild(wrongEqSummary);
        }
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
    }
  }
}

//reset variables vvvv
function reset(){
  score = 0;
  scoreMultiplier = 1;
  round = 1;
  roundCheck = 0;
  combo = 0;
  numCorrect = 0;
  numWrong = 0;
  document.getElementById('comboMeter').innerHTML = "";  
  

  if (wrongEqSummary) {
    wrongEqSummary.remove();
  }
  wrongEqArr.splice(0, wrongEqArr.length);
  wrongEqArrAns.splice(0, wrongEqArrAns.length);
}

//High score vvvv
function setHighScore(){
  if (score > highScore) {
    localStorage.setItem(`HS`, score);
    highScore = score;
    const now = new Date();
    const offsetMs = now.getTimezoneOffset() * 60 * 1000;
    const dateLocal = new Date(now.getTime() - offsetMs);
    const str = dateLocal.toISOString().slice(0, 19).replace(/-/g, "/").replace("T", " ");
    highScoreArray.push({
      "Score": highScore, 
      "Time": str
    });
    if (gameTime === 0) {

      // //End-of-game summary
      document.querySelector(".score-header").innerHTML = `You have the new high score!`;
      document.querySelector(".score-value").innerHTML = `${score}`;
      document.querySelector(".speed-value").innerHTML = `${Math.round(constantGameTime / (numCorrect + numWrong) * 10) / 10} seconds/question`;
      document.querySelector(".accuracy-value").innerHTML = `${Math.round(numCorrect / (numCorrect + numWrong) * 100)}%`;
    }
  }
  highScoreBox.innerHTML = "Best: " + highScore; 
}

// Show high score history when highScoreBox is clicked at the end of game
highScoreBox.addEventListener("click", function() {
  highScoreHistory.className = "highScoreHistory-display";
  flickboard.className = "flickboard-hidden";
  scoreSummary.className = "summary-hidden";
  comboMeter.className = "comboMeter-hidden";
  introPage.className = "intro-page-hidden";

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
    box1.innerText = ``;
    if (starBlitzState){
      box1.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box1.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box2Colors(){
  if (equation == targetArray[1]) {  
    box2.style.background = "green";
    box2.innerText = ``;
    if (starBlitzState){
      box2.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box2.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box3Colors(){
  if (equation == targetArray[2]) {  
    box3.style.background = "green";
    box3.innerText = ``;
    if (starBlitzState){
      box3.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box3.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
    addPoint();
    numCorrect++;
    equationBox.style.background = "rgba(0,225,0,0.2)";
    indicatorEq = setInterval(indicatorEquation, 500);
    return solved = true;
  }
  else {
    box3.style.background = "red";
    minusPoint();
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box4Colors(){
  if (equation == targetArray[3]) {  
    box4.style.background = "green";
    box4.innerText = ``;
    if (starBlitzState){
      box4.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box4.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box5Colors(){
  if (equation == targetArray[4]) {  
    box5.style.background = "green";
    box5.innerText = ``;
    if (starBlitzState){
      box5.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box5.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box6Colors(){
  if (equation == targetArray[5]) {  
    box6.style.background = "green";
    box6.innerText = ``;
    if (starBlitzState){
      box6.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box6.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box7Colors(){
  if (equation == targetArray[6]) {  
    box7.style.background = "green";
    box7.innerText = ``;
    if (starBlitzState){
      box7.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box7.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push(`${a} + ${b}`);
    wrongEqArrAns.push(a + b);
    comboReset();
    return solved = false; 
  }
}

function box8Colors(){
  if (equation == targetArray[7]) {  
    box8.style.background = "green";
    box8.innerText = ``;
    if (starBlitzState){
      box8.style.animation = `rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate, pulsate .5s ease-out`;
    }
    else{
      box8.style.animation = `rotationBackwards 60s infinite linear, pulsate .5s ease-out`;
    }
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
    wrongEqArr.push( `${a} + ${b}`);
    wrongEqArrAns.push(a + b);
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
  if(starBlitzState){
    for (let target of targets) {
      target.style.animation = 'rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate';
    }
  }
  else{
    for (let target of targets) {
      target.style.animation = 'rotationBackwards 60s infinite linear';
    }
  }

let randomNumber= 1;
let randomBoxNumber = "";

if (solved == true) {
    updateArray();
    equation = getEquation();
    equationBox.style.background = "rgba(0,225,0,0.2)";
    randomNumber = getRandomBoxNumber();
    randomBoxNumber="box"+(randomNumber+1);
    
    eval(randomBoxNumber).textContent = equation;
    targetArray[randomNumber] = equation;

    roundCheck++;
    comboChain();
  }
  else {
    equationBox.style.background = "rgba(225,0,0,0.5)";
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
        if (combo == 1){
          document.getElementById('comboMeter').innerHTML = "";
        }
        else{
          document.getElementById('comboMeter').innerHTML = "Combo x" + combo;
          document.getElementById('comboMeter').style.fontSize = `${10 * (1 + (combo/10))}px`;
        }
    }
    else {
        return;
    }
}

function comboReset() {
    combo = 1;
    document.getElementById('comboMeter').innerHTML = "";
    document.getElementById('comboMeter').style.fontSize = '10px';
}

function addPoint() {
    if (round == roundCheck){
      if (starBlitzState == false){
        sfxRight.load();
        sfxRight.play();
        score = score + combo;
        round++;
        scoreboard.innerHTML = `Score: ` + score;
      }
      else {
        sfxBlitzRight.load();
        sfxBlitzRight.play();
        comboReset();
        scoreMultiplier = scoreMultiplier + 1;
        round++;
        scoreboard.innerHTML = "Score: " + score + " x " + scoreMultiplier;
      }
    }
    else{
        return;
    }
}

function minusPoint() {
  if (starBlitzState == false){
    sfxWrong.load();
    sfxWrong.play();
    score--;
    scoreboard.innerHTML = `Score: ` + score;
  }
  else {
    sfxWrong.load();
    sfxWrong.play();
    scoreboard.innerHTML = "Score: " + score + " x " + scoreMultiplier;
  }
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

function Star(x,y,r,color){
    this.x = x;
    this.y = y;
    this.r = r;
    this.rChange = 0.015;
    // this.vx = Math.floor(Math.random()*4+1);
    // this.vy = Math.floor(Math.random()*4+1);
    this.color = color;
}

Star.prototype = {
    constructor: Star,
    render: function(){
      context.beginPath();
      context.arc(this.x, this.y, this.r, 0, 2*Math.PI, false);
      context.shadowBlur = 8; 
      context.shadowColor = "white";
      context.fillStyle = this.color;
      context.fill();
    },
    update: function(){
      
       if (this.r > 2 || this.r < .8){
           this.rChange = - this.rChange;
       }
       this.r += this.rChange;
    }
}


// Star functionality

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let C_WIDTH = canvas.width = document.body.offsetWidth;
let C_HEIGHT = canvas.height = document.body.offsetHeight;

function randomColor(){
        let arrColors = ["ffffff", "ffecd3" , "bfcfff"];
        return "#"+arrColors[Math.floor((Math.random()*3))];
}
        
let arrStars = [];
for(i = 0; i < 100; i++){
    let randX = Math.floor((Math.random()*C_WIDTH)+1);
    let randY = Math.floor((Math.random()*C_HEIGHT)+1);
    let randR = Math.random() * 1.7 + .5;
    
    let star = new Star(randX, randY, randR, randomColor());
    arrStars.push(star);
}
function update(){
  for(i = 0; i < arrStars.length; i ++){
    arrStars[i].update();
  }
}
function animate(){
  update();
  /*
    Remove comments below these for a cool trailing effect & comment
    out the context.clearRect.
  */
    //context.fillStyle = 'rgba(255, 255, 255, .1)';
    //context.fillRect(0,0,C_WIDTH,C_HEIGHT);
    context.clearRect(0,0,C_WIDTH,C_HEIGHT);
    for(let i = 0; i < arrStars.length; i++){
      arrStars[i].render();
    }
    requestAnimationFrame(animate);
}

animate();

function blitzEffects(){
  if(starBlitzState){
    timer.className = `timer blitz`;
    scoreboard.className = `score blitz`;
    resetButton.className = `resetButton blitz`;
    highScoreBox.className = `highScore blitz`;
    comboMeter.className = "comboMeter-hidden";
    for (let target of targets) {
      target.style.animation = 'rotationBackwards 60s infinite linear, animatedTarget 3s linear infinite alternate';
    }
    
  }
  else{
    timer.className = `timer`;
    scoreboard.className = `score`;
    resetButton.className = `resetButton`;
    highScoreBox.className = `highScore`;
    comboMeter.className = "comboMeter-display";
    return;
  }
}
 //Star Blitz text 
 
  let sbi = 0;
  let sbtxt = "STAR BLITZ";
  let sbspeed = 50;
 
function starBlitz() {
  mathFlickLogo.style.opacity = 0;

  if (sbi < sbtxt.length) {
    starBlitzText.innerHTML += sbtxt.charAt(sbi);
    sbi++;
    setTimeout(starBlitz, sbspeed);
  }
  else {
    
    setTimeout(resetText, 10000);
    
  }

}

function resetText (){
  starBlitzText.innerHTML ="";
  mathFlickLogo.style.opacity = 1;
}


function SetVolume(val)
    {   
      
      

        sfxRight.volume = val / 100;
        sfxWrong.volume = val / 100;
        sfxGameEnd.volume = val / 100;
        sfxNewGame.volume = val / 100;
        sfxStarBlitz.volume = val / 100;
        sfxBlitzRight.volume = val / 100;
        musicStarBlitz.volume = val / 100; 

        
        
        historyVolume = localStorage.setItem('volume',val/100);
        
    }

const indicatorRight = document.querySelector("#indicator-right");
const indicatorLeft = document.querySelector("#indicator-left");
const start = document.querySelector("#start");
const end = document.querySelector("#end");
let tutorialStage1 = true;
let tutorialStage2 = false;
let tutorialComplete = false;


function tutorial() {
    if (tutorialStage1 == true){
      indicatorRight.style.opacity = "1";
      start.innerHTML = "2 + 2";
      tutorialStage1 = false;
      
      end.addEventListener(`mouseover`,tutorialP2);
    }
    else if (tutorialStage2 == true){
      start.innerHTML = `<img src="images/outline_done_white_24dp.png">`;
      start.style.lineHeight="180px";
      start.style.backgroundColor = "green";
      end.innerHTML = `<img src="images/outline_done_white_24dp.png">`;
      end.style.lineHeight="180px";
      end.style.backgroundColor = "green";
      indicatorLeft.style.opacity = "0"
      tutorialComplete = true;
      resetButton.addEventListener(`click`, resetButt);
      resetButton.textContent = "New Game";
      document.getElementById("tutorial-last").innerHTML = "Click New Game to play!"
    }

    
    
    
}

function tutorialP2() {
    if (tutorialComplete == false){
      indicatorRight.style.opacity = "0";
      indicatorLeft.style.opacity = "1";
      tutorialStage2 = true;
    }
    else {
      return;
    }
  
}

start.addEventListener(`mouseover`,tutorial);
