// modules
const express = require("express");
const router = express.Router();
// our_modules
const SignUp = require("./api/signup");
const CheckId = require("./api/check_id");
const UpdatePassword = require("./api/update_password");

router.use("/signup", SignUp);
router.use("/check/id", CheckId);
router.use("/update/password", UpdatePassword);

module.exports = router;
