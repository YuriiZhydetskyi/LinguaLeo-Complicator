browser.webRequest.onBeforeRequest.addListener(
    onNewRepetitionRequest,
    { urls: ["https://api.lingualeo.com/ProcessTraining"] },
    ['requestBody']
);

function onNewRepetitionRequest(requestDetails) {

    if (!requestDetails.requestBody) {
        return;
    }

    const rawStr = String.fromCharCode.apply(null, new Uint8Array(requestDetails.requestBody.raw[0].bytes));
    const requestBody = JSON.parse(rawStr);

    if (requestBody?.trainingName === "word_get_repetition") {
        browser.tabs.query({
            currentWindow: true,
            active: true
        }).then(sendNewRepetitionMessage);
    }
}

function sendNewRepetitionMessage(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            "new repetiiton"
        );
    }
}
