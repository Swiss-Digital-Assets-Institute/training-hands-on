const account = require("./account");
const operator = require("./operator");
const token = require("./token");
const nft = require("./nft");

module.exports = {
  ...account,
  ...operator,
  ...token,
  ...nft,
};
