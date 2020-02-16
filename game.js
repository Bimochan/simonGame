var gamePattern = [];

var buttonColor = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

var once = false;

var level = 0;

$(document).bind("keypress click",  function() {
  if (!once) {
    // Do something only for the first key press
    $('h1').text("LEVEL " + level);
    nextSequence();
    once = true;
  }
});


// creating a function to animate the random coloured Button
// And to play sound
//------------------------------------------------------------------------------

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColor[randomNumber];
  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

}
//------------------------------------------------------------------------------
// detecting if a Button is clicked
// And Printing out the id of the button which was clicked
//------------------------------------------------------------------------------

$(".btn").click(function(event) {

  var userChosenColor = event.target.id;
  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);
  // the -1 is for the length of the array because array starts at 0
  checkAnswer(userClickedPattern.length - 1);

});
//------------------------------------------------------------------------------
// plays the sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
// This animate the Button which is pressed by th user
function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  // This function should be called in order to remove the effect of the
  // CSS class "pressed"… If it isn't removed the color of the Button will
  // be remain the same as defined as in the "pressed" CSS element
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
//------------------------------------------------------------------------------
// This is function is to check whether the input pattern of the user
// equal to the game randomized pattern
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel] ){
    if (gamePattern.length == userClickedPattern.length){
      setTimeout(function(){
        nextSequence()
      },100);
    }
  }else{
    playSound("wrong");
    // add and remove the game over effect and change the h1 text to GAME OVER
    $("body").addClass("game-over");
    setTimeout(function(){$("body").removeClass("game-over");},200);
    $("h1").text("GAME OVER. Press any key to Start");
    setTimeout(function(){startOver();},1000);
  }
}
//------------------------------------------------------------------------------
// This function reset all the values to start over again
function startOver() {
  level = 0;
  gamePattern = [];
  once = false;
}


function gameInfo(){
  var info = "lkasflkasöj askdfjaslödkf kasdj lasdfkasj alskgjaslkgjalsk asdlf aölskdj";
  alert ("This is a Memory game.Each button have a each color. In the first level, a button will be blinked and you have to click that button to promoto yourself to a next level. And in the next level, you have to click the button from the all the previous level and the button that blinked just now. And so on till you click the wrong button and GAME OVER!!"  );
}
