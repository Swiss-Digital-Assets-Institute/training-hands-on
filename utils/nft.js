const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

/**
 * This function creates a new Non-Fungible Token (NFT) with a unique token name and symbol.
 *
 * @param {string} tokenName - The unique name of the NFT to create
 * @param {string} tokenSymbol - The unique symbol of the NFT to create
 *
 * @returns {string} tokenId - The ID of the newly created token
 */
async function createNft(tokenName, tokenSymbol) {
  // Init operator
  client = await operator.initOperator();

  // Create and execute TokenTransaction
  let transaction = await new hedera.TokenCreateTransaction()
    .setTokenName("Jeromes Event Ticket")
    .setTokenSymbol("JET")
    .setTokenType(hedera.TokenType.NonFungibleUnique)
    .setDecimals(0)
    .setInitialSupply(0)
    .setTreasuryAccountId(operatorConfig.operatorAccountId)
    .setSupplyType(hedera.TokenSupplyType.Finite)
    .setMaxSupply(5)
    .setSupplyKey(hedera.PublicKey.fromString(operatorConfig.operatorPublicKey))
    .execute(client);

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
 * This function mints a new NFT using the ID of a previously created token.
 *
 * @param {string} tokenId - The ID of the token to mint
 */
async function mintNft(tokenId) {
  // Init operator
  client = await operator.initOperator();
  //IPFS content identifiers for which we will create a NFT
  CID = "ipfs://bafybeig5vygdwxnahwgp7vku6kyz4e3hdjsg4uikfz5sujbsummozw3wp4";

  // Mint new NFT
  const mintTx = await new hedera.TokenMintTransaction()
    .setTokenId(tokenId)
    .setMetadata([Buffer.from(CID)])
    .execute(client);

  //Get the transaction receipt
  const mintResponse = await mintTx.getReceipt(client);

  //Log the serial number
  console.log(
    `- Created NFT ${tokenId} with serial: ${mintResponse.serials[0].low} \n`
  );

  // Show balance query of operator (treasury)
  let balanceCheckTx = await new hedera.AccountBalanceQuery()
    .setAccountId(operatorConfig.operatorAccountId)
    .execute(client);

  console.log(
    `- User balance: ${balanceCheckTx.tokens._map.get(
      tokenId.toString()
    )} units of token ID ${tokenId}`
  );
}

/**
 * This function mints a new NFT using the ID of a previously created token.
 * 
 * @param {string} tokenId - The ID of the token to mint
 */
async function burnNft(tokenId, serial) {
  // Init operator
  client = await operator.initOperator();

  console.log(`Burning serial: ${serial} of token: ${tokenId}`);
  const burnTx = await new hedera.TokenBurnTransaction()
    .setTokenId(tokenId)
    .setSerials([serial])
    .execute(client);

  //Request the receipt of the transaction
  const receipt = await burnTx.getReceipt(client);

  //Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log(
    `The transaction consensus status: ${transactionStatus.toString()}`
  );
}

module.exports = { createNft, mintNft, burnNft };
