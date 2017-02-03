/*
  POMODORO CLOCK, a project for freeCodeCamp
  Author: Eina Onting (eina.ca)
*/

//global variables
var intervalHandle,
    deadline,
    counter = 0,    
    isBreak, 
    breakToggle = document.getElementById('breakToggle');

var resetCountdown = function(){
  //clear intervalHandle
  clearInterval(intervalHandle);
  //set deadline to current time
  deadline = new Date();
  //input field enable
  document.getElementById('time').disabled = false;
  //set back to 25
  document.getElementById('time').value = 25;
  //hide reset and pause button and show start button
  document.getElementById('start').style.display = 'inline';
  document.getElementById('start').innerHTML = 'Start';
  document.getElementById('start').onclick = startCountdown;
  document.getElementById('reset').style.display = 'none';
  document.getElementById('pause').style.display = 'none';
};

var pauseCountdown = function(){
  //clear intervalHandle
  clearInterval(intervalHandle);

  //Start becomes visible and renamed to Continue
  var startBtn = document.getElementById('start');
  startBtn.innerHTML= 'Continue';
  startBtn.style.display = 'inline';

};

//start timer
var startCountdown = function(){
  //grab user input
  var timer = document.getElementById('time').value;
  
  //disable input field
  document.getElementById('time').disabled = true;

  //format mm:ss -> mm.ss
  timeFormat = /^[0-5]?[0-9]:[0-5][0-9]$/.test(timer);

  if(timeFormat){
    var timerArr = timer.split(':');
    //grab the ss and change to decimal value
    var secs = (timerArr[1]/60).toFixed(2) * 1;
    //convert mm:ss -> mm.ss by adding mm & ss
    var timer = +timerArr[0] + secs;
  }

  if(isNaN(timer) && !timeFormat){
    //TODO: create more user friendly announcement, tooltip?
    console.log('enter a number in this format mm, mm:ss, or mm.ss');
    //enable so user can input time again
    document.getElementById('time').disabled = false;
    return;
  }

  //grab current time
  var currentTime = new Date();
  //set the deadline by adding 'timer' to get future date
  deadline = new Date(currentTime.getTime() + (timer * 60 * 1000));

  console.log('current time', currentTime);
  console.log('deadline', deadline);

  //show reset and pause button and hide start button
  document.getElementById('start').style.display = 'none';
  document.getElementById('pause').style.display = 'inline';
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

    //show on <title>
    document.title = '(' + time.value + ') Pomodoro - Productivity Timer';

    //stop clock once it hits 0
    if(t.total <= 0){
      clearInterval(intervalHandle);
      //reenable input
      document.getElementById('time').disabled = false;
      //show start and hide reset
      document.getElementById('start').style.display = 'inline';
      document.getElementById('reset').style.display = 'none';  

      //pop up
      // alertify.alert('TIME\'S UP BITCH');
      
      //update counter
      afterSessionEnds();
    }
  }
  //run first to remove delay
  updateClock();  

  //now tick!
  intervalHandle = setInterval(updateClock,1000);
};

/** TODO:
 * 1. add audio (musicbox.mp3)
 * 2. play when timer ends
 * 3. loop until #alertBtn is clicked
 */

var afterSessionEnds = function (){
  
  //audio for when timer stops
  var alarm = new Audio('../../dist/musicbox.mp3');
  alarm.addEventListener('ended', function(){
    this.currentTime= 0;
    this.play();
  });
  alarm.play();

  var countDisplay = document.getElementById('counter');
  //update counter if not break
  console.log(isBreak);
  //if checkbox isn't checked
  if(!isBreak){    
    counter += 1;
    console.log(counter + ' session');    
    countDisplay.innerHTML = counter;
    alertify.alert('WHOO BREAK TIME');
  }else {
    document.getElementById('time').value = 5;  
    alertify.alert('GET BACK TO WORK');
  }  

  //stop audio when alertBtn is clicked
  document.getElementById('alertBtn').onclick = function(){
    console.log('closed modal!');
    alarm.pause();
  };

  //reset counter when it reaches 4
  if (counter >= 4) {
    counter = 0;    
  }
};

//detect if checkbox is checked or unchecked
var clickBreakToggle = function(event){
  var checkbox = event.target;

  if(checkbox.checked){
    //checked
    isBreak = checkbox.checked;
    //set timer value to 5 (minutes)
    document.getElementById('time').value = 5;      
    //if you had four sessions, time for a long break
    if (counter >= 4) {
      document.getElementById('time').value = 15;  
    }
  }else {
    //unchecked
    isBreak = checkbox.checked;
    //TODO: improve this feature later on
    //set timer value to 25 (minutes)
    document.getElementById('time').value = 25;     
  }
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

  //attach click event on breakToggle
  breakToggle.onclick = clickBreakToggle;

  //create pause button
  var pauseButton = document.createElement('button');
  pauseButton.setAttribute('id', 'pause');
  pauseButton.innerHTML = "Pause";  
  pauseButton.onclick = pauseCountdown;      
  //hide pauseButton onload
  pauseButton.style.display = 'none';

  //create start button
  var startButton = document.createElement('button');
  startButton.setAttribute('id', 'start');
  startButton.innerHTML = "Start";  
  startButton.onclick = startCountdown;  

  //create reset button
  var resetButton = document.createElement('button');
  resetButton.setAttribute('id', 'reset');
  resetButton.innerHTML = "Reset";  
  resetButton.onclick = resetCountdown;  
  //hide reset button onload 
  resetButton.style.display = 'none';

  document.getElementById('clock').appendChild(pauseButton);
  document.getElementById('clock').appendChild(startButton);
  document.getElementById('clock').appendChild(resetButton);
    
};

