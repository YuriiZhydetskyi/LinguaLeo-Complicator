const DELAY = 350;
const ANSVER_CLASS_NAME = "ll-Repetition__answer";
let allAnsvers = document.getElementsByClassName(ANSVER_CLASS_NAME);

//TODO: considet to do this withot timeout
setTimeout(() => hideAnsvers(), DELAY);

document.body.addEventListener("keydown", function (event) {
  switch (event.key) {
    case 'ArrowUp':
      for (i = 0; i < allAnsvers.length; ++i) {
        allAnsvers[i].style.visibility = 'visible';
      }
      break;
    case 'ArrowLeft':
    case 'ArrowRight':
      hideAnsvers();
      break;
  }
});

function hideAnsvers() {
  for (i = 0; i < allAnsvers.length; ++i) {
    allAnsvers[i].style.visibility = "hidden";
  }
}

