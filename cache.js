const mongoose = require("mongoose");
const redis = require("redis");
const redisUrl = "redis://127.0.0.1:6379";
const client = redis.createClient(redisUrl);
const util = require("util");
client.hget = util.promisify(client.hget);
const exec = mongoose.Query.prototype.exec;

mongoose.Query.prototype.cache = function (options = {}) {
  this.isCache = true;
  this.hashKey = JSON.stringify(options.key || "");

  return this;
};

mongoose.Query.prototype.exec = async function () {
  if (!this.isCache) {
    return exec.apply(this, arguments);
  }
  console.log("THIS IS QUERY MIDDLEWARE..");
  let key = {
    collection: this.mongooseCollection.name,
    query: this.getQuery(),
    filter: this.getFilter(),
    option: this.getOptions(),
  };
  key = JSON.stringify(key);
  console.log(key, "this is key");
  let redisBlog = await client.hget(this.hashKey, key);
  redisBlog = JSON.parse(redisBlog);
  if (redisBlog) {
    console.log("serving from redis");
    console.log(redisBlog);
    return Array.isArray(redisBlog)
      ? redisBlog.map((doc) => new this.model(doc))
      : new this.model(redisBlog);
  }
  const doc = await exec.apply(this, arguments);
  client.hmset(this.hashKey, key, JSON.stringify(doc), "EX", 10);
  console.log("serving from mongodb");
  return doc;
};

exports.mongoose = mongoose;

exports.clearCache = (hashKey) => {
  client.del(JSON.stringify(hashKey));
  console.log("cleared");
};
