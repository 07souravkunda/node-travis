const express = require("express");
const passport = require("./passport");
const router = express.Router();

router.route("/auth/google").get(
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
);

router.route("/auth/google/callback").get(
  passport.authenticate("google", {
    successRedirect: "http://localhost:3001/",
    failureRedirect: "http://localhost:3001/"
  })
);

// router.route("/authentication-details").get((req, res, next) => {
//   console.log(req.user);
//   if (req.user) {
//     res.status(200).json({
//       status: "success",
//       user: req.user
//     });
//   } else {
//     res.status(404).json({
//       status: "success",
//       user: null
//     });
//   }
// });

module.exports = router;
