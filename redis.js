const redis = require("redis");
const redisUrl = "redis://localhost:6379";
const client = redis.createClient(redisUrl);
const util = require("util");
client.get = util.promisify(client.get);
let key, res;
exports.getRes = reso => {
  res = reso;
};
const get = async () => {
  // console.log()
  try {
    const redisBlog = await client.get(key);
    console.log(redisBlog);
    if (redisBlog) {
      console.log("SERVING FROM REDIS");
      res.status(200).json({
        status: "success",
        data: JSON.parse(redisBlog)
      });
      return true;
    }
    return false;
  } catch (er) {
    console.log(er);
  }
};

exports.redisGet = async _this => {
  let key = {
    collection: _this.mongooseCollection.name,
    query: _this.getQuery(),
    filter: _this.getFilter(),
    option: _this.getOptions()
  };
  key = JSON.stringify(key);
  _this.key = key;
  console.log(key);
  return await get();
};

exports.redisSet = (key, value) => {
  let val;
  console.log("setting");
  if (typeof value === "object") {
    val = JSON.stringify(value);
  }
  client.set(key, val);
};
