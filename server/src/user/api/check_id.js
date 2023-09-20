// modules
const express = require("express");
const sessionAuth = require("../../api/sessionAuth");
const router = express.Router();
// our_modules
const userContext = require("../user_context");
const { checkId } = require("../../util/check_user_input");

router.post("/", async (req, res) => {
  try {
    const new_id = req.body.id;

    if (!checkId(new_id)) {
      return res.status(400).json({
        success: false,
        error: "잘못된 입력!",
      });
    }

    const same_id_user = await userContext.getUserDataById(new_id);

    const result = same_id_user === null;

    const error_str = result ? "" : "중복된 아이디입니다.";

    return res.status(200).json({ success: result, error: error_str });
  } catch (err) {
    console.error(err);
    return res
      .status(500)
      .json({ success: false, error: "server error:" + err });
  }
});

module.exports = router;
