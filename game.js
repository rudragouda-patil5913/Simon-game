
var butttonColours = ["red","blue","green","yellow"];

var gamePattern = [];
var userClickPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");

  userClickPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickPattern.length-1);

//  console.log(userClickPattern);
});

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){
      console.log("success");

      if (userClickPattern.length === gamePattern.length){
        setTimeout(function (){
          nextSequence();
          },1000);
      }

    } else {
      console.log("wrong");
      playWrongSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function (){
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
    }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".wav");
  audio.play();
}

function playWrongSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}


function nextSequence(){
  userClickPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 3) + 1;
  var randomChoosenColour = butttonColours[randomNumber];
  gamePattern.push(randomChoosenColour);

  $("#" + randomChoosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoosenColour);

}

function animatePress(currentColour){
 $("#" + currentColour).addClass("pressed");
 setTimeout(function(){
   $("#" + currentColour).removeClass("pressed");
 }, 100);

}
