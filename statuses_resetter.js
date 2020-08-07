function resetStatuses(requestDetails) {

  if(!requestDetails.requestBody){
    return;
  }
  
  const rawStr = String.fromCharCode.apply(null, new Uint8Array(requestDetails.requestBody.raw[0].bytes));
  const requestBody = JSON.parse(rawStr);

  const words = requestBody.data.words;
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

browser.webRequest.onBeforeRequest.addListener(
  resetStatuses,
  { urls: ["https://api.lingualeo.com/ProcessTraining"]},
  ['requestBody']
);