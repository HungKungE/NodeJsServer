const express = require("express");
const router = express.Router();
const authContext = require("../auth_context");
const userContext = require("../../user/user_context");
const { checkPassword, checkId } = require("../../util/check_user_input");

router.post("/", async (req, res) => {
  const { id, password } = req.body;

  // email, password 규칙 확인 로직을 함수로 만들기
  // 해당 로직으로 email, password 확인해서 에러처리하기
  if (!checkId(id) || !checkPassword(password)) {
    res.status(400).json({
      success: false,
      error: "잘못 입력하셨습니다. 다시 확인해주세요",
    });
    return;
  }

  const user_data = await authContext.getUserDataById(id);

  if (!user_data) {
    res
      .status(401)
      .json({ success: false, error: "이메일이 존재하지 않습니다!" });
    return;
  }

  const convert_password = await userContext.convertPassword(
    password,
    user_data.convert_key
  );

  if (user_data.password != convert_password) {
    res
      .status(401)
      .json({ success: false, error: "비밀번호가 일치하지 않습니다!" });
    return;
  }

  const token = authContext.createToken(user_data);

  req.session.token = token;

  res.status(200).json({
    success: true,
    id: user_data.ID,
    email: user_data.email,
    login_time: new Date(),
    error: "",
  });
});

module.exports = router;
