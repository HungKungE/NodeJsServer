const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const sessionAuth = require("../api/sessionAuth");
const fileContext = require("./file_context");
dotenv.config();

// 새로운 폴더 생성
router.post("/folder", sessionAuth, async(res, req)=>{
  try{
    const f_name = req.body.file_name;
    const user_id = req.user_info.user_id;
    await fileContext.createFolder(f_name, user_id);
    return res.status(200).json({ success: true, error: "" });
  } catch(error){
    console.log(error);
    return res.status(500).json({ success: true, error: "server error" });
  }
});

// 폴더 리스트 제공
router.get("/folder", sessionAuth, async(res, req)=>{
  try{
    const user_id = req.user_info.user_id;
    const user_folder_list = await fileContext.getFolderList(user_id);
    return res.status(200).json({ success: true, error: "" });
  } catch(error){
    console.log(error);
    return res.status(500).json({ success: true, error: "server error" });
  }
  // user_folder에서 user_id에 따른 모든 folder_id를 제공
  // folder_id -> folder_name을 가져옴
  // 사용자에게 {folder_id, folder_name}.list를 전달
});

router.get("/folder/image", sessionAuth, async(res, req)=>{
  // folder_id의 image_id를 다 제공함
  // image_id -> image_name을 가져옴
  // 사용자에게 user_id, img_name를 통한 url.list를 전달
});

router.post("/image", sessionAuth, async(res, req)=>{
  // 이미지 추가
  // folder_id, image_name을 받음
});

router.get("/image/:user_id/:img_name", async (req,res)=>{
  const user_id = req.params.user_id;
  const img_name = req.params.img_name;

  const absol_path = process.env.SAVE_PATH;

  if(!img_name || !user_id){
    return res.status(401).json({success : false, message:"wrong Url."});
  }

  try{
    return res.status(200).sendFile(absol_path+img_name);
  } catch(err){
    console.log(err)
    return res.status(401).json({success : false, message:"no image"});
  }
});

module.exports = router;
