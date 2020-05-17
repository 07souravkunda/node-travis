const keygrip = require("keygrip");
const Buffer = require("safe-buffer").Buffer;

module.exports = user => {
  const sessionObject = {
    passport: {
      user: user._id.toString()
    }
  };
  const sessionString = Buffer.from(JSON.stringify(sessionObject)).toString(
    "base64"
  );
  let key = new keygrip(["randomstringhere"]);
  const sig = key.sign("express:sess=" + sessionString);
  return { session: sessionString, sig };
};
