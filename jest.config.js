const configBase = require("./jest.config.base.js");
const { name } = require("./package.json");

module.exports = {
  ...configBase,
  name,
  displayName: name,
};
