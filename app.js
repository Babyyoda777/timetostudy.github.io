var TimerObj = (function(document){

   var Timer;

   function start() {
     Timer = setInterval(myClock, 1000);
     var c = 5;

     function myClock() {
       document.getElementById("timer").innerHTML = --c;
       if (c == -1) {
         clearInterval(Timer);
         alert("That's it! Study time over!");
       }
     }
   }

   function end() {
       clearInterval(Timer)
   }

   return {start:start, end:end};
 })(document);
