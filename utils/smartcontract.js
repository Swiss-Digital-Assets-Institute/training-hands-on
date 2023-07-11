const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

const contract = require("../artifacts/contracts/HelloHedera.sol/HelloHedera.json");
const bytecode = contract.bytecode;

async function deployContract() {
  console.log("Initializing the client...");
  client = await operator.initOperator();

  //Create the transaction
  console.log("Create and execute transaction to deploy contract...");
  const contractTx = await new hedera.ContractCreateFlow()
    .setGas(100000)
    .setBytecode(bytecode)
    .setConstructorParameters(
      new hedera.ContractFunctionParameters().addString("Hello from Hedera!")
    )
    .execute(client);

  //Get the receipt of the transaction
  const receipt = await contractTx.getReceipt(client);
  console.log(receipt);
  console.log("The new contract ID is " + receipt.contractId);
  console.log(
    `Check it out on hashscan: https://hashscan.io/testnet/contract/${receipt.contractId}`
  );

  return receipt.contractId;
}

module.exports = { deployContract };
