const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
  document.documentElement.setAttribute('data-theme', currentTheme);

  if (currentTheme === 'dark') {
    toggleSwitch.checked = true;
  }
}

function switchTheme(e) {
  if (e.target.checked) {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  } else
  {document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);
//# sourceURL=pen.js


var TimerObj = (function(document) {

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

  return {
    start: start,
    end: end
  };
})(document);
