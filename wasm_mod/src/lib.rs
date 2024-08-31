
use reqwest::Client;
use serde_json::json;
use wasm_bindgen::prelude::*;
mod env;
use env::{SEPOLIA_END_POINT ,MAINNET_END_POINT};



#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace=console)]
    fn log(s: &str);
}

/// A demo function to test if WASM is callable from background.js
#[wasm_bindgen]
pub fn hello_wasm() {
    log("Hello from WASM!");
}

#[wasm_bindgen]
pub async fn request_handler() -> String {
    let address = "0xD9792383eF5A1B553e50072A0229d4447143fD82";
    let payload  = json!({
      "jsonrpc": "2.0",
      "method": "eth_getBalance",
      "params": [address, "latest"],
      "id": 1
  });
  
    let client = Client::new();
    let url = SEPOLIA_END_POINT;
    let response = client.post(url).json(&payload).send().await;
    let body = response.unwrap().text().await;
    body.unwrap().to_string()
       
}


#[wasm_bindgen(module = "/src/progress.ts")]
extern "C" {
    pub fn report_progress(msg: &str);
}
