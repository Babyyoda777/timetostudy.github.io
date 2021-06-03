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
  } else {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  }
}

toggleSwitch.addEventListener('change', switchTheme, false);
//# sourceURL=pen.js


//timer below////////////////
$(() => {

  let $audio = $("audio"), // from https://tide.moreless.io/en/
    $theme = $(".theme"),
    $title = $("#title"),
    $controls = $("#controls"),
    $options = $("#options"),
    $minutes = $("#minutes"),
    $seconds = $("#seconds"),
    $start = $("#start"),
    $pause = $("#pause"),
    $reset = $("#reset"),
    $incrSession = $("#incrSession"),
    $sessionInput = $("#sessionInput"),
    $decrSession = $("#decrSession"),
    $incrBreak = $("#incrBreak"),
    $breakInput = $("#breakInput"),
    $decrBreak = $("#decrBreak"),
    breakLength = 5 * 60,
    breakMax = 10,
    breakMin = 1,
    sessionLength = 30 * 60,
    sessionMax = 90,
    sessionMin = 1,
    sessionNum = 0,
    countdown,
    countType,
    remainingTime = sessionLength;

  init();

  function init() {
    $incrSession.click(() => incrSession());
    $decrSession.click(() => decrSession());
    $incrBreak.click(() => incrBreak());
    $decrBreak.click(() => decrBreak());
    $sessionInput.on("change", e => updateSession(e.target.value));
    $breakInput.on("change", e => updateBreak(e.target.value));
    $start.click(() => {
      if (countType === "break") {
        startBreak();
      } else {
        startSession();
      }
    });
    $pause.click(() => pause());
    $reset.click(() => reset());
  }

  function startSession() {
    sessionNum++;
    countType = "session";
    $options.slideUp(143);
    $controls.removeClass().addClass("started");
    $title.fadeOut(43, function() {
      $(this).html("Study time!").fadeIn();
    });
    $audio.animate({
      volume: 1
    }, 1000);
    start(remainingTime || sessionLength);
  }

  function startBreak() {
    countType = "break";
    $title.fadeOut(43, function() {
      $(this).html("Break time!").fadeIn();
    });
    start(remainingTime || breakLength);
  }

  function start(timeLeft) {
    clearInterval(countdown);
    countdown = setInterval(() => {
      timeLeft--;
      remainingTime = timeLeft;
      let minLeft = Math.floor(timeLeft / 60),
        secLeft = timeLeft - minLeft * 60;
      updateMinutes(minLeft);
      updateSeconds(secLeft < 10 ? "0" + secLeft : secLeft);
      if (timeLeft < 1) {
        if (countType === "session") {
          startBreak(breakLength);
        } else {
          startSession();
        }
      }
    }, 1000);
  }

  function pause() {
    sessionNum--;
    $audio.animate({
      volume: 0
    }, 1000);
    clearInterval(countdown);
    $options.slideDown(143);
    $controls.removeClass().addClass("paused");
    $title.fadeOut(43, function() {
      $(this).html("Paused").fadeIn();
    });
  }

  function reset() {
    clearInterval(countdown);
    updateMinutes(sessionLength / 60);
    updateSeconds("00");
    countType = undefined;
    $controls.removeClass().addClass("reset");
    $title.html("Ready?");
    remainingTime = sessionLength;
  }

  function incrSession() {
    let num = Number($sessionInput.val());
    num = num + (num === sessionMax ? 0 : 1);
    sessionLength = num * 60;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
    reset();
  }

  function decrSession() {
    let num = Number($sessionInput.val());
    num = num - (num === sessionMin ? 0 : 1);
    sessionLength = num * 60;
    updateSession(num);
    updateMinutes(num);
    updateSeconds("00");
    reset();
  }

  function incrBreak() {
    let num = Number($breakInput.val());
    num = num + (num === breakMax ? 0 : 1);
    breakLength = num * 60;
    updateBreak(num);
    reset();
  }

  function decrBreak() {
    let num = Number($breakInput.val());
    num = num - (num === breakMin ? 0 : 1);
    breakLength = num * 60;
    updateBreak(num);
    reset();
  }

  function updateMinutes(num) {
    $minutes.text(num);
  }

  function updateSeconds(num) {
    $seconds.text(num);
  }

  function updateSession(num) {
    num = num < sessionMin ? sessionMin : num > sessionMax ? sessionMax : num;
    $sessionInput.val(num).blur();
    updateMinutes(num);
    updateSeconds("00");
    sessionLength = num * 60;
    reset();
  }

  function updateBreak(num) {
    $breakInput.val(num < breakMin ? breakMin : num > breakMax ? breakMax : num).blur();
    breakLength = num * 60;
    reset();
  }
  if (remainingTime == 0) {
           alert("That's it! Study time over!");
         }

});
