// Import utility functions
const utils = require("./utils");

async function main() {
  console.log("===== Hedera Hashgraph HandsOn =====\n");

  // === SECTION 1: ACCOUNT CREATION ===
  console.log("=== SECTION 1: Account Creation ===\n");

  // Uncomment the lines below to create a new account on the Hedera testnet with an initial balance of 10 Hbar
  // const { accountId, privateKey, publicKey } = await utils.createAccount();
  // console.log('Account created successfully.\n');

  // === SECTION 2: ACCOUNT BALANCE QUERY ===
  console.log("=== SECTION 2: Account Balance Query ===\n");

  // Uncomment the line below to query the balance of the newly created account
  // await utils.queryAccount(accountId);
  // console.log('Balance queried successfully.\n');

  // === SECTION 3: HBAR TRANSFER ===
  console.log("=== SECTION 3: Hbar Transfer ===\n");

  // Uncomment the line below to transfer 10 more Hbars to the newly created account
  // await utils.transferHbar(accountId, 10);
  // console.log('Hbar transferred successfully.\n');

  // === SECTION 4: HBAR ALLOWANCE ===
  // console.log("=== SECTION 4: Hbar Allowance ===\n");

  // Uncomment the line below to create an allowance of 10 Hbars for the new account
  // await utils.hbarAllowance(accountId, 10);
  // console.log('Allowance created successfully.\n');

  // === SECTION 5: SPENDING ALLOWANCE ===
  console.log("=== SECTION 5: Spending Allowance ===\n");

  // Uncomment the line below to send 10 Hbars from the allowance to another account (e.g., "0.0.5485")
  // await utils.spendAllowance(accountId, privateKey, "0.0.5485", 10);
  // console.log('Allowance spent successfully.\n');

  // === SECTION 6: TOKEN CREATION ===
  console.log("=== SECTION 6: Token Creation ===\n");

  // Uncomment the line below to create a new token named "UniZüri" with symbol "UZH"
  // const tokenId = await utils.createToken("UniZüri", "UZH");
  // console.log('Token created successfully.\n');

  // === SECTION 7: TOKEN DELETION ===
  console.log("=== SECTION 7: Token Deletion ===\n");

  // Uncomment the line below to delete the token created in the previous step
  // await utils.deleteToken(tokenId);
  // console.log('Token deleted successfully.\n');

  // === SECTION 8: TOKEN MINTING ===
  console.log("=== SECTION 8: Token Minting ===\n");

  // Uncomment the line below to mint 1000 more of the previously created token
  // await utils.mintMoreToken(tokenId, 1000);
  // console.log('Token minted successfully.\n');

  // === SECTION 9: NFT CREATION ===
  console.log("=== SECTION 9: NFT Creation ===\n");

  // Uncomment the line below to create a new NFT
  // const nftId = await utils.createNft();
  // console.log("NFT created successfully.\n");

  // === SECTION 10: NFT MINTING ===
  console.log("=== SECTION 10: NFT Minting ===\n");

  // Uncomment the line below to mint a new instance of the NFT created in the previous step
  // await utils.mintNft(nftId);
  // console.log("NFT minted successfully.\n");

  // === SECTION 11: NFT BURNING ===
  console.log("=== SECTION 11: NFT Burning ===\n");

  // Uncomment the line below to burn the minted NFT (serial number 1)
  // await utils.burnNft(nftId, 1);
  // console.log('NFT burned successfully.\n');

  // === SECTION 12: Smart Contract deployment ===
  console.log("=== SECTION 12: Smart Contract deployment ===\n");

  // Uncomment the line below to deploy the eSeal contract
  await utils.deployContract();
  // console.log("Contract deployed successfully \n");

  // === SECTION 13: Call smart contract function ===
  console.log("=== SECTION 13: Smart Contract call seal function ===\n");

  // Uncomment the line below to deploy the eSeal contract
  // await utils.sealDocument("0.0.15135574", "operator.json");
  console.log("Document successfully sealed \n");

  console.log("===== End of HandsOn =====\n");

  // End process
  process.exit();
}

// Execute main function
main();
