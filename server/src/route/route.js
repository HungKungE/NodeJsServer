const express = require("express");

const router = express.Router();
const authRouter = require("../auth/auth");
const userRouter = require("../user/user");
const fileRouter = require("../file/file");

// api 엔드 포인트 등록
router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/file", fileRouter);

module.exports = router;
