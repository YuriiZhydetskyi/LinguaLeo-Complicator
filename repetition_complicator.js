const FIRST_QUESTION_DELAY = 350;
const NEXT_QUESTION_DELAY = 600;
const ANSVER_CLASS_NAME = "ll-Repetition__answer";
let allAnsvers = document.getElementsByClassName(ANSVER_CLASS_NAME);

//TODO: considet to do this withot timeout
setTimeout(() => hideAnsvers(), FIRST_QUESTION_DELAY);
setTimeout(() => setListenerForClick(), FIRST_QUESTION_DELAY * 2); // *2 is to be shure that listeners will be added

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

function setListenerForClick() {
  for (i = 0; i < allAnsvers.length; ++i) {
    allAnsvers[i].addEventListener("mousedown", function (event) {
      console.log(allAnsvers.length);
      setTimeout(() => hideAnsvers(), NEXT_QUESTION_DELAY);
    });
  }
}

function hideAnsvers() {
  for (i = 0; i < allAnsvers.length; ++i) {
    allAnsvers[i].style.visibility = "hidden";
  }
}

