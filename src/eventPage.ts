// Listen to messages sent from other parts of the extension.
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    // onMessage must return "true" if response is async.
    let isResponseAsync = false;

    if(request.log) {
        console.log(request.log);
    }

    return isResponseAsync;
});

chrome.runtime.onStartup.addListener(() => {

});