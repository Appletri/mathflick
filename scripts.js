const box8 = document.querySelector("#box8");
const box7 = document.querySelector("#box7");
const box6 = document.querySelector("#box6");
const box5 = document.querySelector("#box5");
const box4 = document.querySelector("#box4");
const box3 = document.querySelector("#box3");
const box2 = document.querySelector("#box2");
const box1 = document.querySelector("#box1");
const equationBox = document.querySelector("#equation");
const targets = document.querySelector(".target")
const timer = document.querySelector(`#timer`);

let equation = 1;
let solved = true;
let round = 0;
let roundCheck = 0;
let combo = 1;
let a;
let b;
let score = 0;


//targets start value
let targetArray = [1,2,3,4,5,6,7,8];



//tylphe's stuff vvvvvvvvvvvvvvvv

//start countdown  when mouse hovers over equation button

// equationBox.addEventListener("mouseover");




let gameTime = 3;
timer.innerHTML = `Time: ` + gameTime;
// timer vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let interval = setInterval(() => {
    if(gameTime > 0){
      gameTime--;
      timer.innerHTML = `Time: ` + gameTime;
    }
    else{
      clearInterval(interval);
    }
  }, 1000);
// timer ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//tylphe's stuff ^^^^^^^^^^^^^^^^^^








//EventListeners for Targets!
//------------------------------------------------------------------------------


//box 1 event listener. It will show green if correct and red if incorrect
box1.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[0]) {
      
      box1.style.background = "green";
      addPoint();
      return solved = true;
      
  }
    else {
      
      box1.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 1 event listener part 2 will return to original color
box1.addEventListener("mouseout", event => {
  
  box1.style.background = "";
  
});

//box 2 event listener. It will show green if correct and red if incorrect
box2.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[1]) {
      
      box2.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box2.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 2 event listener part 2 will return to original color
box2.addEventListener("mouseout", event => {
  
  box2.style.background = "";
  
});



//box 3 event listener. It will show green if correct and red if incorrect
box3.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[2]) {
      
      box3.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box3.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 3 event listener part 2 will return to original color
box3.addEventListener("mouseout", event => {
 
  box3.style.background = "";

});

//box 4 event listener. It will show green if correct and red if incorrect
box4.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[3]) {
      
      box4.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box4.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 4 event listener part 2 will return to original color
box4.addEventListener("mouseout", event => {
  
  box4.style.background = "";
  
});

//box 5 event listener. It will show green if correct and red if incorrect
box5.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[4]) {
      
      box5.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box5.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 5 event listener part 2 will return to original color
box5.addEventListener("mouseout", event => {
  
  box5.style.background = "";
  
});

//box 6 event listener. It will show green if correct and red if incorrect
box6.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[5]) {
      
      box6.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box6.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 6 event listener part 2 will return to original color
box6.addEventListener("mouseout", event => {
  
  box6.style.background = "";
  
});


//box 7 event listener. It will show green if correct and red if incorrect
box7.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[6]) {
      
      box7.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box7.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 
  }
  
});

//box 7 event listener part 2 will return to original color
box7.addEventListener("mouseout", event => {
  
  box7.style.background = "";
  
});



//box 8 event listener. It will show green if correct and red if incorrect
box8.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[7]) {
      
      box8.style.background = "green";
      addPoint();
      return solved = true; 
  }
    else {
      
      box8.style.background = "red";
      minusPoint();
      comboReset()
      return solved = false; 

  }
  
});

//box 8 event listener part 2 will return to original color
box8.addEventListener("mouseout", event => {
  
  box8.style.background = "";
  
});

//------------------------------------------------------------------------------








//equation event listener. It will generate a new equation and array of numbers.
//It will then add the correct answer in the array.
equationBox.addEventListener("mouseover", event => {

let randomNumber= 1;
let randomBoxNumber = "";

if (solved == true) {
        equationBox.style.background = "green";
        updateArray();
        equation = getEquation();


        randomNumber = getRandomBoxNumber();
        randomBoxNumber="box"+(randomNumber+1);

        console.log (randomNumber);
        console.log (randomBoxNumber);
        console.log (targetArray);

        eval(randomBoxNumber).textContent = equation;
        targetArray[randomNumber] = equation;

        roundCheck++;
        comboChain();
        console.log (combo);
        // console.log (randomNumber);
        // console.log (randomBoxNumber);
        // console.log (targetArray);
        // console.log (round);
        // console.log (roundCheck);
        
    }
    else 
    {
        equationBox.style.background = "red";
    }
    
  });
  
equationBox.addEventListener("mouseout", event => {
    
    equationBox.style.background = "";
    solved = false;
    
  });

document.getElementById(`equation`).addEventListener("mouseover", event => {
        document.getElementById('equation').innerHTML = a + " + " + b;
    });





//functions
function getRandomBoxNumber() {
    return Math.floor((Math.random() * 8));
    
    
}

function getRandomTotal() {
    return Math.floor(Math.random() * 10);
}

function getRandomInt() {
    return Math.floor(Math.random() * 20);
}

function getEquation() {
    a = getRandomTotal();
    b = getRandomTotal();

    return a+b;
    
}

function comboChain() {
    if (solved == true) {
        combo++;
    }
    else {
        return;
    }
}

function comboReset() {
    combo = 1;
}

function addPoint() {
    if (round == roundCheck){
        score = score + combo*1;
        round++;
        document.getElementById('score').innerHTML = score
    }
    
    else{
        return;
    }
}

function minusPoint() {
    score--;
    document.getElementById('score').innerHTML = score;
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






