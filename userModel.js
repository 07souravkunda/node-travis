const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  googleId: String,
  name: String,
  __v: {
    select: false
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
