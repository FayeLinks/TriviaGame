# Trivia Game

## Test your knowledge about famous inventions that changed the course of human history. This game contains a countdown timer that will automatically show the user correct guesses and score once the clock hits zero. 


## Check it out!: 
[Open Here](https://fayelinks.github.io/TriviaGame/ "Trivia Game")

## Code Example:

``` 
$(document).ready(function(){
    $("#remaining-time").hide();
    $("#form").hide();
    $("#remaining-time").text("Time Left: 0:00");
    $("#start").on("click",startClock);
    $('#start').click(function(){
        $("#remaining-time").show();
        $("#form").show();
        $("#start").hide();
     });
});

var intervalID;

var clockRunning = false;
var time = 30;

function startClock() {
    if (!clockRunning) {
        intervalID = setInterval(count, 1000);
        clockRunning = true;
    }
}
```

## Built With:
* HTML
* Javascript
* JQuery
* CSS
* Momentjs


## Future Development: 
> Add different trivia catagories that players can choose from

> Add multiplayer function so multiple people can compete against each other

> Add a feature that adds time back to the counter if the user answers several questions right in a sequence.

## Authors: 
* Alison Kelly
