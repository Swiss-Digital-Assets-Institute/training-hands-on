const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

async function createTopic() {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();

  const transaction = await new hedera.TopicCreateTransaction()
    .setAdminKey(operatorConfig.operatorPublicKey)
    .setSubmitKey(operatorConfig.operatorPublicKey)
    .setTopicMemo("A personal Topic")
    .execute(client);

  //Request the receipt of the transaction
  const receipt = await transaction.getReceipt(client);

  //Get the topic ID
  const newTopicId = receipt.topicId;

  console.log("The new topic ID is " + newTopicId);

  return newTopicId;
}

async function submitMessage(topicId) {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();
}

async function getTopicMessages(topicId) {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();
}

async function deleteTopic(topicId) {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();
}

module.exports = { createTopic, submitMessage, getTopicMessages, deleteTopic };
