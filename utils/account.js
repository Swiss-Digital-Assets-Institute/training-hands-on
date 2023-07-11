// Import hedera SDK
const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

/**
 * This function generates a new ED25519 key pair and uses it to create a new Hedera account.
 * It then retrieves and prints the account ID, Private Key and Public Key of the new account.
 *
 * @returns {Object} - Object with the new account's ID, private key, and public key
 */
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
    .setMaxAutomaticTokenAssociations(10)
    .execute(client);

  // Get the new account ID
  const getReceipt = await newAccount.getReceipt(client);
  const newAccountId = getReceipt.accountId;

  //Log the account ID
  console.log("The new account ID is: " + newAccountId);

  return {
    accountId: newAccountId,
    privateKey: newAccountPrivateKey,
    publicKey: newAccountPublicKey,
  };
}

/**
 * This function retrieves and prints the balance of the provided Hedera account.
 *
 * @param {string} accountId - The ID of the account to query
 */
async function queryAccount(accountId) {
  console.info("Calling queryAccount function");
  // Init operator
  client = await operator.initOperator();
  // Create and execute the query
  const query = await new hedera.AccountBalanceQuery()
    .setAccountId(accountId)
    .execute(client);

  // Execute whole Query
  console.log(`Query result for account: ${accountId}`);
  console.log(JSON.stringify(query));
}

/**
 * This function approves a specified amount of Hbar to be spent from the operator's account by another Hedera account.
 *
 * @param {string} spenderAccountId - The ID of the account that the allowance is being granted to
 * @param {number} amount - The amount of Hbar to approve for allowance
 */
async function transferHbar(receiverAccountId, amount) {
  // Init operator
  client = await operator.initOperator();
  // Create the transfer transaction
  const transaction = new hedera.TransferTransaction()
    .addHbarTransfer(operatorConfig.operatorAccountId, new hedera.Hbar(-amount))
    .addHbarTransfer(receiverAccountId, new hedera.Hbar(amount));

  console.log(
    `Going to transfer ${amount}Hbar from ${operatorConfig.operatorAccountId} to ${receiverAccountId}`
  );

  // Sign with the client operator key and submit the transaction to a Hedera network
  const txId = await transaction.execute(client);

  // Request the receipt of the transaction
  const receipt = await txId.getReceipt(client);

  // Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status is " + transactionStatus);
}

/**
 * This function uses a provided private key to spend an approved amount of Hbar from the operator's account to another Hedera account.
 * 
 * @param {string} spenderAccountId - The ID of the account that the allowance is being granted to
 * @param {string} spenderPrivateKey - The private key of the account that the allowance is being granted to
 * @param {string} receiverAccountId - The ID of the account to receive the allowance
 * @param {number} amount - The amount of Hbar to transfer
 */
async function hbarAllowance(spenderAccountId, amount) {
  // Init operator
  client = await operator.initOperator();

  console.log("Creating allowance transaction");
  //Create allowance transaction
  const transaction = await new hedera.AccountAllowanceApproveTransaction()
    .approveHbarAllowance(
      operatorConfig.operatorAccountId,
      spenderAccountId,
      hedera.Hbar.from(amount)
    )
    .execute(client);

  //Request the receipt of the transaction
  const receipt = await transaction.getReceipt(client);

  console.log(
    "The transaction consensus status is " + receipt.status.toString()
  );
}

async function spendAllowance(
  spenderAccountId,
  spenderPrivateKey,
  receiverAccountId,
  amount
) {
  // Init operator
  client = await operator.initOperator();

  console.log("Creating transaction to send allowance");
  const prepTransaction = await new hedera.TransferTransaction()
    .addApprovedHbarTransfer(
      operatorConfig.operatorAccountId,
      new hedera.Hbar(-amount)
    )
    .addHbarTransfer(receiverAccountId, new hedera.Hbar(amount))
    .setTransactionId(hedera.TransactionId.generate(spenderAccountId)) // Spender must generate the TX ID or be the client
    .freezeWith(client)
    .sign(spenderPrivateKey);

  const transaction = await prepTransaction.execute(client);
  //Request the receipt of the transaction
  const receipt = await transaction.getReceipt(client);

  console.log(
    "The transaction consensus status is " + receipt.status.toString()
  );
}

// Export Module
module.exports = {
  createAccount,
  queryAccount,
  transferHbar,
  hbarAllowance,
  spendAllowance,
};
