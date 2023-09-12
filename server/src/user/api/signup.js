// modules
const express = require("express");
const router = express.Router();
// our_modules
const userContext = require("../user_context");
const { checkPassword, checkEmail } = require("../../util/check_user_input");

// api - 회원 가입
router.post("/", async (req, res) => {
  try {
    const { email, password, nickname } = req.body;

    // DB 보내기 전에 데이터를 확인해서 에러처리
    if (!nickname.length || !checkPassword(password) || !checkEmail(email)) {
      return res.status(400).json({
        success: false,
        error: "잘못된 입력입니다.",
      });
    }

    const convert_key = await userContext.createRandomString();

    const convert_password = await userContext.convertPassword(
      password,
      convert_key
    );

    await userContext.createUserInfo(
      email,
      convert_password,
      nickname,
      convert_key
    );

    return res.status(200).json({ success: true, error: "" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

module.exports = router;
