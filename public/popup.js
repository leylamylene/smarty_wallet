

// import CryptoJS from "../node_modules/@types/crypto-js";
const target = document.getElementById("root");
const observer = new MutationObserver(checkChanges);
function onSuccess(message) {
}

function onError(error) {
}

function checkChanges(changeList, fromObserver) {
  console.log("Callback 2nd argument is the observer object: %s", fromObserver === observer);
  for (let change of changeList) {
    if (change.type == "attributes") {


      if (["my_wallet", "home"].includes(change.target.id)) {
        console.log("my_wallet_address ID CHANGED");

        let wallet_string = localStorage.getItem("wallet");
        chrome.runtime.sendMessage({ action: "get_wallet_address", params: wallet_string }).then(onSuccess, onError);
        chrome.runtime.sendMessage({ action: "get_wallet_mnemonic", params: wallet_string }).then(onSuccess, onError);

        break;
      }
    }
    else if (change.type == "childList") {
      for (let node of change.addedNodes) {

        if (["my_wallet", "home"].includes(node.id)) {
          console.log("my_wallet_address ID CHANGED");

          let wallet_string = localStorage.getItem("wallet");
          chrome.runtime.sendMessage({ action: "get_wallet_address", params: wallet_string }).then(onSuccess, onError);
          chrome.runtime.sendMessage({ action: "get_wallet_mnemonic", params: wallet_string }).then(onSuccess, onError);

          break;
        }
      }
    }
  }
}

observer.observe(target, {
  subtree: true,
  attributeFilter: ["id"],
  childList: true
});

async function fetchBalance() {
  await chrome.runtime
    .sendMessage({ action: "fetch_balance" })
    .then(onSuccess, onError);
}

function listen() {
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "balance") {
      document.getElementById("my_balance").innerText = request.params + " SepoliaETH";
      sendResponse({ response: "Message received" });
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "password") {
      localStorage.setItem("password", request.params);
    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "create_wallet") {
      localStorage.setItem("wallet", request.params);
    }
  });


  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "wallet_address") {
      console.log("wallet_address from popup js", request.params);
      document.getElementById("my_wallet_address").innerText = request.params;

    }
  });

  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "wallet_mnemonic") {
      console.log("wallet_mnemonic from popup js", request.params);
      document.getElementById("my_wallet_mnemonic").innerText = request.params;
    }
  });



}

function listenClickEvents() {

  document.addEventListener('click', function (event) {
    if (event.target && event.target.id === 'submit_set_pass') {
      let password = document.getElementById("password_set_pass")?.value;
      let confirm_password = document.getElementById(
        "conf_password_set_pass"
      )?.value;
      if (password === confirm_password) {
        chrome.runtime.sendMessage({ action: "encryptPassword", params: password }).then(onSuccess, onError);

      }
    }



  });


}

fetchBalance();
listen();
listenClickEvents();



