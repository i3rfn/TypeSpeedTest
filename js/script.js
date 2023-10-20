let originText = "";
let testWrapper = document.querySelector(".test-wrapper");
let testArea = document.querySelector("#test-area");
let theTimer = document.querySelector(".timer");
let resetButton = document.querySelector("#reset");
let outerArea = document.querySelector(".test-area");
let count = document.querySelector(".count");
var timer = [0, 0, 0, 0];
var timeRunning = false;
var interval;

function fetchRandomPost() {
  fetch(`http://localhost:3004/posts`)
    .then((response) => response.json())
    .then((data) => {
      let randomIndex = Math.floor(Math.random() * data.length);
      originText = data[randomIndex].body;
      document.querySelector("#origin-text").innerHTML = originText;
    })
    .catch((error) => console.error("Error:", error));
}
fetchRandomPost();

function leadingZero(time) {
  if (time <= 9) {
    time = "0" + time;
  }
  return time;
}

function runTimer() {
  let currentTime =
    leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + timer[2];
  theTimer.innerHTML = currentTime;
  timer[3]++;
  timer[0] = Math.floor(timer[3] / 100 / 60);
  timer[1] = Math.floor(timer[3] / 100 - timer[0] * 60);
  timer[2] = Math.floor(timer[3] - timer[1] * 100 - timer[0] * 6000);
}

function spellChecker() {
  let textEntry = testArea.value;
  let originTextMatch = originText.substring(0, textEntry.length);
  if (textEntry == originText) {
    testArea.style.borderColor = "green";
    outerArea.style.borderColor = "green";
    outerArea.style.borderWidth = "5px";
    count.style.borderColor = "green";
    clearInterval(interval);
  } else if (textEntry == originTextMatch) {
    testArea.style.borderColor = "yellow";
    count.style.borderColor = "yellow";
  } else {
    testArea.style.borderColor = "red";
    count.style.borderColor = "red";
  }
}

function start() {
  let textEntryLength = testArea.value.length;
  if (textEntryLength == 0 && !timeRunning) {
    timeRunning = true;
    interval = setInterval(runTimer, 10);
  }
}

let letterCount = 0;

function countLetters() {
  let textEntry = testArea.value;
  letterCount = textEntry.length;
  document.querySelector(".count").innerText = letterCount;
}

function reset() {
  clearInterval(interval);
  interval = null;
  timer = [0, 0, 0, 0];
  timeRunning = false;
  testArea.value = "";
  testArea.style.borderColor = "gray";
  outerArea.style.borderColor = "gray";
  count.style.borderColor = "geay";

  outerArea.style.borderWidth = "3px";
  theTimer.innerText = "00:00:00";
  document.querySelector(".count").innerText = 0;
  fetchRandomPost();
}

testArea.addEventListener("keyup", spellChecker);
testArea.addEventListener("keypress", start);
resetButton.addEventListener("click", reset);
testArea.addEventListener("keyup", countLetters);
