import initWasmModule, { request_handler, encrypt_password } from "../pkg/wasm_mod.js";


async function listen() {
  await initWasmModule();
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request?.action == "fetch_balance") {
      console.log('fetch balannnnnnnnnnce');
      request_handler().then(res => {
        let balance = JSON.parse(res).result;
        balance = parseInt(balance, 16) / 1000000000000000000;
        balance = balance.toFixed(4);
        chrome.runtime.sendMessage({ action: "balance", params: balance }).then(onSuccess, onError);
      });
    }
    if (request?.action == "encryptPassword") {
      encrypt_password(request.params).then(res => {
        chrome.storage.local.set({ "password": res }, () => {
          chrome.runtime.sendMessage({ action: "password", params: res });
          if (sendResponse) sendResponse();
        });

      })
    }
  });



}

listen();

function onSuccess(message) {
  console.log(`Send OK: ${JSON.stringify(message)}`);
}

// A placeholder for OnError in .then
function onError(error) {
  console.error(`Promise error: ${error}`);
}


