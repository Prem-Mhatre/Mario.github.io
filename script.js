var score = 0;
var cross = true;

var music = new Audio("song.mp3");
setTimeout(() => {
    music.play();
}),100;
var gameoverm = new Audio("gameover.mp3");

var jumpm = new Audio("jump.mp3");

var scorem = new Audio("score.mp3");

document.onkeydown = function(e){
    console.log("key code is: ", e.keyCode)
    if(e.keyCode==38){
        var mario = document.querySelector(".mario");
        if(mario.classList == "animateMario"){return}
        mario.classList.add("animateMario");
        setTimeout(() => {
            mario.classList.remove("animateMario");
        },700);
        jumpm.play();
    }

    if(e.keyCode==39){
        var mario = document.querySelector(".mario");
        var mariox = parseInt(window.getComputedStyle(mario, null).getPropertyValue("left"));
        mario.style.left = mariox + 100 + "px";
    }

    if(e.keyCode==37){
        var mario = document.querySelector(".mario");
        var mariox = parseInt(window.getComputedStyle(mario, null).getPropertyValue("left"));
        mario.style.left = mariox - 100 + "px";
    }
}

setInterval(() => {
    var mario = document.querySelector(".mario");
    var gameOver = document.querySelector(".gameover");
    var dragon = document.querySelector(".dragon");

    var mx = parseInt(window.getComputedStyle(mario, null).getPropertyValue("left"));
    var my = parseInt(window.getComputedStyle(mario, null).getPropertyValue("top"));

    var  dx  = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("left"));
    var dy = parseInt(window.getComputedStyle(dragon, null).getPropertyValue("top"));

    var offsetX  = Math.abs(mx-dx);
    var offsetY = Math.abs(my-dy);
    console.log(offsetX, offsetY)
    if(offsetX< 113 & offsetY<52){
        mario.style.visibility = "hidden";
        gameOver.innerHTML = "GAME OVER - reload to start again";
        dragon.classList.remove("dragonani");
        score = 0;
        music.pause();
        gameoverm.play();
    }else if(offsetX< 113 && cross){
        score+=1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
           cross = true; 
        },1000);
        setTimeout(() => {
        var aniDur = parseFloat(window.getComputedStyle(dragon, null).getPropertyValue("animation-duration"));
        var newDur = aniDur - 0.4;
        dragon.style.animationDuration = newDur + "s";
        scorem.play();
        },500);
    }

}, 10);

function updateScore(score){
    document.querySelector(".scoreCount").innerHTML = "Your Score: " + score; 
}