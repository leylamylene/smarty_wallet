import initWasmModule, { hello_wasm, request_handler } from "../pkg/wasm_mod.js";


(async () => {
  await initWasmModule();
  hello_wasm(); // this call logs a hello message from WASM for demo purposes
  request_handler();
})();

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   console.log("Message received:", message);
//   console.log("Sender:", sender);

//   // Handle the message and send a response
//   if (message.greeting === "hello") {
//     sendResponse({ farewell: "goodbye" });
//   }
// });