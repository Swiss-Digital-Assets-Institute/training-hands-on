const hedera = require("@hashgraph/sdk");
const operator = require("./operator");
const operatorConfig = require("../operator.json");

async function createTopic() {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();

  const transaction = await new hedera.TopicCreateTransaction()
    .setAdminKey(hedera.PublicKey.fromString(operatorConfig.operatorPublicKey))
    .setSubmitKey(hedera.PublicKey.fromString(operatorConfig.operatorPublicKey))
    .setTopicMemo("A personal Topic")
    .execute(client);

  //Request the receipt of the transaction
  const receipt = await transaction.getReceipt(client);

  //Get the topic ID
  const newTopicId = receipt.topicId;

  console.log("The new topic ID is " + newTopicId);

  return newTopicId;
}

async function submitMessage(topicId, message) {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();

  //Create the transaction
  console.log("Create and execute TopicMessageSubmitTransaction");
  await new hedera.TopicMessageSubmitTransaction({
    topicId: topicId,
    message: message,
  }).execute(client);
}

async function getTopicMessages(topicId) {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();

  //Create the query
  console.log("Subscribing to topic");
  new hedera.TopicMessageQuery()
    .setTopicId(topicId)
    .setStartTime(0)
    .setEndTime(15000)
    .subscribe(client, (message) =>
      console.log(Buffer.from(message.contents, "utf8").toString())
    );
}

async function deleteTopic(topicId) {
  // Init operator
  console.log("Initializing the client...");
  client = await operator.initOperator();

  const transaction = await new hedera.TopicDeleteTransaction()
    .setTopicId(topicId)
    .execute(client);

  //Request the receipt of the transaction
  const receipt = await transaction.getReceipt(client);

  //Get the transaction consensus status
  const transactionStatus = receipt.status;

  console.log("The transaction consensus status is " + transactionStatus);
}

module.exports = { createTopic, submitMessage, getTopicMessages, deleteTopic };
