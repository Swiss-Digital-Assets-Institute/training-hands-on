// Import hedera SDK
var hedera = require("@hashgraph/sdk");
var operator = require("./operator");

async function createAccount() {
  // Create new ED25519 key pair
  const newAccountPrivateKey = hedera.PrivateKey.generateED25519();
  const newAccountPublicKey = newAccountPrivateKey.publicKey;

  // Print the PrivatKey and Public Key
  console.log(`PrivatKey: ${newAccountPrivateKey.toString()}`);
  console.log(`PublicKey: ${newAccountPublicKey.toString()}`);

  // Init operator
  client = await operator.initOperator();

  // Create a new account with 10 Hbar starting balance
  const newAccount = await new hedera.AccountCreateTransaction()
    .setKey(newAccountPublicKey)
    .setInitialBalance(new hedera.Hbar(100))
    .execute(client);

  // Get the new account ID
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  //Log the account ID
  console.log("The new account ID is: " + newAccountId);

  return newAccountId;
}

async function queryAccount(accountId) {
  // Init operator
  client = await operator.initOperator();
  // Create and execute the query
  const query = await new hedera.AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  // Execute whole Query
  console.log(JSON.stringify(query));

  process.exit();
}

// Export Module
module.exports = {
  createAccount,
  queryAccount,
};
