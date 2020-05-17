const { mongoose } = require("./cache");
// const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now },
  _user: {
    type: String,
    ref: "User",
    default: "110924159541014275928",
  },
});

// blogSchema.pre(/^find/g, async function(next) {
//   // console.log("before mongodb");
//   console.log(await redis.redisGet("find", this));
//   if (await redis.redisGet( this)) {
//     console.log("returning");
//     this.set;
//     return next();
//   }
//   next();
//   // if(redis.redisGet())
// });
// blogSchema.post(/^find/g, function(doc, next) {
//   // console.log(doc, "serving after mongodb");
//   redis.redisSet(this.key, doc);
//   next();
// });
const blogModel = mongoose.model("Blog", blogSchema);

module.exports = blogModel;
