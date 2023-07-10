const hedera = require("@hashgraph/sdk");
const operator = require("../operator.json");

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
