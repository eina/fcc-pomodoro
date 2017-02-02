//global variables
var intervalHandle,
    isPaused,
    deadline;


var resetCountdown = function(){
  //clear intervalHandle
  clearInterval(intervalHandle);
  //set deadline to current time
  deadline = new Date();
  //input field enable
  document.getElementById('time').disabled = false;
  //set back to 25
  document.getElementById('time').value = 25;
  //hide reset button and show start button
  document.getElementById('start').style.display = 'inline';
  document.getElementById('reset').style.display = 'none';
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

  //show reset button and hide start button
  document.getElementById('start').style.display = 'none';
  document.getElementById('reset').style.display = 'inline';

  //now countdown to deadline
  tick(deadline);

};

//clock countdown function
var tick = function(endtime){
  var updateClock = function(){
    //grab input field
    var time = document.getElementById('time');
    
    //grab time remaining based off deadline
    var t = grabTimeRemaining(endtime);
    
    //concatenate
    time.value = t.minutes + ':' + t.seconds;  
    
    //leading 0's
    if(t.seconds < 10){ 
      time.value = t.minutes + ':0' + t.seconds;  
    }

    //stop clock once it hits 0
    if(t.total <= 0){
      clearInterval(intervalHandle);
    }
  }
  //run first to remove delay
  updateClock();  
  //now tick
  intervalHandle = setInterval(updateClock,1000);
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

