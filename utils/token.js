const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

/**
 * This function creates a new fungible token with a unique token name and symbol.
 * The initial supply of the token is set to 2000 with a maximum supply of 10000.
 *
 * @param {string} tokenName - The unique name of the token to create
 * @param {string} tokenSymbol - The unique symbol of the token to create
 *
 * @returns {string} tokenId - The ID of the newly created token
 */
async function createToken(tokenName, tokenSymbol) {
  // Init operator
  client = await operator.initOperator();
  // Create and execute TokenTransaction
  const transaction = await new hedera.TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setTokenMemo("Token for UZH")
    .setTokenType(hedera.TokenType.FungibleCommon)
    .setTreasuryAccountId(operatorConfig.operatorAccountId)
    .setInitialSupply(2000)
    .setSupplyType(hedera.TokenSupplyType.Finite)
    .setMaxSupply(10000)
    //.setDecimals(2)
    .setAdminKey(hedera.PublicKey.fromString(operatorConfig.operatorPublicKey))
    .setSupplyKey(hedera.PublicKey.fromString(operatorConfig.operatorPublicKey))
    .execute(client);

  //Get the receipt of the transaction
  const receipt = await transaction.getReceipt(client);

  //Get the token ID from the receipt
  const tokenId = receipt.tokenId;

  console.log("The new token ID is " + tokenId);
  console.log(
    `Check it out on hashscan: https://hashscan.io/testnet/token/${tokenId}`
  );
  return tokenId;
}

/**
 * This function deletes a previously created token using its token ID.
 *
 * @param {string} tokenId - The ID of the token to delete
 */
async function deleteToken(tokenId) {
  // Init operator
  client = await operator.initOperator();
  // Create and execute TokenTransaction
  const transaction = await new hedera.TokenDeleteTransaction()
    .setTokenId(tokenId)
    .execute(client);

  console.log("Token deleted");
}

/**
 * This function mints (creates) more of a previously created fungible token using its token ID.
 * The amount of tokens to mint is specified as an input parameter.
 *
 * @param {string} tokenId - The ID of the token to mint
 * @param {number} amount - The amount of tokens to mint
 */
async function mintMoreToken(tokenId, amount) {
  // Init operator
  client = await operator.initOperator();

  //Create the transaction and freeze for manual signing
  const transaction = await new hedera.TokenMintTransaction()
    .setTokenId(tokenId)
    .setAmount(amount)
    .execute(client);

  console.log(`Total token supply increased by ${amount}`);
}

module.exports = { createToken, deleteToken, mintMoreToken };
