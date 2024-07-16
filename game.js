var user_clicked_pattern = [];
var game_pattern = [];
var button_colors = ["red", "green", "blue", "yellow"];

var level = 0;
var started = false;

$(document).keypress(function(){

    if(!started){

        $("#level-title").text("Level " + level);
        nextsequence();
        started = true;
    }
})

$(".btn").click( function(){

    var userChosenColour = $(this).attr("id");
    user_clicked_pattern.push(userChosenColour);
    

    playSound(userChosenColour);
    animatePress(userChosenColour);
    check_answer(user_clicked_pattern.length - 1);
    
})

function check_answer(current_level){

    if(game_pattern[current_level] == user_clicked_pattern[current_level]){

        if(game_pattern.length == user_clicked_pattern.length){

            // console.log("success");

            setTimeout(function(){
                nextsequence();
            }, 1000);
        }
    }
    else{

        $("#level-title").text("Game Over, Press Any Key to Restart");

        var wrong_ans = new Audio("sounds/wrong.mp3");
        wrong_ans.play();

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200)

        startOver();
        // console.log("wrong");
    }
}

function startOver(){

    level = 0;
    started = false;
    game_pattern = [];
}

function nextsequence(){

    user_clicked_pattern = [];

    level++;

    $("#level-title").text("Level " + level);
    
    var random_number = Math.floor(Math.random()*3);
    var randomChosenColour = button_colors[random_number];
    game_pattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name){

    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor){

    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
      }, 100);
}