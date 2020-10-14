let getting = browser.storage.sync.get("statusesResetter");
let isStatusesResetternOn = true;
getting.then(onGot, onError);

browser.runtime.onMessage.addListener((data) => {

  if (data.message === "settings changes") {

    getting = browser.storage.sync.get("statusesResetter");
    getting.then(onRepetitionGot, onError);
  } 
});

browser.webRequest.onBeforeRequest.addListener(
  resetStatuses,
  { urls: ["https://api.lingualeo.com/ProcessTraining"]},
  ['requestBody']
);

function resetStatuses(requestDetails) {

  if(!requestDetails.requestBody || !isStatusesResetterOn){
    return;
  }
  
  const rawStr = String.fromCharCode.apply(null, new Uint8Array(requestDetails.requestBody.raw[0].bytes));
  const requestBody = JSON.parse(rawStr);

  const words = requestBody?.data?.words;
  if(!words)
    return;
  
  let wordsNumbers = [];
  for(const [number, result] of Object.entries(words)){
    if (result == 0) {
      wordsNumbers.push(number);
    }
  }
  const request = new Request('https://api.lingualeo.com/SetWords',
  { method: 'POST', 
    headers: { "Content-Type": "application/json" },
    body: '{"apiVersion": "1.0.1", "op": "new_updateWordAttr", "data": [{ "action": "update", "mode": "learning", "wordIds": [' + wordsNumbers.join() + '], "valueList": { "learningStatus": 0 } }], "userData": { "nativeLanguage": "lang_id_src" }, "ctx": { "config": { "isCheckData": true, "isLogging": true } } }'
  } );
  fetch(request);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function onGot(item) {
 
  if (item.satusesResetter === undefined || item.satusesResetter) {
    isStatusesResetterOn = true;
  } else {
    isRepetitionComplicatorOn = false;
  }
}
