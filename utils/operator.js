var Hedera = require("@hashgraph/sdk");
const operator = require("../operator.json");

async function initOperator() {
  // Init Operator
  const operatorAccountId = Hedera.AccountId.fromString(
    operator.operatorAccountId
  );
  const operatorPrivateKey = Hedera.PrivateKey.fromString(
    operator.operatorPrivateKey
  );
  // Create a client and return it
  const client = Hedera.Client.forTestnet();
  client.setOperator(operatorAccountId, operatorPrivateKey);
  return client;
}

module.exports = {
  initOperator,
};
