const mongoose = require("mongoose");
const User = require("../../userModel");

module.exports = () => {
  return User.create({ name: "test" });
};
