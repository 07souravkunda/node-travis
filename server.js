const express = require("express");
const mongoose = require("mongoose");
const app = express();
const passport = require("passport");
const authRouter = require("./authRouter");
const blogRouter = require("./blogRouter");
const bodyParser = require("body-parser");
const User = require("./userModel");
const cookieSession = require("cookie-session");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(bodyParser());
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    keys: ["randomstringhere"],
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(authRouter);
app.use(blogRouter);
app.get("/auth-details", async (req, res, next) => {
  console.log(req.user);
  if (req.user) {
    const user = await User.findById(req.user);
    res.status(200).json({
      status: "success",
      user,
    });
  } else {
    res.status(200).json({
      status: "success",
      user: null,
    });
  }
});

app.get("/logout", (req, res) => {
  req.logout();
  res.status(200).json({
    status: "success",
    data: null,
  });
});

mongoose
  .connect(
    "mongodb+srv://sourav:F2dzGDHQw1oK5RWJ@cluster0-5psdt.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false } //mongodb+srv://sourav:F2dzGDHQw1oK5RWJ@cluster0-5psdt.mongodb.net/test?retryWrites=true&w=majority
    //   er => {
    //     if (er) {
    //       console.log(er);
    //     } else console.log("database connected..");
    //   }
  )
  .then((er) => {
    // if (er) {
    //   console.log(er, "error");
    // } else {
    console.log("db connected");
    // }
  });

const path = require("path");
app.use(express.static(path.resolve("blogapp", "build")));

app.get("*", (req, res) => {
  console.log("hello");
  console.log(path.resolve("blogapp", "build", "index.html"));
  res.setHeader("content-type", "text/html");
  res.sendFile(path.resolve("blogapp", "build", "index.html"));
});

app.listen(3000, () => {
  console.log("app listening..");
});
