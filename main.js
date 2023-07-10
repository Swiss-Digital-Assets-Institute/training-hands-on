var utils = require("./utils");

async function main() {
  // Create a Account on testnet with 10 Hbar
  // accountId = await utils.createAccount();
    accountId = "0.0.15072865"
  // Query the balance of an account
  await utils.queryAccount(accountId);
}

main();
