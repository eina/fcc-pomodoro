//global variables
var intervalHandle,
    isPaused,
    deadline;


var resetCountdown = function(){

};
var pauseCountdown = function(){};

//start timer
var startCountdown = function(){
  //grab user input
  var timer = document.getElementById('time').value;
  
  //disable input field
  document.getElementById('time').disabled = true;
  /*
  TODO:
  1. Check if timer isNaN
  2. Test it with pauseCountdown();
  */

  //grab current time
  var currentTime = new Date();
  //set the deadline by adding 'timer' to get future date
  deadline = new Date(currentTime.getTime() + (timer * 60 * 1000));

  console.log('current time', currentTime);
  console.log('deadline', deadline);

  //now countdown to deadline
  tick('time', deadline);
};

//clock countdown function
var tick = function(id, endtime){
  //grab input field for time display
  var clock = document.getElementById(id);

  var update = function(){
    var t = grabTimeRemaining(endtime);
    //concatenate 
    clock.value = t.minutes + ':' + t.seconds;
    //leading zero for seconds
    if(t.seconds < 10){
      clock.value = t.minutes + ':0' + t.seconds;
    }
    //once it reaches 0, stop the clock
    if(t.total <= 0){
      clearInterval(intervalHandle);
      document.getElementById('start').style.display = 'none';
      document.getElementById('reset').style.display = 'inline';
    }    
  };
  //run first to avoid delay
  update();

  var intervalHandle = setInterval(update, 1000);
};

//calculate remaining time
var grabTimeRemaining = function(endtime){
  //hold remaining time until 'deadline'
  var t = Date.parse(endtime) - Date.parse(new Date());
  //convert to usable format
  var seconds = Math.floor( (t/1000) % 60 );
  var minutes = Math.floor( (t/1000/60) % 60 );
  var hours = Math.floor( (t/(1000*60*60)) % 24);
  //output
  return {
    'total': t,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  }
};

window.onload = function(){
  
  //set time to 25 minutes
  document.getElementById('time').value = 25;  

  //create pause button
  var pauseButton = document.createElement('button');
  pauseButton.innerText = "Pause";  
  pauseButton.onclick = pauseCountdown;      

  //create start button
  var startButton = document.createElement('button');
  startButton.setAttribute('id', 'start');
  startButton.innerText = "Start";  
  startButton.onclick = startCountdown;  

  //create reset button
  var resetButton = document.createElement('button');
  resetButton.setAttribute('id', 'reset');
  resetButton.innerText = "Reset";  
  resetButton.onclick = resetCountdown;  
  //hide reset button onload 
  resetButton.style.display = 'none';

  document.getElementById('clock').appendChild(pauseButton);
  document.getElementById('clock').appendChild(startButton);
  document.getElementById('clock').appendChild(resetButton);
    
};

