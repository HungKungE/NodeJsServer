// modules
const express = require("express");
const sessionAuth = require("../../api/sessionAuth");
const router = express.Router();
// our_modules
const userContext = require("../user_context");

router.post("/", sessionAuth, async (req, res) => {
  try {
    const new_nickname = req.body.nickname;

    if (!new_nickname.length) {
      return res.status(400).json({
        success: false,
        error: "확인할 닉네임을 입력하지 않았습니다.",
      });
    }

    const same_nickname_user = await userContext.getUserDataByNickname(
      new_nickname
    );

    if (same_nickname_user != null) {
      return res
        .status(200)
        .json({ success: false, error: "중복된 닉네임입니다." });
    }

    return res.status(200).json({ success: true, error: "" });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "server error:" + err });
  }
});

module.exports = router;
