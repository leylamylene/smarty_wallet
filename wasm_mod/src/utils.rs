

use sha3::{Digest, Keccak256};
use secp256k1::{Message, Secp256k1, SecretKey, Signature};
use std::convert::TryInto;



 // Example transaction data
//  let nonce = 0u64;
//  let gas_price = 20_000_000_000u64;
//  let gas_limit = 21_000u64;
//  let to = [0u8; 20];
//  let value = 1_000_000_000_000_000_000u64;
//  let data = vec![];

//  // Create the transaction hash
//  let tx_hash = create_transaction_hash(nonce, gas_price, gas_limit, to, value, data);

//  // Sign the transaction hash
//  let private_key = [0u8; 32]; // Replace with your private key
//  let signature = sign_transaction_hash(&tx_hash, &private_key);

//  // Serialize the signed transaction
//  let signed_tx = serialize_signed_transaction(nonce, gas_price, gas_limit, to, value, data, signature);

//  println!("Signed transaction: {:?}", signed_tx);


fn create_transaction_hash(nonce: u64, gas_price: u64, gas_limit: u64, to: [u8; 20], value: u64, data: Vec<u8>) -> [u8; 32] {
  let mut hasher = Keccak256::new();
  hasher.update(&nonce.to_be_bytes());
  hasher.update(&gas_price.to_be_bytes());
  hasher.update(&gas_limit.to_be_bytes());
  hasher.update(&to);
  hasher.update(&value.to_be_bytes());
  hasher.update(&data);
  hasher.finalize().try_into().expect("Hashing failed")
}

fn sign_transaction_hash(tx_hash: &[u8; 32], private_key: &[u8; 32]) -> Signature {
  let secp = Secp256k1::new();
  let msg = Message::from_slice(tx_hash).expect("32 bytes");
  let sk = SecretKey::from_slice(private_key).expect("32 bytes");
  secp.sign(&msg, &sk)
}

fn serialize_signed_transaction(nonce: u64, gas_price: u64, gas_limit: u64, to: [u8; 20], value: u64, data: Vec<u8>, signature: Signature) -> Vec<u8> {
  // Serialize the transaction with the signature
  // This is a simplified example and may need adjustments for real-world use
  let mut tx = vec![];
  tx.extend(&nonce.to_be_bytes());
  tx.extend(&gas_price.to_be_bytes());
  tx.extend(&gas_limit.to_be_bytes());
  tx.extend(&to);
  tx.extend(&value.to_be_bytes());
  tx.extend(&data);
  tx.extend(&signature.serialize_compact());
  tx
}