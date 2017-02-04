/**
 * POMODORO - PRODUCTIVITY TIMER
 * A project for freeCodeCamp's Front End Certificate
 * by Eina Onting (eina.ca / github.com/thelittleblacksmith)
 */
(function(){
  "use strict";
  var Pomodoro = function(){
    /* VARIABLES */
    var deadline,
        intervalHandle,        
        isBreak;
    var counter = 0;        
    var timeInput = document.getElementById('time');
    var modalText = {
      instructions: '<div class="instructions"><h1>Welcome!</h1><p>If you\'ve never used the pomodoro technique before, here are a few instructions:</p><ul><li>Set the timer to 15-25 minutes and start working</li><li>Take a 3-5 min. break after each session.<em> Make sure to switch the toggle to break!</em></li><li>After 4 sessions, (there\'s a counter on the upper right-hand corner), take a 15 minute break</li><li>Repeat as many times as you want!</li></ul></div>',
      breakTime: '<span class="msg-header">Break Time!</span>Make sure to <em>toggle the switch to break</em> so it doesn\'t get counted as a session!',
      backToWork: '<span class="msg-header">Back to Work!</span>Make sure to <em>toggle the switch back to session</em> so it gets counted as a session.',
      error: 'Oops! Please enter your time in the following format: mm:ss, mm.ss, or mm.'
    };

    /* MAIN COUNTDOWN FUNCTIONS */
    var grabTimeRemaining = function(endtime){
      //how long from startCountdown to deadline
      var t = Date.parse(endtime) - Date.parse(new Date());

      //convert to usable format
      var seconds = Math.floor( (t/1000) % 60);
      var minutes = Math.floor( (t/1000/60) % 60);

      //output
      return {
        'total': t,
        'minutes': minutes,
        'seconds': seconds
      }
    }

    var tick = function(endtime){
      var updateClock = function(){
        //grab time remaining based off deadline
        var t = grabTimeRemaining(endtime);

        //concatenate
        timeInput.value = t.minutes + ':' + t.seconds;

        //leading 0'seconds
        if(t.seconds < 10){
          timeInput.value = t.minutes + ':0' + t.seconds;  
        }

        //show timer on <title>
        document.title = '(' + time.value + ') Pomodoro - Productivity Timer';

        //stop clock once it hits 0
        if(t.total <= 0){
          //reset clock
          reset();
          //update counter
          timeFinished();      
        }
      };      
      //run to remove delay      
      updateClock();
      //now tick!
      intervalHandle = setInterval(updateClock,1000);
    };

    var timeFinished = function(){      
      //play a tune when time's up
      var alarm = new Audio('../../dist/musicbox.mp3');
      alarm.addEventListener('ended', function(){
        this.currentTime= 0;
        this.play();
      });
      alarm.play();      

      //update counter, but only when not on break
      var countDisplay = document.getElementById('counter');
      if(!isBreak){
        counter += 1;
        countDisplay.innerHTML = '#' + counter;
        loadModal(modalText.breakTime);        
        //reset counter to 0 after 4 sessions
        if(counter >= 4){          
          counter = 0;
        }
      }else {
        timeInput.value = 5;
        loadModal(modalText.backToWork);
      }

      //stop audio modal is closed
      document.getElementById('alertBtn').onclick = function(){
        alarm.pause();
        timeInput.focus();
      };
    };

    /* CONTROL BUTTON FUNCTIONS */
    var start = function(){
      //disable input field
      document.getElementById('time').disabled = true;

      // grab user input
      var timer = timeInput.value;

      //validate user input      
      var timeFormat = /^[0-5]?[0-9]:[0-5][0-9]$/.test(timer);

      if(timeFormat){
        var timerArr = timer.split(':');
        //grab the ss and change to decimal value
        var secs = (timerArr[1]/60).toFixed(2) * 1;
        //convert mm:ss -> mm.ss by adding mm & ss
        var timer = +timerArr[0] + secs;
      }

      if(isNaN(timer) && !timeFormat){
        //error message
        loadModal(modalText.error);
        //enable so user can input time again
        timeInput.disabled = false;
        timeInput.value = 25;
        timeInput.focus();
        return;
      }

      //grab current time
      var currentTime = new Date();
      //set the deadline by adding 'timer' to get future date
      deadline = new Date(currentTime.getTime() + (timer * 60 * 1000));      

      buttonDisplay('start','none');
      buttonDisplay('pause','inline');
      buttonDisplay('reset','inline');

      //start countdown to deadline
      tick(deadline);
    };

    var pause = function(){
      clearInterval(intervalHandle);
      //show start and change text to 'continue'
      buttonDisplay('start', 'inline');
      var startBtn = document.getElementById('start');
      startBtn.innerHTML= 'Continue';
      //hide pause
      buttonDisplay('pause', 'none');
    };

    var reset = function(){      
      clearInterval(intervalHandle);
      //reset <title>
      document.title = 'Pomodoro - Productivity Timer';
      //enable input & focus
      timeInput.disabled = false;
      timeInput.focus();
      //check if it's break vs session and reset time accdg to that
      if(document.body.className === 'green'){      
        timeInput.value = 5;
      }else {
        timeInput.value = 25;
      }            
      //hide pause & reset, show start
      buttonDisplay('start','inline');
      buttonDisplay('pause','none');
      buttonDisplay('reset','none');
      //make sure start button says start
      document.getElementById('start').innerHTML = 'Start';
    };   

    //detect change in checkbox
    var breakToggle = function(event){
      var checkbox = event.target;      
      var toggleEvents = function(color, time){
        //change body background color
        document.body.className = color;
        //reset clock if it's running when switched
        reset();
        //set timer value to 25 mins/5 mins
        timeInput.value = time;  
      };      

      if(checkbox.checked){
        isBreak = checkbox.checked;
        reset();
        toggleEvents('green', 5);
        if(counter >= 4){
          timeInput.value = 15;          
        }
      }else {
        isBreak = checkbox.checked;
        reset();
        toggleEvents('red', 25);
      }
    }; 

    /* DOM RELATED FUNCTIONS */

    //load modal w/ text
    var loadModal = function(text){      
      return alertify.alert(text);
    };

    var buttonDisplay = function(id, display){
      var button = document.getElementById(id);
      button.style.display = display;
      return button;
    };
    
    //create control buttons
    var createButton = function(name, display, func){
      var button = document.createElement('button');
      button.setAttribute('id', name);
      button.innerHTML = name;
      button.style.display = display;
      button.onclick = func;
      return button;
    };

    //elements to be loaded on windows.load
    var loadElements = function(){
      //set body background color to red
      document.body.className = 'red';

      //set time to 25 minutes
      timeInput.value = 25;  

      //attach click event on breakToggle
      document.getElementById('breakToggle').onclick = breakToggle;

      //create and append buttons
      var buttonContainer = document.getElementById('buttons');
      buttonContainer.appendChild(createButton('start', 'inline', start));
      buttonContainer.appendChild(createButton('pause', 'none', pause));
      buttonContainer.appendChild(createButton('reset', 'none', reset));

      //Load Modal      
      loadModal(modalText.instructions);
      // autofocus after modal is closed
      document.getElementById('alertBtn').onclick = function(){
        timeInput.focus();
      };

      //make instructions available by clicking on the question mark
      document.querySelector('.faq').onclick = function(){
        loadModal(modalText.instructions);
      };      
    };
    
    //run on load
    loadElements(); 
  }; //end Pomodoro

  //load Pomodoro
  window.onload = Pomodoro;
})();