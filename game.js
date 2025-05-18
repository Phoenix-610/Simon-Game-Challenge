// Game Variables
const buttonColors = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let gamePattern = [];
let isGameStarted = false;
let level = 0;

// DOM Ready
$(document).ready(function() {
  // Set initial button states
  $("#restart-btn").prop("disabled", true);
  
  // Handle keyboard input for desktop
  $(document).keypress(function(event) {
    if (!isGameStarted && (event.key === "a" || event.key === "A")) {
      startGame();
    }
  });

  // Start button handler
  $("#start-btn").click(function() {
    if (!isGameStarted) {
      startGame();
    }
  });

  // Restart button handler
  $("#restart-btn").click(function() {
    if (isGameStarted) {
      restartGame();
    }
  });

  // Button click handlers
  $(".btn").click(function() {
    if (isGameStarted) {
      const userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      
      playSound(userChosenColor);
      animatePress(userChosenColor);
      
      checkAnswer(userClickedPattern.length - 1);
    }
  });

  // Touch events for mobile
  $(".btn").on("touchstart", function(e) {
    e.preventDefault(); // Prevent default behavior
    if (isGameStarted) {
      const userChosenColor = $(this).attr("id");
      userClickedPattern.push(userChosenColor);
      
      playSound(userChosenColor);
      animatePress(userChosenColor);
      
      checkAnswer(userClickedPattern.length - 1);
    }
  });
});

// Game Functions
function startGame() {
  isGameStarted = true;
  level = 0;
  gamePattern = [];
  
  // Update button states
  $("#start-btn").prop("disabled", true);
  $("#restart-btn").prop("disabled", false);
  
  nextSequence();
}

function restartGame() {
  isGameStarted = false;
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  
  $("#level-title").text("Simon Game");
  
  // Update button states
  $("#start-btn").prop("disabled", false);
  $("#restart-btn").prop("disabled", true);
  
  // Short delay before allowing restart
  setTimeout(function() {
    startGame();
  }, 500);
}

function nextSequence() {
  // Reset user pattern for the next level
  userClickedPattern = [];
  
  // Increase level and update title
  level++;
  $("#level-title").text("Level " + level);
  
  // Generate random color
  const randomNumber = Math.floor(Math.random() * 4);
  const randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  
  // Animate and play sound for the new color
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}

function checkAnswer(currentLevel) {
  // Check if current answer is correct
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    // Check if sequence is complete
    if (userClickedPattern.length === gamePattern.length) {
      // Wait before next sequence
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // Game over
    playSound("wrong");
    
    $("body").addClass("game-over");
    $("#level-title").text("Game Over! Score: " + (level - 1));
    
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    
    // Reset game state
    isGameStarted = false;
    
    // Update button states
    $("#start-btn").prop("disabled", false);
    $("#restart-btn").prop("disabled", true);
  }
}

function playSound(name) {
  // Create an audio object to play the sound
  try {
    const audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
  } catch (error) {
    console.error("Error playing sound:", error);
  }
}

function animatePress(currentColor) {
  // Add and remove pressed class for animation
  $("#" + currentColor).addClass("pressed");
  
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}