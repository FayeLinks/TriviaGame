$(document).ready(function(){
    $("#remaining-time").hide();
    $("#submit").hide();
    $("#remaining-time").text("Time Left: 0:00");
    $("#start").on("click",startClock);
    $('#start').click(function(){
        $("#remaining-time").show();
        $("#submit").show();
        $("#start").hide();
        $(document).on("click", ".option", trivia.guessChecker);
     });
});

var intervalID;

var clockRunning = false;
var time = 10;

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

}
// EVERYTHING UP TO HERE IS WORKING AS IT SHOULD BE



// Trivia properties
var trivia ={
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,

    // Questions
questions: {
    q1: "What year was the abacus, the first known calculator, invented?",
    q2: "What year was gunpowder invented in China?",
    q3: "What year was the pocket watch invented?",
    q4: "What year was the Steam Locomotive invented?",
    q5: "What two inventions were created in 1835 AD?",
    q6: "What item did Laszlo Biro invent?"

},

// Options Array for Answers
options: {
    q1: ["1300 AD", "1500 AD", "2400 BC", "1500 BC"],
    q2: ["800 AD", "1100 AD", "1400 AD", "1700 AD"],
    q3: ["1753 AD", "1688 AD", "1849 AD", "1510 AD"],
    q4: ["1698 AD", "1712 AD", "1820 AD", "1902 AD"],
    q5: ["", "", "", "Morse Code & the Revolver"],
    q6: ["Hide-Away Bed", "Instant Coffee", "Ballpoint Pen", "Oxi-Clean"],
},

// Correct Answers
answers: {
    q1: "2400 BC",
    q2: "800 AD",
    q3: "1510 AD",
    q4: "1698 AD",
    q5: "Morse Code and the Revolver",
    q6: "ballpoint pen",
},

// Start Function to begin game
// $("#start").on("click", startGame);

startGame: function(){
    // restarting game results
    trivia.currentSet = 0;
    trivia.correct = 0;
    trivia.incorrect = 0;
    trivia.unanswered = 0;
    clearInterval(trivia.timerId);
    
    // show game section
    $('#game').show();
    
    //  empty last results
    $('#results').html('');
    
    // show timer
    $('#timer').text(trivia.timer);
    
    // remove start button
    $('#start').hide();

    $('#remaining-time').show();
    
    // ask first question
    trivia.nextQuestion();
    
  },
  // method to loop through and display questions and options 
  nextQuestion : function(){
    
    // set timer to 20 seconds each question
    trivia.timer = 10;
     $('#timer').removeClass('last-seconds');
    $('#timer').text(trivia.timer);
    
    // to prevent timer speed up
    if(!trivia.timerOn){
      trivia.timerId = setInterval(trivia.timerRunning, 1000);
    }
    
    // gets all the questions then indexes the current questions
    var questionContent = Object.values(trivia.questions)[trivia.currentSet];
    $('#question').text(questionContent);
    
    // an array of all the user options for the current question
    var questionOptions = Object.values(trivia.options)[trivia.currentSet];
    
    // creates all the trivia guess options in the html
    $.each(questionOptions, function(index, key){
      $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
    })
    
  },
  // method to decrement counter and count unanswered if timer runs out
  timerRunning : function(){
    // if timer still has time left and there are still questions left to ask
    if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
      $('#timer').text(trivia.timer);
      trivia.timer--;
        if(trivia.timer === 4){
          $('#timer').addClass('last-seconds');
        }
    }
    // the time has run out and increment unanswered, run result
    else if(trivia.timer === -1){
      trivia.unanswered++;
      trivia.result = false;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
    }
    // if all the questions have been shown end the game, show results
    else if(trivia.currentSet === Object.keys(trivia.questions).length){
      
      // adds results of game (correct, incorrect, unanswered) to the page
      $('#results')
        .html('<h3>Thank you for playing!</h3>'+
        '<p>Correct: '+ trivia.correct +'</p>'+
        '<p>Incorrect: '+ trivia.incorrect +'</p>'+
        '<p>Unaswered: '+ trivia.unanswered +'</p>'+
        '<p>Please play again!</p>');
      
      // hide game sction
      $('#game').hide();
      
      // show start button to begin a new game
      $('#start').show();
    }
    
  },
  // method to evaluate the option clicked
  guessChecker : function() {
    
    // timer ID for gameResult setTimeout
    var resultId;
    
    // the answer to the current question being asked
    var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
    
    // if the text of the option picked matches the answer of the current question, increment correct
    if($(this).text() === currentAnswer){
      // turn button green for correct
      $(this).addClass('btn-success').removeClass('btn-info');
      
      trivia.correct++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Correct Answer!</h3>');
    }
    // else the user picked the wrong option, increment incorrect
    else{
      // turn button clicked red for incorrect
      $(this).addClass('btn-danger').removeClass('btn-info');
      
      trivia.incorrect++;
      clearInterval(trivia.timerId);
      resultId = setTimeout(trivia.guessResult, 1000);
      $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
    }
    
  },
  // method to remove previous question results and options
  guessResult : function(){
    
    // increment to next question set
    trivia.currentSet++;
    
    // remove the options and results
    $('.option').remove();
    $('#results h3').remove();
    
    // begin next question
    trivia.nextQuestion();
     
  }
// startGame: function(){
//     // restarting game results
//     trivia.currentSet = 0;
//     trivia.correct = 0;
//     trivia.incorrect = 0;
//     trivia.unanswered = 0;
//     clearInterval(trivia.timerId);
    
//     // show game section
//     $('#game').show();
    
//     //  empty last results
//     $('#results').html('');
//     console.log("#results");

// // Create Timer to count Down when button is selected

// // Create reset function when timer counts down or when the user answers all the questions

// // Create a function that checks the user answer array against the correct answer
//  // gets all the questions then indexes the current questions
//  var questionContent = Object.values(trivia.questions)[trivia.currentSet];
//  $('#question').text(questionContent);
 
//  // an array of all the user options for the current question
//  var questionOptions = Object.values(trivia.options)[trivia.currentSet];
 
//  // creates all the trivia guess options in the html
//  $.each(questionOptions, function(index, key){
//    $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
//  })
 
// },     


}



// Questions:
// 2400 BC	The abacus, the first known calculator, was invented in Babylonia
// 	800s	Gunpowder in China
// 	1510	Pocket watch was invented by  Peter Henlein
// 	1593	Thermometer was invented by  Galileo Galilei
// 	1698	Steam engine was invented by  Thomas Savery
// 	1814	Steam Locomotive (Blucher) was invented by  George Stephenson
// 	1830	Lawn mower was invented by  Edwin Beard Budding

// 	1835	Morse code was invented by  Samuel Morse
// Revolver was invented by Samuel Colt

// 1842	Anaesthesia was invented by  Crawford Long

// 1895	Diesel engine was invented by  Rudolf Diesel
// Radio signals were invented by Guglielmo Marconi

// 	1928	Antibiotics were invented by  Alexander Fleming
// 1937	Jet engine was invented by  Frank Whittle and Hans von Ohain
// 	1938	Ballpoint pen was invented by  Laszlo Biro
// 1946	Microwave oven was invented by  Percy Spencer

// 	1967	Automatic Teller Machine (ATM) was invented by  John Shepherd-Barron
// Hypertext was invented by Andries van Dam and Ted Nelson

// 1971	E-mail was invented by  Ray Tomlinson
// Liquid Crystal Display was invented by James Fergason
// Pocket calculator was invented by Sharp Corporation
// Floppy Disk was invented by David Noble with IMDB