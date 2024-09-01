

// import CryptoJS from "../node_modules/@types/crypto-js";

function onSuccess(message) {
}

function onError(error) {
  console.error(`Promise error: ${error}`);
}


async function fetchBalance() {
  await chrome.runtime
    .sendMessage({ action: "fetch_balance" })
    .then(onSuccess, onError);
}

function listen() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "balance") {
      document.getElementById("my_balance").innerText = request.params + "SepoliaETH";
      console.log("sender", sender);
      sendResponse({ response: "Message received" });
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "password") {
      console.log("Encrypted password is saved.", request.params);
    }

  });

}

function listenSubmitPassword() {

  document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'submit_set_pass') {
      let password = document.getElementById("password_set_pass")?.value;
      let confirm_password = document.getElementById(
        "conf_password_set_pass"
      )?.value;
      console.log('sett pass clicked');
      if (password === confirm_password) {
        chrome.runtime.sendMessage({ action: "encryptPassword", params: password }).then(onSuccess, onError);
      }
    }
  });


}

fetchBalance();
listen();
listenSubmitPassword();



