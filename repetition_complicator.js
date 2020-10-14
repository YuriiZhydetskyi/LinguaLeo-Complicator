const FIRST_QUESTION_DELAY = 100;
const NEXT_QUESTION_DELAY = 500;
const ANSVER_CLASS_NAME = "ll-Repetition__answer";
const QUESTION_CLASS_NAME = "ll-Repetition__question-wrapper";

let allAnsvers = document.getElementsByClassName(ANSVER_CLASS_NAME);;
let questions = document.getElementsByClassName(QUESTION_CLASS_NAME);;

let getting = browser.storage.sync.get("repetitionComplicator");
let isRepetitionComplicatorOn = true;
getting.then(onRepetitionGot, onError);

function applyBindings(){

  if(allAnsvers.length !== 2){
    setTimeout(() => applyBindings(), FIRST_QUESTION_DELAY);
    return;
  }

  hideAnsvers();
  setListenerForClick();
}

setTimeout(() => applyBindings(), FIRST_QUESTION_DELAY);

document.body.addEventListener("keydown", function (event) {
  switch (event.key) {
    case 'ArrowUp':
      showAnsvers();
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      setTimeout(() => hideAnsvers(), NEXT_QUESTION_DELAY);
      break;
  }
});

browser.runtime.onMessage.addListener((message) => {

  if (message === "settings changed") {
    getting = browser.storage.sync.get("repetitionComplicator");
    getting.then(onRepetitionGot, onError);
  }
});

function setListenerForClick() {
  for (i = 0; i < allAnsvers.length; ++i) {
    allAnsvers[i].addEventListener("mousedown", function (event) {
      setTimeout(() => hideAnsvers(), NEXT_QUESTION_DELAY);
    });
  }
  questions[0]?.addEventListener("mousedown", showAnsvers);
}

function hideAnsvers() {

  if (isRepetitionComplicatorOn) {
    for (i = 0; i < allAnsvers.length; ++i) {
      allAnsvers[i].style.visibility = "hidden";
    }
  }
}

function showAnsvers() {

  for (i = 0; i < allAnsvers.length; ++i) {
    allAnsvers[i].style.visibility = "visible";
  }
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onRepetitionGot(item) {

  if (item.repetitionComplicator === undefined || item.repetitionComplicator) {
    isRepetitionComplicatorOn = true;
  } else{
    isRepetitionComplicatorOn = false;
  }
}

