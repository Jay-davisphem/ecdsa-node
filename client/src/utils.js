import secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
export const getPubKey = (privKey) => secp.getPublicKey(privKey);
export const getAddress = (pubKey) => keccak256(pubKey.slice(1).slice(-20));
