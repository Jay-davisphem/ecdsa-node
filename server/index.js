const express = require("express");
const app = express();
const cors = require("cors");
const { toHex } = require("ethereum-cryptography/utils");
const port = 3042;

const { getPrivKey, getAddr } = require("./scripts/generate");
app.use(cors());
app.use(express.json());
const privates = Array(3)
  .fill(0)
  .map(() => toHex(getPrivKey()));
console.log(privates);
const balances = {};
balances[toHex(getAddr(privates[0]))] = 1000;
balances[toHex(getAddr(privates[1]))] = 400;
balances[toHex(getAddr(privates[2]))] = 2000;
console.log(balances);
app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  //const address = getAddress(getPubKey(privateKey));
  //console.log(address, 666);
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  // TODO: get a signature
  //       recover from the signature
  //       Not allowing the client to set the sender
  const { sender, recipient, amount } = req.body;
  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
  console.log(sender, recipient, amount);
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
