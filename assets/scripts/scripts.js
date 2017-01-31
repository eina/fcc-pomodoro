var secondsRemaining,
    intervalHandle,
    isPaused = false;

    //TODO: FIX NaN:NaN issue???


function tick(){
  //hide start button
  document.getElementById('start').style.display = 'none';
  //show reset button 
  document.getElementById('reset').style.display = 'inline';  

  //grab time
  var timeDisplay = document.getElementById('time');

  //time variables
  var min,
      sec;

  //if the clock isn't paused
  // if(!isPaused){
    //turn into mm:ss format
    min = Math.floor(secondsRemaining / 60);
    sec = secondsRemaining - (min * 60);

    //leading zero
    if(sec < 10){
      sec = '0' + sec;    
    }

    //concatenate
    var timeRemaining = min + ':' + sec;
    //output to input#time
    timeDisplay.value = timeRemaining;

  // }
  

  //stop if secondsRemaining === 0
  if(secondsRemaining === 0){
    console.log('Done!');
    clearInterval(intervalHandle);
    //TODO: do something when it stops
  }

  //decrease count from start
  secondsRemaining--;
  
}

function resetCountdown() {
  clearInterval(intervalHandle);
  //show start button 
  document.getElementById('start').style.display = 'inline';  
  //hide reset button 
  document.getElementById('reset').style.display = 'none';  

  //set time back to 25 minutes
  document.getElementById('time').value = 25;  
}

function pauseCountdown(){
  // console.log('you pressed pause');

  //stop the timer
  clearInterval(intervalHandle);
  isPaused = true;
  document.getElementById('start').style.display = 'inline';
}


function startCountdown(){
  //grab the time from input 
  grabTime();
  var minutes = grabTime();
  console.log(minutes);

  //check return value
    // check if not a number
    if (isNaN(minutes)) {
        alert("Please enter a number!");
        return;
    }

  
  //convert minutes to seconds to start countdown
  secondsRemaining = minutes * 60;
  
  
  //call the tick function every second
  intervalHandle = setInterval(tick, 1000);

  //disable time input
  document.getElementById('time').disabled = true;  

}


// grab time & check if it's proper format
function grabTime(){  
  var minutes = document.getElementById('time').value;
  //check if minutes has values that aren't 0-9 or :
  // var isTimeFormat = /^[0-5]?[0-9]((:)?[0-5][0-9])?$/.test(minutes);
  
  //check if proper time format/number or not
  return isNaN(minutes)? false : minutes;
}

//set pomodoro clock to 25:00 when page loads
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

