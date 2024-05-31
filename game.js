let gamePattern = [];
let userClickedPattern = [];
let sequenceCalled = false;
let level = 0;

let buttonColours = ["red", "blue", "green", "yellow"];

firstKeyPress();

for (let i = 0; i < buttonColours.length; i++) {
    let colour = buttonColours[i];
    $("#" + colour).on("click", function () {
        if (sequenceCalled) {
            let userChosenColour = colour;
            userClickedPattern.push(userChosenColour);

            buttonAnimation(userChosenColour);
            playSound(userChosenColour);

            checkAnswer(userClickedPattern.length - 1);
        }
    });
}

function buttonAnimation(colour) {
    $("#" + colour).addClass('pressed');
    setTimeout(function () {
        $("#" + colour).removeClass('pressed');
    }, 200);

    $("#" + colour).fadeOut(100).fadeIn(100);
}

function playSound(colour) {
    let audio = new Audio("sounds/" + colour + ".mp3");
    audio.play();
}

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    buttonAnimation(randomChosenColour);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        playSound("sounds/wrong.mp3");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function firstKeyPress() {
    $(document).keydown(function () {
        if (!sequenceCalled) {
            $("#level-title").text("Level " + level);
            sequenceCalled = true;
            nextSequence();
        }
    });
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    sequenceCalled = false;
    firstKeyPress();
}
