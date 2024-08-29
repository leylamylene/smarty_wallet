// Copied this solution from https://medium.com/geekculture/rusting-javascript-with-webassembly-632405ba5a42
// The proper way of doing this is probably via https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API
// also see https://developer.chrome.com/docs/extensions/mv3/messaging/

// from content to popup: https://www.reddit.com/r/chrome_extensions/comments/sjfl02/chrome_extension_v3_sending_data_from_content_to/

// a placeholder for .then onSuccess
function handleResponse(message: string) {
  console.log(`Send OK: ${JSON.stringify(message)}`);
}

// a placeholder for .then onError
function handleError(error: string) {
  console.log(`Send error: ${error}`);
}

// This function is imported into lib.rs
export function report_progress(msg: string) {
  // console.log(`Progress: ${msg}`)
  // we have to handle errors gracefully because if the sending fails,
  // it brings down the entire thread and the WASM dies
  chrome.runtime.sendMessage(msg).then(handleResponse, handleError);
}
