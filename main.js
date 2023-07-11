var utils = require("./utils");

async function main() {
  // Create a Account on testnet with 10 Hbar
  // const { accountId, privateKey, publicKey } = await utils.createAccount();

  // Query the balance of an account
  // await utils.queryAccount(accountId);

  // Transfer more Hbar to the new account
  // await utils.transferHbar(account.accountId, 10);

  // Create allowance for account
  // await utils.hbarAllowance(accountId, 10);

  // Send Crypto with that allowance
  // await utils.spendAllowance(accountId, privateKey, "0.0.5485", 10);

  // Create Token
  // const tokenId = await utils.createToken("UniZüri", "UZH");

  // Delete Token
  // await utils.deleteToken(tokenId);

  // Mint more Tokens
  // await utils.mintMoreToken(tokenId, 1000);

  // Create Nft
  // const nftId = await utils.createNft();

  // Mint Nft
  // await utils.mintNft(nftId);

  // Burn Nft
  // await utils.burnNft(nftId, 1)

  process.exit();
}

main();
