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

async function deleteToken(tokenId) {
  // Init operator
  client = await operator.initOperator();
  // Create and execute TokenTransaction
  const transaction = await new hedera.TokenDeleteTransaction()
    .setTokenId(tokenId)
    .execute(client);

  console.log("Token deleted :(");
}

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
