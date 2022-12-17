import server from "./server";
//import { getPubKey, getAddress } from "./utils";
import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

function Wallet({
  address,
  setAddress,
  balance,
  setBalance,
  privateKey,
  setPrivateKey,
}) {
  async function onChange(evt) {
    setAddress("");
    setBalance(0);
    const privateKey = evt.target.value;
    setPrivateKey(privateKey);
    let address = privateKey && secp.getPublicKey(privateKey);
    address = address && toHex(keccak256(address.slice(1).slice(-20)));
    setAddress(address);
    if (privateKey) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
      console.log(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Wallet Private Key
        <input
          placeholder="Type a private key!"
          value={privateKey}
          onChange={onChange}
        ></input>
      </label>
      <label className="address">
        Address: {address && `0x${address.slice(1, 10)}...`}
      </label>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
