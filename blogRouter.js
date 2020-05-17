const express = require("express");
const router = express.Router();
// const redis = require("./redis");
const { clearCache } = require("./cache");

const Blog = require("./blogModel");

router
  .route("/api/blogs")
  .get(async (req, res, next) => {
    try {
      // const redis = require("redis");
      // const redisUrl = "redis://localhost:6379";
      // const client = redis.createClient(redisUrl);
      // const util = require("util");
      // client.get = util.promisify(client.get);

      // const redisBlog = await client.get(req.user.googleId);

      // if (redisBlog) {
      //   console.log("SERVING FROM REDIS");

      //   return res.status(200).json({
      //     status: "success",
      //     data: JSON.parse(redisBlog)
      //   });
      // }
      // redis.getRes(res);
      console.log(req.user, "user");
      const data = await Blog.find({ _user: req.user }).cache({
        key: req.user,
      });
      console.log(data);
      // console.log(req);
      //   const data = await Blog.find({ _user: "110924159541014275928" });
      // console.log("SERVING FROM MONGODB");
      res.status(200).json({
        status: "success",
        data,
      });

      // client.set(req.user.googleId, JSON.stringify(data));
    } catch (er) {
      console.log(er);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(req.body);
      const data = await Blog.create({
        title: req.body.title,
        content: req.body.content,
        _user: req.user,
      });
      res.status(200).json({
        status: "success",
        data,
      });
    } catch (er) {
      console.log(er);
    }
    clearCache(req.user);
  });

router.route("/api/blogs/:id").get(async (req, res, next) => {
  try {
    // const data = await Blog.findOne({
    //   _user: "110924159541014275928",
    //   _id: req.params.id
    // });

    const data = await Blog.findOne({
      _user: req.user,
      _id: req.params.id,
    }).cache({ key: req.user });
    res.status(200).json({
      status: "success",
      data,
    });
  } catch (er) {
    console.log(er);
  }
});

module.exports = router;
