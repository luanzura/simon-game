let gamePattern = [];
const buttonColours = ['red', 'blue', 'green', 'yellow'];
let level = 0;
let index = 0;

function nextSequence() {
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    for (let i = 0; i < gamePattern.length; i++) {
        setTimeout(function() {
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
            playSound(gamePattern[i]);
        }, i * 1000);
    }
};

function playSound(colour) {
    let audio = new Audio('sounds/' + colour + '.mp3');
    audio.play();
};

//START GAME
$(document).ready(function() {
    $(document).keypress(function(event) {
        if (level < 1) {
            nextSequence();
            level++;
            $("#level-title").text("Nível " + level);
            $("body").css("background-color", "#011F3F");
            $("#game-over").text("");
        };    
    });
});

$(".btn").click(function () {
    let botaoClicado = $(this).attr("id");
    
    if (botaoClicado === gamePattern[index]) {
        playSound(botaoClicado);
        $("#" + gamePattern[index]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        index++;
        if (index === gamePattern.length) {
            index = 0;
            setTimeout(function() {
                nextSequence();
                level++;
                $("#level-title").text("Nível " + level);
            }, 1000);
        }
    } else {
        $("#game-over").text("Você perdeu!");
        playSound("wrong");
        $("#level-title").text("Pressione uma tecla para começar");
        index = 0;
        level = 0;
        gamePattern = [];
        $("body").css("background-color", "rgb(179, 0, 0)");
    }
});
