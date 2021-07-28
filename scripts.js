const box8 = document.querySelector("#box8");
const box7 = document.querySelector("#box7");
const box6 = document.querySelector("#box6");
const box9 = document.querySelector("#box9");
const box4 = document.querySelector("#box4");
const box3 = document.querySelector("#box3");
const box2 = document.querySelector("#box2");
const box1 = document.querySelector("#box1");
const equationBox = document.querySelector("#equation");


let equation = 1;
//targets start value
let targetArray = [8,9,6,3,2,1,4,7];



//box 7 event listener
box7.addEventListener("mouseover", event => {
  
  if (equation == true) {
      console.log("Correct");
      box7.style.background = "green"; 
  }
  else {
      console.log("Incorrect");
      box7.style.background = "red"; 
  }
  
});
//box 7 event listener to change value if equation is correct
box7.addEventListener("mouseout", event => {
  
  if (equation == true)  {
      targetArray[7] = getRandomInt();
      box7.textContent = targetArray[7];
  } 
  
  box7.style.background = "";
  console.log (targetArray);
});



//equation event listener
equationBox.addEventListener("mouseover", event => {
    
    equationBox.style.background = "green";
    equation = getRandomBoolean();
    console.log (equation);
    
  });
  
equationBox.addEventListener("mouseout", event => {
    
    equationBox.style.background = "";
   
  });


function getRandomBoolean() {
    return Math.floor(Math.random() * 2);
}

function getRandomInt() {
    return Math.floor(Math.random() * 100);
}

// function checkEquation() {
//     for (i=1,i<Infinity,i++) {
//         for (i=0,i<8,i++) [
//             if (equation)
//         ]
        
//     }

// }

