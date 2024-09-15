import initWasmModule, { get_balance, encrypt_password, create_wallet, get_wallet_address, get_wallet_mnemonic } from "../pkg/wasm_mod.js";


async function listen() {
  await initWasmModule();
  chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    if (request?.action === "fetch_balance") {

    }
    if (request?.action === "encryptPassword") {
      encrypt_password(request.params).then(res => {
        chrome.runtime.sendMessage({ action: "password", params: res }).then(onSuccess, onError);
      });
      create_wallet().then(res => {
        chrome.runtime.sendMessage({ action: "create_wallet", params: res });
      });
    }


    if (request?.action === "get_wallet_address") {
      get_wallet_address(request?.params).then(wallet_address => {
        chrome.runtime.sendMessage({ action: "wallet_address", params: wallet_address });
        get_balance(wallet_address).then(res => {
          let balance = JSON.parse(res).result;
          balance = parseInt(balance, 16) / 1000000000000000000;
          balance = balance.toFixed(4);
          chrome.runtime.sendMessage({ action: "balance", params: balance }).then(onSuccess, onError);
        });
      });


    }

    if (request?.action === "get_wallet_mnemonic") {
      get_wallet_mnemonic(request?.params).then(wallet_mnemonic => {
        chrome.runtime.sendMessage({ action: "wallet_mnemonic", params: wallet_mnemonic });
      });

    }

  });
}

listen();

function onSuccess(message) {
}

// A placeholder for OnError in .then
function onError(error) {
}
