var time = 0;
var lapTime = 0;
var lapNumber = 1;
var timerInterval;
var lapInterval;

toTime = function(cs, target) {
  var centiseconds = parseInt((cs%100))
  var seconds = parseInt((cs/100)%60)
  var minutes = parseInt((cs/(100*60))%60)
  minutes = (minutes < 10) ? "0" + minutes : minutes;
  seconds = (seconds < 10) ? "0" + seconds : seconds;
  centiseconds = (centiseconds < 10) ? "0" + centiseconds : centiseconds;
  if (target != undefined) {
    document.getElementById(target).innerHTML = minutes + ":" + seconds + "." + centiseconds ;
  }
  else
    return minutes + ":" + seconds + "." + centiseconds;
};

startTimer = function() {
  document.getElementById("button-left").innerHTML = '<button class="ui-stop" onclick="stopTimer()">Stop</button>';
  document.getElementById("button-right").innerHTML = '<button class="ui-lap" onclick="lap()">Lap</button>';
  timerInterval = setInterval(function(){
     time = time + 1;
     toTime(time, "time");
     lapTime = lapTime + 1;
     toTime(lapTime, "lapTime");
  }, 10);
};

lap = function() {
  var div = document.createElement("div");
  var lapTimeText = document.createTextNode(toTime(lapTime));
  var span = document.createElement("span");
  var lapTitleText = document.createTextNode("Lap " + lapNumber);
  span.appendChild(lapTitleText);
  div.appendChild(lapTimeText);
  div.appendChild(span);
  document.getElementById("lap_record").appendChild(div);
  lapTime = 0;
  lapNumber = lapNumber + 1;
};

stopTimer = function() {
  clearInterval(timerInterval);
  document.getElementById("button-left").innerHTML = '<button class="ui-start" onclick="startTimer()">Start</button>';
  document.getElementById("button-right").innerHTML = '<button onclick="reset()">Reset</button>';
};

reset = function() {
  document.getElementById("button-right").innerHTML = '<button class="ui-lap ui-inactive" onclick="lap()">Lap</button>';
  document.getElementById("time").innerHTML = "00:00.00";
  document.getElementById("lapTime").innerHTML = "00:00.00";
  document.getElementById("lap_record").innerHTML = '';
  clearInterval(timerInterval);
  time = 0;
  lapTime = 0;
  lapNumber = 1
};