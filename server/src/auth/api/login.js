const express = require("express");
const router = express.Router();
const authContext = require("../auth_context");
const userContext = require("../../user/user_context");

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  // email, password 규칙 확인 로직을 함수로 만들기
  // 해당 로직으로 email, password 확인해서 에러처리하기
  if (!email.length || !password.length) {
    res.status(400).json({ success: false, error: "잘못된 입력." });
    return;
  }

  const user_data = await authContext.getUserDataByEmail(email);

  if (!user_data) {
    res.status(401).json({ success: false, error: "Wrong Email!" });
    return;
  }

  const convert_password = await userContext.convertPassword(
    password,
    user_data.convert_key
  );

  if (user_data.password != convert_password) {
    res.status(401).json({ success: false, error: "Password is not Correct." });
    return;
  }

  const token = authContext.createToken(user_data);

  req.session.token = token;

  res.status(200).json({
    success: true,
    nickname: user_data.nickname,
    email: email,
    login_time: new Date(),
    error: "",
  });
});

module.exports = router;
