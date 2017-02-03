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
  document.getElementById('time').focus();
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

  //hide pause button
  document.getElementById('pause').style.display = 'none';

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
    document.getElementById('time').focus();
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
      document.getElementById('time').focus();
      //show start and hide reset and pause
      document.getElementById('start').style.display = 'inline';
      document.getElementById('pause').style.display = 'none';  
      document.getElementById('reset').style.display = 'none';  
      //reset title
      document.title = 'Pomodoro - Productivity Timer';
      //reset timer back to 25
      document.getElementById('time').value = 25;            
      //update counter
      afterSessionEnds();
    }
  }
  //run first to remove delay
  updateClock();  

  //now tick!
  intervalHandle = setInterval(updateClock,1000);
};

var afterSessionEnds = function (){
  
  //audio for when timer stops
  var alarm = new Audio('../../dist/musicbox.mp3');
  alarm.addEventListener('ended', function(){
    this.currentTime= 0;
    this.play();
  });
  alarm.play();

  //Update Counter, only when not on break
  var countDisplay = document.getElementById('counter');
  console.log(isBreak);
  //if checkbox isn't checked
  if(!isBreak){    
    counter += 1;
    console.log(counter + ' session');    
    countDisplay.innerHTML = '#' + counter;
    alertify.alert('<span class="msg-header">Break Time!</span>Make sure to <em>toggle the switch to break</em> so it doesn\'t get counted as a session!');
  }else {    
    document.getElementById('time').value = 5;  
    alertify.alert('<span class="msg-header">Back to Work!</span>Make sure to <em>toggle the switch back to session</em> so it gets counted as a session.');
  }  

  //stop audio when alertBtn is clicked
  document.getElementById('alertBtn').onclick = function(){
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
    //change body background color
    document.body.className = 'green';
    //reset clock if it's running when switched
    resetCountdown();
    //set timer value to 5 (minutes)
    document.getElementById('time').value = 5;      
    //if you had four sessions, time for a long break
    if (counter >= 4) {
      document.getElementById('time').value = 15;  
    }
  }else {
    //unchecked
    isBreak = checkbox.checked;
    document.body.className = 'red';

    //reset countdown if running
    resetCountdown();

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

  //set body background color to red
  document.body.className = 'red';
  
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

  document.getElementById('buttons').appendChild(pauseButton);
  document.getElementById('buttons').appendChild(startButton);
  document.getElementById('buttons').appendChild(resetButton);

  //show instructions on onload
  var instructions = '<div class="instructions"><h1>Welcome!</h1><p>If you\'ve never used a pomodoro technique before, here are a few instructions:</p><ul><li>Set the timer to 15-25 minutes and start working</li><li>Take a 3-5 min. break after each session.<em> Make sure to switch the toggle to break!</em></li><li>After 4 sessions, (there\'s a counter on the upper right-hand corner), take a 15 minute break</li><li>Repeat as many times as you want!</li></ul></div>';
  alertify.alert(instructions);

  //make instructions available by clicking on the question mark
  document.querySelector('.faq').onclick = function(){
    alertify.alert(instructions);
  };
    
};

