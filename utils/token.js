const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

async function createToken(tokenName, tokenSymbol) {
  // Init operator
  client = await operator.initOperator();
  // Create and execute TokenTransaction
  const transaction = await new hedera.TokenCreateTransaction()
    .setTokenName(tokenName)
    .setTokenSymbol(tokenSymbol)
    .setTokenType(hedera.TokenType.FungibleCommon)
    .setTreasuryAccountId(operatorConfig.operatorAccountId)
    .setInitialSupply(2000)
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
  return tokenId
}

async function deleteToken(tokenId) {
  // Init operator
  client = await operator.initOperator();
  // Create and execute TokenTransaction
  const transaction = await new hedera.TokenDeleteTransaction()
    .setTokenId(tokenId)
    .execute(client);

  console.log("Token deleted :(");
}

module.exports = { createToken, deleteToken };
