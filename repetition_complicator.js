const FIRST_QUESTION_DELAY = 400;
const NEXT_QUESTION_DELAY = 600;
const ANSVER_CLASS_NAME = "ll-Repetition__answer";
let allAnsvers = document.getElementsByClassName(ANSVER_CLASS_NAME);

let getting = browser.storage.sync.get("repetitionComplicator");
let isRepetitionComplicatorOn = true;
getting.then(onRepetitionGot, onError);

//TODO: considet to do this withot timeout
setTimeout(() => hideAnsvers(), FIRST_QUESTION_DELAY);
setTimeout(() => setListenerForClick(), FIRST_QUESTION_DELAY * 4); // *4 is to be shure that listeners will be added

document.body.addEventListener("keydown", function (event) {
  switch (event.key) {
    case 'ArrowUp':
      for (i = 0; i < allAnsvers.length; ++i) {
        allAnsvers[i].style.visibility = 'visible';
      }
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
}

function hideAnsvers() {

  if (isRepetitionComplicatorOn) {
    for (i = 0; i < allAnsvers.length; ++i) {
      allAnsvers[i].style.visibility = "hidden";
    }
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

