
use reqwest::Client;
use serde_json::json;
use wasm_bindgen::prelude::*;
mod env;
use env::{SEPOLIA_END_POINT };
use magic_crypt::{new_magic_crypt, MagicCryptTrait};
mod wallet;
use wallet::*;



#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace=console)]
    fn log(s: &str);
}

/// A demo function to test if WASM is callable from background.js
#[wasm_bindgen]
pub fn hello_wasm() {
   
}

#[wasm_bindgen]
pub async fn get_balance(address:&str) -> String {
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

#[wasm_bindgen]
pub async fn encrypt_password(password :String)-> String {
    let mc = new_magic_crypt!("my_secret_key", 256);
    mc.encrypt_str_to_base64(password)
   
}
    

#[wasm_bindgen]
pub async fn decrypt_password(encrypted_password :String)-> String {
    let mc = new_magic_crypt!("my_secret_key", 256);
    mc.decrypt_base64_to_string(&encrypted_password).unwrap()
}



#[wasm_bindgen]
pub async fn create_wallet() -> String {
   let mnemonic =  wallet::generate_pass_phrase();
   let mnemonic_string = mnemonic.phrase().to_string();
    let (secret_key,public_key) = wallet::generate_key_pair(&mnemonic);
    let mut wallet = wallet::Wallet::new(&secret_key , &public_key);
    wallet.set_mnemonic(mnemonic_string);
    let serialized = serde_json::to_string(&wallet).unwrap();
    serialized
}


#[wasm_bindgen]
pub async fn get_wallet_address(wallet_string: String)->String{
    // Deserialize the JSON string back to the struct
    let wallet: wallet::Wallet = serde_json::from_str(&wallet_string).unwrap();
    wallet.get_wallet_address()
}

#[wasm_bindgen]
pub async fn get_wallet_mnemonic(wallet_string: String)->String{
    
    let wallet: wallet::Wallet = serde_json::from_str(&wallet_string).unwrap();
    wallet.get_wallet_mnemonic()
}


#[wasm_bindgen(module = "/src/progress.ts")]
extern "C" {
    pub fn report_progress(msg: &str);
}
