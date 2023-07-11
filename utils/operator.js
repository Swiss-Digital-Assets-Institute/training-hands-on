const hedera = require("@hashgraph/sdk");
const operator = require("../operator.json");

/**
 * This function initializes a client using the Hedera Hashgraph SDK.
 * The client is set up for the testnet network and the operator is set using an operator ID and private key.
 * The operator ID and private key are fetched from an 'operator.json' file.
 *
 * @returns {Object} client - An instance of the Hedera Hashgraph client connected to the testnet network and configured with the operator
 */
async function initOperator() {
  // Init Operator
  const operatorAccountId = hedera.AccountId.fromString(
    operator.operatorAccountId
  );
  const operatorPrivateKey = hedera.PrivateKey.fromString(
    operator.operatorPrivateKey
  );
  // Create a client and return it
  const client = hedera.Client.forTestnet();
  client.setOperator(operatorAccountId, operatorPrivateKey);
  return client;
}

module.exports = {
  initOperator,
};
