
var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern= [];
var gamePattern= [];

var check =false;
var level = 0 ;

// $("document").on("keydown",function(){
//     if(check===false){
//     var randomNumber= nextSequence();
//     check= true;

//     $("#level-title").text("level 0");
//     }
// })

$(document).keypress(function() {
    if (!check) {
      $("#level-title").text("Level " + level);
      nextSequence();
     check = true;
    }
  });






  $(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
  
    playsound(userChosenColour);
    animatePress(userChosenColour);
  
    checkAnswer(userClickedPattern.length-1);
  });



// document.querySelectorAll("button").addEventListener("click",function(){
//   var userChosenColour= this.getAttribute("id");
//   userClickedPattern.push(userChosenColour);
  
//   playsound(userChosenColour);
//   animatePress(userChosenColour);

//   checkAnswer(userChosenColour.length -1);

// });







// check array function 
function checkAnswer(currentLevel){

if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    if(userClickedPattern.length === gamePattern.length){
        setTimeout(function(){
            nextSequence();
        }, 1000);
    }
}   else{
    
    // var wrg = new Audio(sounds/wrong.mp3);
    // wrg.play();
    playsound("wrong");

    $("body").addClass("game-over");
    
    // setTimeout($("body").removeClass("game-over"), 200);
    $("#level-title").text("Game Over, Please refresh to Restart again");

    setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);
    

    startOver();
   }

}



// next function
function nextSequence(){

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playsound(randomChosenColour);

 }



// sound function
function playsound(name){
    switch(name){
        case "red":
        var red= new Audio("sounds/red.mp3");
        red.play();
        break;
        
        case "blue":
            var blue= new Audio("sounds/blue.mp3");
            blue.play();
            break;

        case "green":
                var green= new Audio("sounds/green.mp3");
                green.play();
        break;    
        
        case "yellow":
            var yellow= new Audio("sounds/yellow.mp3");
            yellow.play();
            break;

        case "wrong":
                var wg= new Audio("sounds/wrong.mp3");
                wg.play();
                break;    

        // default:
        //     var sound= new Audio(sounds/wrong.mp3);   
        //     sound.play(); 
    }
}


// animation function
function animatePress(currentcolor){
     
    $("#"+ currentcolor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentcolor).removeClass("pressed");
    }, 100);
}


// restart function
function startOver(){
    level = 0;
    check = false;
    gamepattern = [];

}