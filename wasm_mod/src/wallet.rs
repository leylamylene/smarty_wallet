use core::fmt;
use serde::{Deserialize, Serialize};
use bip39::{Mnemonic , MnemonicType , Language,Seed};
use secp256k1::{PublicKey, Secp256k1, SecretKey};

pub fn generate_pass_phrase()->Mnemonic {
  Mnemonic::new(MnemonicType::Words12 , Language::English)

}

pub fn generate_key_pair(mnemonic : &Mnemonic)->(SecretKey,PublicKey) {

  //generate seed from mnemonic
  let seed = Seed::new(&mnemonic,"passion");
 
  //Generate key pair
  let secp = Secp256k1::new();
  let secretKey:SecretKey = SecretKey::from_slice(&seed.as_bytes()[0..32]).expect("32 byes within curve order");
  let publicKey :PublicKey = PublicKey::from_secret_key(&secp,&secretKey);
  (secretKey,publicKey)

}


pub fn generate_wallet_address(public_key:&PublicKey) -> String {
  let public_key_bytes = public_key.serialize_uncompressed();
  let hash = tiny_keccak::keccak256(&public_key_bytes[1..]);
  let address = &hash[12..];
  format!("0x{}",hex::encode(address))
}


#[derive(Serialize,Deserialize ,Debug)]
pub struct Wallet {
   secret_key :String,
   public_key :String,
   public_address:String,
   mnemonic:String

}

impl Wallet {
  pub fn new(secret_key :&SecretKey ,public_key :&PublicKey) -> Self {
    let addr = generate_wallet_address(public_key);
    Wallet {
      secret_key : secret_key.to_string(),
      public_key : public_key.to_string(),
      public_address : addr,
      mnemonic : String::new()
    }
  }

  pub fn set_mnemonic(&mut self , mnemonic_string:String) {
    self.mnemonic = mnemonic_string;
  }

  pub fn get_wallet_address(&self) ->String{
    self.public_address.clone()
  }

  pub fn get_private_key(&self) ->String {
    self.secret_key.clone()
  }

  pub fn get_wallet_mnemonic(&self) ->String {
    self.mnemonic.clone()
  }
}


impl fmt::Display for Wallet {
    fn fmt(&self,f:&mut fmt::Formatter)-> fmt::Result {
      write!(f,"Wallet  {{ secret_key: {}, public_key: {},public_address:{} }}", self.secret_key , self.public_key , self.public_address)
    }
}