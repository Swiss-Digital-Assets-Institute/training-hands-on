const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

const contract = require("../artifacts/contracts/HelloHedera.sol/HelloHedera.json");
const bytecode = contract.bytecode;

/**
 * Deploys the smart contract to the Hedera network.
 *
 * @returns {string} - The new contract's ID
 */
async function deployContract() {
  // Init client
  console.log("Initializing the client...");
  client = await operator.initOperator();

  //Create the transaction
  console.log("Create and execute transaction to deploy contract...");
  const contractTx = await new hedera.ContractCreateFlow()
    .setGas(100000)
    .setBytecode(bytecode)
    .setConstructorParameters(
      new hedera.ContractFunctionParameters().addString(
        "Greetings from Hedera!"
      )
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

/**
 * Calls the 'greet' function of the provided smart contract.
 *
 * @param {string} contractId - The ID of the contract to call
 */
async function callGreetFunction(contractId) {
  // Init client
  console.log("Initializing the client...");
  client = await operator.initOperator();

  // Calls a function of the smart contract
  console.log("Create and execute query");
  const contractQuery = await new hedera.ContractCallQuery()
    //Set the gas for the query
    .setGas(100000)
    //Set the contract ID to return the request for
    .setContractId(contractId)
    //Set the contract function to call
    .setFunction("greet")
    //Set the query payment for the node returning the request
    //This value must cover the cost of the request otherwise will fail
    .setQueryPayment(new hedera.Hbar(2))
    .execute(client);

  // Get a string from the result at index 0
  const message = contractQuery.getString(0);

  //Log the message
  console.log("The contract message: " + message);
}

/**
 * Calls the 'setGreeting' function of the provided smart contract with a new greeting message.
 *
 * @param {string} contractId - The ID of the contract to call
 * @param {string} newGreetingMessage - The new greeting message
 */
async function callSetGreetFunction(contractId, newGreetingMessage) {
  //Create the transaction to update the contract message
  const contractExecTx = await new hedera.ContractExecuteTransaction()
    //Set the ID of the contract
    .setContractId(contractId)
    //Set the gas for the contract call
    .setGas(100000)
    //Set the contract function to call
    .setFunction(
      "setGreeting",
      new hedera.ContractFunctionParameters().addString(newGreetingMessage)
    )
    .execute(client);

  //Get the receipt of the transaction
  const receipt = await contractExecTx.getReceipt(client);

  //Confirm the transaction was executed successfully
  console.log(`The transaction status is ${receipt.status.toString()}`);

  await callGreetFunction(contractId);
}

module.exports = { deployContract, callGreetFunction, callSetGreetFunction };
