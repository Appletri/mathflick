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

let equation = 1;
let solved = true;
let a;
let b;
let randomNumber=(getRandomArrayNumber());
let randomBoxNumber="box"+(randomNumber + 1);

//targets start value
let targetArray = [8,9,6,3,2,1,4,7];



//tylphe's stuff vvvvvvvvvvvvvvvv

//start countdown  when mouse hovers over equation button

let timer = 30;
document.getElementById(`timer`).innerHTML = `0:` + timer;

//tylphe's stuff ^^^^^^^^^^^^^^^^^^








//EventListeners for Targets!
//------------------------------------------------------------------------------


//box 1 event listener. It will show green if correct and red if incorrect
box1.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[5]) {
      
      box1.style.background = "green";
      return solved = true; 
  }
    else {
      
      box1.style.background = "red";
      return solved = false; 
  }
  
});

//box 1 event listener part 2 will return to original color
box1.addEventListener("mouseout", event => {
  
  box1.style.background = "";
  
});

//box 2 event listener. It will show green if correct and red if incorrect
box2.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[4]) {
      
      box2.style.background = "green";
      return solved = true; 
  }
    else {
      
      box2.style.background = "red";
      return solved = false; 
  }
  
});

//box 2 event listener part 2 will return to original color
box2.addEventListener("mouseout", event => {
  
  box2.style.background = "";
  
});

//box 3 event listener. It will show green if correct and red if incorrect
box3.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[3]) {
      
      box3.style.background = "green";
      return solved = true; 
  }
    else {
      
      box3.style.background = "red";
      return solved = false; 
  }
  
});

//box 3 event listener part 2 will return to original color
box3.addEventListener("mouseout", event => {
  
  box3.style.background = "";
  
});

//box 4 event listener. It will show green if correct and red if incorrect
box4.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[6]) {
      
      box4.style.background = "green";
      return solved = true; 
  }
    else {
      
      box4.style.background = "red";
      return solved = false; 
  }
  
});

//box 4 event listener part 2 will return to original color
box4.addEventListener("mouseout", event => {
  
  box4.style.background = "";
  
});

//box 6 event listener. It will show green if correct and red if incorrect
box6.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[2]) {
      
      box6.style.background = "green";
      return solved = true; 
  }
    else {
      
      box6.style.background = "red";
      return solved = false; 
  }
  
});

//box 6 event listener part 2 will return to original color
box6.addEventListener("mouseout", event => {
  
  box6.style.background = "";
  
});

//box 8 event listener. It will show green if correct and red if incorrect
box8.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[0]) {
      
      box8.style.background = "green";
      return solved = true; 
  }
    else {
      
      box8.style.background = "red";
      return solved = false; 
  }
  
});

//box 8 event listener part 2 will return to original color
box8.addEventListener("mouseout", event => {
  
  box8.style.background = "";
  
});

//box 5 event listener. It will show green if correct and red if incorrect
box5.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[1]) {
      
      box5.style.background = "green";
      return solved = true; 
  }
    else {
      
      box5.style.background = "red";
      return solved = false; 
  }
  
});

//box 9 event listener part 2 will return to original color
box5.addEventListener("mouseout", event => {
  
  box5.style.background = "";
  
});



//box 7 event listener. It will show green if correct and red if incorrect
box7.addEventListener("mouseover", event => {
  
  
    if (equation == targetArray[7]) {
      
      box7.style.background = "green";
      return solved = true; 
  }
    else {
      
      box7.style.background = "red";
      return solved = false; 
  }
  
});

//box 7 event listener part 2 will return to original color
box7.addEventListener("mouseout", event => {
  
  box7.style.background = "";
  
});

//------------------------------------------------------------------------------








//equation event listener. It will generate a new equation and array of numbers.
//It will then add the correct answer in the array.
equationBox.addEventListener("mouseover", event => {
    

    if (solved == true) {
        equationBox.style.background = "green";
        updateArray();
        equation = getEquation();
        
        console.log (targetArray);
        targetArray[7] = equation;
        box7.textContent = equation;
        // testing
        // targetArray[randomNumber] = equation;

        // console.log (targetArray);
        // randomBoxNumber.textContent = targetArray[randomNumber];
        
        console.log (equation);
        // console.log (randomBoxNumber);
        

    }
    else 
    {
        equationBox.style.background = "red";
    }
    
  });
  
equationBox.addEventListener("mouseout", event => {
    
    equationBox.style.background = "";
   
  });

document.getElementById(`equation`).addEventListener("mouseover", event => {
        document.getElementById('equation').innerHTML = a + " + " + b;
    });





//functions
function getRandomArrayNumber() {
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
        box8.textContent = targetArray[0];
        box5.textContent = targetArray[1]; 
        box6.textContent = targetArray[2]; 
        box3.textContent = targetArray[3]; 
        box2.textContent = targetArray[4]; 
        box1.textContent = targetArray[5]; 
        box4.textContent = targetArray[6]; 
        box7.textContent = targetArray[7];  
          
}






