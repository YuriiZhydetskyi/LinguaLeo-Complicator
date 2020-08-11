document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

function saveOptions(e) {

  e.preventDefault();
  browser.storage.sync.set({
    repetitionComplicator: document.getElementById("repetitionComplicator_chbx").checked,
    satusesResetter: document.getElementById("statusesResetter_chbx").checked
  });

  browser.tabs.query({
    currentWindow: true,
    active: true
  }).then(sendMessageToTabs);
  
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.getElementById("repetitionComplicator_chbx").checked = result.repetitionComplicator;
    document.getElementById("statusesResetter_chbx").checked = result.satusesResetter;
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get(["repetitionComplicator", "satusesResetter"]);
  getting.then(setCurrentChoice, onError);
}

function sendMessageToTabs(tabs) {
  for (let tab of tabs) {
    browser.tabs.sendMessage(
      tab.id,
      "settings changed"
    );
  }
}
