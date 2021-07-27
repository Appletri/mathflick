let canvas = document.getElementById("myCanvas")
let ctx = canvas.getContext("2d");



//timer and score variables
let seconds = 60;
let counter = 0;
let score = 0;
let highScore = localStorage.getItem("highscore");

function timer() 
{

    if(seconds > 0)
    {
        seconds--;
    }
    else if (seconds ==0)
    {
        if(score > highScore)
        {
            localStorage.setItem("highscore", score);
        }
        alert("GAME OVER! YOUR SCORE: " + score);
        document.location.reload(); //reloads the page after game
    }

}

function drawHighScore()
{
    localStorage.getItem("best", highScore);
    if(highScore == null)
    {
        ctx.font = "36px serif";
        ctx.fillStyle = "black";
        ctx.fillText("HighScore: 0", (canvas.width/2) - 500, 50);
    }
    else
    {
        ctx.font = "36px serif";
        ctx.fillStyle = "black";
        ctx.fillText("HighScore: ", (canvas.width/2) - 500, 50);
    }
}

function drawTimer()
{
    ctx.font = "48px serif";
    if(seconds < 60 && seconds >= 0)
    {
        if(seconds < 4)
        {
            ctx.fillStyle = "red";
            ctx.fillText("" + seconds, (canvas.width/2) - 50, 50);
        }
        else
        {
            ctx.fillStyle = "black";
            ctx.fillText("" + seconds, (canvas.width/2) - 50, 50);
        }
    }
    else
    {
        {
            ctx.fillStyle = "black";
            ctx.fillText("0" + seconds, (canvas.width/2) - 50, 50);
        }
    }
}

function drawPoints()
{
    ctx.font = "36px serif"
    ctx.fillStyle = "black";
    ctx.fillText("Score:" + score, (canvas.width/2) + 300, 50)
    
}


function drawNumber()
{
    
}
function grid()
{
    
    for (i=1;i<9;i++)
    {
        
    }
}

function main()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawTimer();
    drawPoints();
    drawHighScore();
    requestAnimationFrame(main);
}


setInterval(timer, 1000);

main();

