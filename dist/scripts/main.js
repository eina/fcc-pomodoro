!function() {
    "use strict";
    function t() {
        var t= {
            parent:document.body,
            version:"1.0.11",
            defaultOkLabel:"Ok",
            okLabel:"Ok",
            defaultCancelLabel:"Cancel",
            cancelLabel:"Cancel",
            defaultMaxLogItems:2,
            maxLogItems:2,
            promptValue:"",
            promptPlaceholder:"",
            closeLogOnClick:!1,
            closeLogOnClickDefault:!1,
            delay:5e3,
            defaultDelay:5e3,
            logContainerClass:"alertify-logs",
            logContainerDefaultClass:"alertify-logs",
            dialogs: {
                buttons: {
                    holder:"<nav>{{buttons}}</nav>",
                    ok:"<button class='ok' id='alertBtn' tabindex='1'>{{ok}}</button>",
                    cancel:"<button class='cancel' tabindex='2'>{{cancel}}</button>"
                }
                ,
                input:"<input type='text'>",
                message:"<p class='msg'>{{message}}</p>",
                log:"<div class='{{class}}'>{{message}}</div>"
            }
            ,
            defaultDialogs: {
                buttons: {
                    holder:"<nav>{{buttons}}</nav>",
                    ok:"<button class='ok' id='alertBtn' tabindex='1'>{{ok}}</button>",
                    cancel:"<button class='cancel' tabindex='2'>{{cancel}}</button>"
                }
                ,
                input:"<input type='text'>",
                message:"<p class='msg'>{{message}}</p>",
                log:"<div class='{{class}}'>{{message}}</div>"
            }
            ,
            build:function(t) {
                var e=this.dialogs.buttons.ok,
                o="<div class='dialog'><div>"+this.dialogs.message.replace("{{message}}", t.message);
                return"confirm"!==t.type&&"prompt"!==t.type||(e=this.dialogs.buttons.cancel+this.dialogs.buttons.ok),
                "prompt"===t.type&&(o+=this.dialogs.input),
                o=(o+this.dialogs.buttons.holder+"</div></div>").replace("{{buttons}}", e).replace("{{ok}}", this.okLabel).replace("{{cancel}}", this.cancelLabel)
            }
            ,
            setCloseLogOnClick:function(t) {
                this.closeLogOnClick=!!t
            }
            ,
            close:function(t, e) {
                this.closeLogOnClick&&t.addEventListener("click", function() {
                    o(t)
                }
                ),
                e=e&&!isNaN(+e)?+e:this.delay,
                0>e?o(t):e>0&&setTimeout(function() {
                    o(t)
                }
                , e)
            }
            ,
            dialog:function(t, e, o, n) {
                return this.setup( {
                    type: e, message: t, onOkay: o, onCancel: n
                }
                )
            }
            ,
            log:function(t, e, o) {
                var n=document.querySelectorAll(".alertify-logs > div");
                if(n) {
                    var i=n.length-this.maxLogItems;
                    if(i>=0)for(var a=0, l=i+1;
                    l>a;
                    a++)this.close(n[a], -1)
                }
                this.notify(t, e, o)
            }
            ,
            setLogPosition:function(t) {
                this.logContainerClass="alertify-logs "+t
            }
            ,
            setupLogContainer:function() {
                var t=document.querySelector(".alertify-logs"),
                e=this.logContainerClass;
                return t||(t=document.createElement("div"), t.className=e, this.parent.appendChild(t)),
                t.className!==e&&(t.className=e),
                t
            }
            ,
            notify:function(e, o, n) {
                var i=this.setupLogContainer(),
                a=document.createElement("div");
                a.className=o||"default",
                t.logTemplateMethod?a.innerHTML=t.logTemplateMethod(e):a.innerHTML=e,
                "function"==typeof n&&a.addEventListener("click", n),
                i.appendChild(a),
                setTimeout(function() {
                    a.className+=" show"
                }
                , 10),
                this.close(a, this.delay)
            }
            ,
            setup:function(t) {
                function e(e) {
                    "function"!=typeof e&&(e=function() {}
                    ),
                    i&&i.addEventListener("click", function(i) {
                        t.onOkay&&"function"==typeof t.onOkay&&(l?t.onOkay(l.value, i): t.onOkay(i)), e(l? {
                            buttonClicked: "ok", inputValue: l.value, event: i
                        }
                        : {
                            buttonClicked: "ok", event: i
                        }
                        ), o(n)
                    }
                    ),
                    a&&a.addEventListener("click", function(i) {
                        t.onCancel&&"function"==typeof t.onCancel&&t.onCancel(i), e( {
                            buttonClicked: "cancel", event: i
                        }
                        ), o(n)
                    }
                    ),
                    l&&l.addEventListener("keyup", function(t) {
                        13===t.which&&i.click()
                    }
                    )
                }
                var n=document.createElement("div");
                n.className="alertify hide",
                n.innerHTML=this.build(t);
                var i=n.querySelector(".ok"),
                a=n.querySelector(".cancel"),
                l=n.querySelector("input"),
                s=n.querySelector("label");
                l&&("string"==typeof this.promptPlaceholder&&(s?s.textContent=this.promptPlaceholder:l.placeholder=this.promptPlaceholder), "string"==typeof this.promptValue&&(l.value=this.promptValue));
                var r;
                return"function"==typeof Promise?r=new Promise(e):e(),
                this.parent.appendChild(n),
                setTimeout(function() {
                    n.classList.remove("hide"), l&&t.type&&"prompt"===t.type?(l.select(), l.focus()): i&&i.focus()
                }
                , 100),
                r
            }
            ,
            okBtn:function(t) {
                return this.okLabel=t,
                this
            }
            ,
            setDelay:function(t) {
                return t=t||0,
                this.delay=isNaN(t)?this.defaultDelay: parseInt(t, 10), this
            }
            ,
            cancelBtn:function(t) {
                return this.cancelLabel=t,
                this
            }
            ,
            setMaxLogItems:function(t) {
                this.maxLogItems=parseInt(t||this.defaultMaxLogItems)
            }
            ,
            theme:function(t) {
                switch(t.toLowerCase()) {
                    case"bootstrap":this.dialogs.buttons.ok="<button class='ok btn btn-primary' tabindex='1'>{{ok}}</button>",
                    this.dialogs.buttons.cancel="<button class='cancel btn btn-default' tabindex='2'>{{cancel}}</button>",
                    this.dialogs.input="<input type='text' class='form-control'>";
                    break;
                    case"purecss":this.dialogs.buttons.ok="<button class='ok pure-button' tabindex='1'>{{ok}}</button>",
                    this.dialogs.buttons.cancel="<button class='cancel pure-button' tabindex='2'>{{cancel}}</button>";
                    break;
                    case"mdl":case"material-design-light":this.dialogs.buttons.ok="<button class='ok mdl-button mdl-js-button mdl-js-ripple-effect'  tabindex='1'>{{ok}}</button>",
                    this.dialogs.buttons.cancel="<button class='cancel mdl-button mdl-js-button mdl-js-ripple-effect' tabindex='2'>{{cancel}}</button>",
                    this.dialogs.input="<div class='mdl-textfield mdl-js-textfield'><input class='mdl-textfield__input'><label class='md-textfield__label'></label></div>";
                    break;
                    case"angular-material":this.dialogs.buttons.ok="<button class='ok md-primary md-button' tabindex='1'>{{ok}}</button>",
                    this.dialogs.buttons.cancel="<button class='cancel md-button' tabindex='2'>{{cancel}}</button>",
                    this.dialogs.input="<div layout='column'><md-input-container md-no-float><input type='text'></md-input-container></div>";
                    break;
                    case"default": default: this.dialogs.buttons.ok=this.defaultDialogs.buttons.ok, this.dialogs.buttons.cancel=this.defaultDialogs.buttons.cancel, this.dialogs.input=this.defaultDialogs.input
                }
            }
            ,
            reset:function() {
                this.parent=document.body,
                this.theme("default"),
                this.okBtn(this.defaultOkLabel),
                this.cancelBtn(this.defaultCancelLabel),
                this.setMaxLogItems(),
                this.promptValue="",
                this.promptPlaceholder="",
                this.delay=this.defaultDelay,
                this.setCloseLogOnClick(this.closeLogOnClickDefault),
                this.setLogPosition("bottom left"),
                this.logTemplateMethod=null
            }
            ,
            injectCSS:function() {
                if(!document.querySelector("#alertifyCSS")) {
                    var t=document.getElementsByTagName("head")[0],
                    e=document.createElement("style");
                    e.type="text/css",
                    e.id="alertifyCSS",
                    e.innerHTML=".alertify{position:fixed;background-color:rgba(0,0,0,.3);left:0;right:0;top:0;bottom:0;width:100%;height:100%;z-index:1}.alertify.hide{opacity:0;pointer-events:none}.alertify,.alertify.show{box-sizing:border-box;transition:all .33s cubic-bezier(.25,.8,.25,1)}.alertify,.alertify *{box-sizing:border-box}.alertify .dialog{padding:12px}.alertify .alert,.alertify .dialog{width:100%;margin:0 auto;position:relative;top:50%;transform:translateY(-50%)}.alertify .alert>*,.alertify .dialog>*{width:400px;max-width:95%;margin:0 auto;text-align:center;padding:12px;background:#fff;box-shadow:0 2px 4px -1px rgba(0,0,0,.14),0 4px 5px 0 rgba(0,0,0,.098),0 1px 10px 0 rgba(0,0,0,.084)}.alertify .alert .msg,.alertify .dialog .msg{padding:12px;margin-bottom:12px;margin:0;text-align:left}.alertify .alert input:not(.form-control),.alertify .dialog input:not(.form-control){margin-bottom:15px;width:100%;font-size:100%;padding:12px}.alertify .alert input:not(.form-control):focus,.alertify .dialog input:not(.form-control):focus{outline-offset:-2px}.alertify .alert nav,.alertify .dialog nav{text-align:right}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button),.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button){background:transparent;box-sizing:border-box;color:rgba(0,0,0,.87);position:relative;outline:0;border:0;display:inline-block;-ms-flex-align:center;-ms-grid-row-align:center;align-items:center;padding:0 6px;margin:6px 8px;line-height:36px;min-height:36px;white-space:nowrap;min-width:88px;text-align:center;text-transform:uppercase;font-size:14px;text-decoration:none;cursor:pointer;border:1px solid transparent;border-radius:2px}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):active,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):hover{background-color:rgba(0,0,0,.05)}.alertify .alert nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus,.alertify .dialog nav button:not(.btn):not(.pure-button):not(.md-button):not(.mdl-button):focus{border:1px solid rgba(0,0,0,.1)}.alertify .alert nav button.btn,.alertify .dialog nav button.btn{margin:6px 4px}.alertify-logs{position:fixed;z-index:1}.alertify-logs.bottom,.alertify-logs:not(.top){bottom:16px}.alertify-logs.left,.alertify-logs:not(.right){left:16px}.alertify-logs.left>*,.alertify-logs:not(.right)>*{float:left;transform:translateZ(0);height:auto}.alertify-logs.left>.show,.alertify-logs:not(.right)>.show{left:0}.alertify-logs.left>*,.alertify-logs.left>.hide,.alertify-logs:not(.right)>*,.alertify-logs:not(.right)>.hide{left:-110%}.alertify-logs.right{right:16px}.alertify-logs.right>*{float:right;transform:translateZ(0)}.alertify-logs.right>.show{right:0;opacity:1}.alertify-logs.right>*,.alertify-logs.right>.hide{right:-110%;opacity:0}.alertify-logs.top{top:0}.alertify-logs>*{box-sizing:border-box;transition:all .4s cubic-bezier(.25,.8,.25,1);position:relative;clear:both;backface-visibility:hidden;perspective:1000;max-height:0;margin:0;padding:0;overflow:hidden;opacity:0;pointer-events:none}.alertify-logs>.show{margin-top:12px;opacity:1;max-height:1000px;padding:12px;pointer-events:auto}",
                    t.insertBefore(e, t.firstChild)
                }
            }
            ,
            removeCSS:function() {
                var t=document.querySelector("#alertifyCSS");
                t&&t.parentNode&&t.parentNode.removeChild(t)
            }
        }
        ;
        return t.injectCSS(),
        {
            _$$alertify:t,
            parent:function(e) {
                t.parent=e
            }
            ,
            reset:function() {
                return t.reset(),
                this
            }
            ,
            alert:function(e, o, n) {
                return t.dialog(e, "alert", o, n)||this
            }
            ,
            confirm:function(e, o, n) {
                return t.dialog(e, "confirm", o, n)||this
            }
            ,
            prompt:function(e, o, n) {
                return t.dialog(e, "prompt", o, n)||this
            }
            ,
            log:function(e, o) {
                return t.log(e, "default", o),
                this
            }
            ,
            theme:function(e) {
                return t.theme(e),
                this
            }
            ,
            success:function(e, o) {
                return t.log(e, "success", o),
                this
            }
            ,
            error:function(e, o) {
                return t.log(e, "error", o),
                this
            }
            ,
            cancelBtn:function(e) {
                return t.cancelBtn(e),
                this
            }
            ,
            okBtn:function(e) {
                return t.okBtn(e),
                this
            }
            ,
            delay:function(e) {
                return t.setDelay(e),
                this
            }
            ,
            placeholder:function(e) {
                return t.promptPlaceholder=e,
                this
            }
            ,
            defaultValue:function(e) {
                return t.promptValue=e,
                this
            }
            ,
            maxLogItems:function(e) {
                return t.setMaxLogItems(e),
                this
            }
            ,
            closeLogOnClick:function(e) {
                return t.setCloseLogOnClick(!!e),
                this
            }
            ,
            logPosition:function(e) {
                return t.setLogPosition(e||""),
                this
            }
            ,
            setLogTemplate:function(e) {
                return t.logTemplateMethod=e,
                this
            }
            ,
            clearLogs:function() {
                return t.setupLogContainer().innerHTML="",
                this
            }
            ,
            version:t.version
        }
    }
    var e=500,
    o=function(t) {
        if(t) {
            var o=function() {
                t&&t.parentNode&&t.parentNode.removeChild(t)
            }
            ;
            t.classList.remove("show"),
            t.classList.add("hide"),
            t.addEventListener("transitionend", o),
            setTimeout(o, e)
        }
    }
    ;
    if("undefined"!=typeof module&&module&&module.exports) {
        module.exports=function() {
            return new t
        }
        ;
        var n=new t;
        for(var i in n)module.exports[i]=n[i]
    }
    else"function"==typeof define&&define.amd?define(function() {
        return new t
    }
    ):window.alertify=new t
}

();
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

      //enter key on input 
      timeInput.onkeypress = function(e){
        var event = e || window.event;
        var charCode = event.which || event.keyCode;

        if(charCode === 13){
          start();
          return false;
        }
      }
    };
    
    //run on load
    loadElements(); 
  }; //end Pomodoro

  //load Pomodoro
  window.onload = Pomodoro;
})();