const secp = require("ethereum-cryptography/secp256k1");
const { keccak256 } = require("ethereum-cryptography/keccak");
const { toHex } = require("ethereum-cryptography/utils");

const getPrivKey = () => secp.utils.randomPrivateKey();
const getPubKey = (privKey) => secp.getPublicKey(privKey);
const getAddress = (pubKey) => keccak256(pubKey.slice(1).slice(-20));
const getAddr = (privKey) =>
  keccak256(secp.getPublicKey(privKey).slice(1).slice(-20));
/*for (let i = 0; i < 3; i++) {
  const privKey = getPrivKey();
  const pubKey = getPubKey(privKey);
  const address = getAddress(pubKey);

  console.log("private key:", toHex(privKey));
  console.log(
    "public key:",
    toHex(pubKey),
    "\ngenerates an address:",
    toHex(address)
  );
}*/
module.exports = { getAddr, getPrivKey, getPubKey, getAddress, toHex };
