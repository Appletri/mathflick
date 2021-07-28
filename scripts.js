const box8 = document.querySelector("#box8");
const box7 = document.querySelector("#box7");
const box6 = document.querySelector("#box6");
const box9 = document.querySelector("#box5");
const box4 = document.querySelector("#box4");
const box3 = document.querySelector("#box3");
const box2 = document.querySelector("#box2");
const box1 = document.querySelector("#box1");
const equationBox = document.querySelector("#equation");


let equation = 1;

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

box7.addEventListener("mouseout", event => {
  
  box7.style.background = "";
 
});

//equation event listener
equationBox.addEventListener("mouseover", event => {
    
    equationBox.style.background = "green";
    equation = getRandomInt();
    console.log (equation);
    
  });
  
equationBox.addEventListener("mouseout", event => {
    
    equationBox.style.background = "";
   
  });


function getRandomInt() {
    return Math.floor(Math.random() * 2);
}
