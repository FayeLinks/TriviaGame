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

function count() {
    time--;

    var converted = timeConverter(time);
  
    $("#remaining-time").text("Time Left: " + converted);

    if(time<=0){
        $("#remaining-time").text("Time's Up!");
        // STOP THE QUIZ FUNCTION HERE IF TIME IS UP AND BRING TO RESULTS PAGE

  }
  function timeConverter(t) {
  
    var minutes = Math.floor(t / 60);
    var seconds = t - (minutes * 60);
  
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
  
    if (minutes === 0) {
      minutes = "00";
    }
    else if (minutes < 10) {
      minutes = " " + minutes;
    }
  
    return minutes + ":" + seconds;
  }

// I was unable to get the below portion to work correctly as input was not defined
  $("input[name=abacus]:checked").val();
  console.log(input);

}
