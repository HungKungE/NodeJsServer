const dotenv = require("dotenv");
const {
  Emoticon,
  EmoticonUpload,
  EmoticonUsage,
  EmoticonItem,
} = require("../connect/models/emoticon");
dotenv.config();

function createEmoticon(emoticon_name) {
  return new Promise((resolve, reject) => {
    Emoticon.create({
      emoticon_name: emoticon_name,
    })
      .then((emoticon) => {
        resolve(emoticon);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
  });
}

function createEmoticonUploader(uploader_id, emoticon_id) {
  return new Promise((resolve, reject) => {
    EmoticonUpload.create({
      uploader_id: uploader_id,
      emoticon_id: emoticon_id,
    })
      .then((emoticon_upload) => {
        console.log("emoticon_upload:", emoticon_upload);
        resolve(emoticon_upload);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
  });
}

function createEmoticonUsage(requester_id, emoticon_id) {
  return new Promise((resolve, reject) => {
    EmoticonUsage.create({
      requester_id: requester_id,
      emoticon_id: emoticon_id,
    })
      .then((emoticon_usage) => {
        console.log("emoticon_usage:", emoticon_usage);
        resolve(emoticon_usage);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
  });
}

function createMultiEmoticonItem(emotion_item_list) {
  return new Promise((resolve, reject) => {
    EmoticonItem.bulkCreate(emotion_item_list)
      .then(() => {
        console.log("집어넣어보리기오때");
        resolve(true);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
  });
}

function getFolderList(user_id) {
  return new Promise((resolve, reject) => {
    Folder.findAll({
      raw: true,
      where: { user_id: user_id },
    })
      .then((folders) => {
        console.log("get:", folders);
        resolve(folders);
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
  });
}

function addNewImage(img_name, user_id, folder_id) {
  return new Promise((resolve, reject) => {
    Image.create({
      img_name: img_name,
    })
      .then((image) => {
        console.log("create1:", image);
        UserImage.create({
          user_id: user_id,
          folder_id: folder_id,
          img_id: image.img_id,
        }).then((user_img) => {
          console.log("create2:", user_img);
          resolve(true);
        });
      })
      .catch((err) => {
        console.error(err);
        reject(err);
        return;
      });
  });
}

module.exports = {
  createEmoticon: createEmoticon,
  createEmoticonUploader: createEmoticonUploader,
  createEmoticonUsage: createEmoticonUsage,
  createMultiEmoticonItem: createMultiEmoticonItem,
};
