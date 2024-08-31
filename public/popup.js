console.log("popup.js loaded");

// A placeholder for OnSuccess in .then
function onSuccess(message) {
  // console.log(`Send OK: ${JSON.stringify(message)}`);
}

// A placeholder for OnError in .then
function onError(error) {
  console.error(`Promise error: ${error}`);
}


async function fetchBalance() {
  await chrome.runtime.sendMessage({ action: "fetch_balance" }).then(onSuccess, onError);
}

function listen() {

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    document.getElementById("my_balance").innerText = message + " SepoliaETH";
    console.log("Message received:", message);
    sendResponse({ response: "Message received" });

  });
}

listen();

fetchBalance();




