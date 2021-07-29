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
let a;
let b;


//targets start value
let targetArray = [1,2,3,4,5,6,7,8];



//tylphe's stuff vvvvvvvvvvvvvvvv
//start countdown  when mouse hovers over equation button

// equationBox.addEventListener("mouseover");

let gameTime = 3;
timer.innerHTML = `Time: ` + gameTime;
let startGame = 0;

//start game vvvvvvvvvvvvvvvvvvvvv


//start game ^^^^^^^^^^^^^^^^^^^^^^^

// timer vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
let interval = setInterval(() => {
  if(gameTime > 0){
    --gameTime;
    timer.innerHTML = `Time: ` + gameTime;
  }
  else{
    function game(){
      if(gameTime == 0){
        clearInterval(interval);
        box1.innerHTML = ``;
        box2.innerHTML = ``;
        box3.innerHTML = ``;
        box4.innerHTML = ``;
        box5.innerHTML = ``;
        box6.innerHTML = ``;
        box7.innerHTML = ``;
        box8.innerHTML = ``;
        equationBox.innerHTML = `Hover to start!`;
        equationBox.addEventListener("mouseover", function() {
        solved = true;
        startGame = 1;
      });
      }
      }
      game();
  }
}, 1000);
// timer ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//tylphe's stuff ^^^^^^^^^^^^^^^^^^

//EventListeners for Targets!
//------------------------------------------------------------------------------


//box 1 event listener. It will show green if correct and red if incorrect
box1.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[0]) {
      
      box1.style.background = "green";
      return solved = true; 
  }
    else {
      
      box1.style.background = "red";
      return solved = false; 
  }
  
});

//box 1 event listener part 2 will return to original color
box1.addEventListener("mouseout", function() {
  
  box1.style.background = "";
  
});

//box 2 event listener. It will show green if correct and red if incorrect
box2.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[1]) {
      
      box2.style.background = "green";
      return solved = true; 
  }
    else {
      
      box2.style.background = "red";
      return solved = false; 
  }
  
});

//box 2 event listener part 2 will return to original color
box2.addEventListener("mouseout", function() {
  
  box2.style.background = "";
  
});



//box 3 event listener. It will show green if correct and red if incorrect
box3.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[2]) {
      
      box3.style.background = "green";
      return solved = true; 
  }
    else {
      
      box3.style.background = "red";
      return solved = false; 
  }
  
});

//box 3 event listener part 2 will return to original color
box3.addEventListener("mouseout", function() {
 
  box3.style.background = "";

});

//box 4 event listener. It will show green if correct and red if incorrect
box4.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[3]) {
      
      box4.style.background = "green";
      return solved = true; 
  }
    else {
      
      box4.style.background = "red";
      return solved = false; 
  }
  
});

//box 4 event listener part 2 will return to original color
box4.addEventListener("mouseout", function() {
  
  box4.style.background = "";
  
});

//box 5 event listener. It will show green if correct and red if incorrect
box5.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[4]) {
      
      box5.style.background = "green";
      return solved = true; 
  }
    else {
      
      box5.style.background = "red";
      return solved = false; 
  }
  
});

//box 5 event listener part 2 will return to original color
box5.addEventListener("mouseout", function() {
  
  box5.style.background = "";
  
});

//box 6 event listener. It will show green if correct and red if incorrect
box6.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[5]) {
      
      box6.style.background = "green";
      return solved = true; 
  }
    else {
      
      box6.style.background = "red";
      return solved = false; 
  }
  
});

//box 6 event listener part 2 will return to original color
box6.addEventListener("mouseout", function() {
  
  box6.style.background = "";
  
});


//box 7 event listener. It will show green if correct and red if incorrect
box7.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[6]) {
      
      box7.style.background = "green";
      return solved = true; 
  }
    else {
      
      box7.style.background = "red";
      return solved = false; 
  }
  
});

//box 7 event listener part 2 will return to original color
box7.addEventListener("mouseout", function() {
  
  box7.style.background = "";
  
});



//box 8 event listener. It will show green if correct and red if incorrect
box8.addEventListener("mouseover", function() {
  
  
    if (equation == targetArray[7]) {
      
      box8.style.background = "green";
      return solved = true; 
  }
    else {
      
      box8.style.background = "red";
      return solved = false; 
  }
  
});

//box 8 event listener part 2 will return to original color
box8.addEventListener("mouseout", function() {
  
  box8.style.background = "";
  
});

//------------------------------------------------------------------------------








//equation event listener. It will generate a new equation and array of numbers.
//It will then add the correct answer in the array.
equationBox.addEventListener("mouseover", function() {

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

        console.log (randomNumber);
        console.log (randomBoxNumber);
        console.log (targetArray);
      
    }
    else 
    {
        equationBox.style.background = "red";
    }
    
  });
  
equationBox.addEventListener("mouseout", function() {
    
    equationBox.style.background = "";
    solved = false;

   
  });

document.getElementById(`equation`).addEventListener("mouseover", function() {
        document.getElementById('equation').innerHTML = a + " + " + b;
    });





//functions
function getRandomBoxNumber() {
    return Math.floor((Math.random() * 8));
    
    
}

function getRandomTotal() {
    return Math.floor(Math.random() * 50);
}

function getRandomInt() {
    return Math.floor(Math.random() * 100);
}

function getEquation() {
    a = getRandomTotal();
    b = getRandomTotal();

    return a+b;
    
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