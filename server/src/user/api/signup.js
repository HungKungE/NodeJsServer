// modules
const express = require("express");
const router = express.Router();
// our_modules
const userContext = require("../user_context");
const { checkPassword, checkId } = require("../../util/check_user_input");

// api - 회원 가입
router.post("/", async (req, res) => {
  try {
    const { id, password, email } = req.body;

    // DB 보내기 전에 데이터를 확인해서 에러처리
    if (!checkId(id)) {
      return res.status(400).json({
        success: false,
        error: "ID 정책 위반!",
      });
    }

    if (!checkPassword(password)) {
      return res.status(400).json({
        success: false,
        error: "비밀번호 정책 위반!",
      });
    }

    const convert_key = await userContext.createRandomString();

    const convert_password = await userContext.convertPassword(
      password,
      convert_key
    );

    await userContext.createUserInfo(id, email, convert_password, convert_key);

    return res.status(200).json({ success: true, error: "" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ success: false, error: "server error" });
  }
});

module.exports = router;
