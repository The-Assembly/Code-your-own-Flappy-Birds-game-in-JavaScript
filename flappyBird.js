var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");


var bird  =  new Image();
var bg  =  new Image();
var fg  =  new Image();
var p1  =  new Image();
var p2  =  new Image();

bird.src = "images/bird.png";
bg.src = "images/bg.png";
fg.src = "images/fg.png";
p1.src = "images/pipeNorth.png";
p2.src = "images/pipeSouth.png";


var gap = 85;
var birdX = 10;
var birdY = 150;
var constant;
var gravity = 1.5;
var score = 0;


var fly_sound = new Audio();
var score_sound = new Audio();

fly_sound.src = "sounds/fly.mp3";
score_sound.src = "sounds/score.mp3";

document.addEventListener("keydown",moveUp);

function moveUp(){
    birdY -= 25;
    fly_sound.play();
}

var pipe = [];

pipe[0] = {
    x : canvas.width,
    y : 0
};


function draw(){
    context.drawImage(bg,0,0);

    for(var i = 0; i < pipe.length; i++){
        constant = p1.height + gap;
        context.drawImage(p1,pipe[i].x, pipe[i].y);
        context.drawImage(p2, pipe[i].x, pipe[i].y+constant);

        pipe[i].x--;

        if(pipe[i].x == 125){
            pipe.push({
                x : canvas.width,
                y : Math.floor(Math.random()*p1.height)-p1.height
            });
        }

        if(birdX + bird.width >= pipe[i].x && birdX <= pipe[i].x + p1.width && (birdY <= pipe[i].y + p1.height || birdY+bird.height >= pipe[i].y + constant) || birdY + bird.height >= canvas.height-fg.height){
            location.reload();
        }

        if(pipe[i].x == 5){
            score++;
            score_sound.play();
        }

    }

    context.drawImage(fg,0,canvas.height - fg.height);
    context.drawImage(bird,birdX,birdY);
    birdY += gravity;

    context.fillStyle = "#000";
    context.font = "20px Verdana";

    context.fillText("Score : " + score, 10, canvas.height-20)

    requestAnimationFrame(draw);

}

draw();