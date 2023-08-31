const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const multer = require("multer");
const sessionAuth = require("../api/sessionAuth");
const emoticonContext = require("./emoticon_context");
const fs = require("fs");
dotenv.config();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const folderPath = `/home/hungkunge/NodeJsServer/upload_images/${req.body.emoticon_name}`;
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }
    cb(null, folderPath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname + "-" + Date.now() + ".png");
  },
});

const upload = multer({ storage: storage });

// 새로운 폴더 생성
router.post(
  "/",
  sessionAuth,
  upload.fields([{ name: "mainItem", maxCount: 1 }, { name: "subItems" }]),
  async (req, res) => {
    try {
      const emoticon_name = req.body.emoticon_name;
      const user_id = req.user_info.user_id;
      const main_item = req.files["mainItem"][0];

      // DB에 새로운 emoticon 추가
      const new_emoticon = await emoticonContext.createEmoticon(emoticon_name);
      const emoticonId = new_emoticon.emoticon_id;

      await emoticonContext.createEmoticonUploader(user_id, emoticonId);
      await emoticonContext.createEmoticonUsage(user_id, emoticonId);

      // DB에 emoticon_item들을 추가
      const itemNameList = req.files["subItems"].map((img) => {
        return img.path;
      });

      const emotion_item_list = [];

      if (main_item) {
        const main_emoticon_item = {
          emoticon_id: emoticonId,
          emoticon_item_name: req.files["mainItem"][0].path,
          is_main_image: true,
        };

        emotion_item_list.push(main_emoticon_item);
      }

      for (const itemName of itemNameList) {
        const emoticon_item = {
          emoticon_id: emoticonId,
          emoticon_item_name: itemName,
          is_main_image: false,
        };

        emotion_item_list.push(emoticon_item);
      }

      console.log("이모티콘 아이템: " + emotion_item_list);

      await emoticonContext.createMultiEmoticonItem(emotion_item_list);

      return res.status(200).json({ success: true, error: "" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ success: false, error: "server error" });
    }
  }
);

// 폴더 리스트 제공
router.get("/", sessionAuth, async (res, req) => {
  try {
    const user_id = req.user_info.user_id;
    const usage_emoticon_list = await emoticonContext.getUsageEmoticons(
      user_id
    );

    if (!usage_emoticon_list.length) {
      console.log(error);
      return res.status(500).json({ success: false, error: "empty" });
    }

    return res.status(200).json({ success: true, error: "" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error: "server error" });
  }
  // emotion_usage에서 user_id에 따른 모든 emoticon_id를 제공
  // emoticon_id로 emoticon_item의 is_main_item이 true인 것을 받아옴
  // {id, item}.list를 전달
});

router.get("/items", sessionAuth, async (res, req) => {
  try {
    const user_id = req.user_info.user_id;
    const user_folder_list = await emoticonContext.getFolderList(user_id);
    return res.status(200).json({ success: true, error: "" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: true, error: "server error" });
  }
  // folder_id의 image_id를 다 제공함
  // image_id -> image_name을 가져옴
  // 사용자에게 user_id, img_name를 통한 url.list를 전달
});

module.exports = router;
