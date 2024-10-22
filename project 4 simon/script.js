
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern=[];
var started = false;
var level = 0;
var userChosenColour;
var randomChosenColour = [];

$(document).keypress(function(){
    if(!started){
        $("#level-tittle").text("level " + level);
        setTimeout(function(){
            nextSequence();
        },1000);
        started = true;
    }
})

$("button").on("click",function(){
    userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})
function checkAnswer(choosen){
    if(userClickedPattern[choosen] === gamePattern[choosen]){
        if(userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        $("button").addClass("game-over");
        setTimeout(function(){
            $("button").removeClass("game-over");
        },100);
        playSound("wrong");
        $("#level-tittle").text("Game Over, Press any key to restart");
        level = 0;
        started = false;
        gamePattern = [];
    }
}

function nextSequence(){
    $("#level-tittle").text("level " + level);
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    level++;
}
function playSound(sound){
    var audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}
function animatePress(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}