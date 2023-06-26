const fs = require("fs");
const dotenv = require("dotenv");
const { UserFolder, Folder, Image, UserImage } = require("../connect/models/user_file");
dotenv.config();

function createFolder(f_name, user_id) {
  return new Promise((resolve, reject) => {
    Folder.create({
      folder_name: f_name,
    }).then((folder)=>{
      console.log("create1:",folder);
      UserFolder.create({
        user_id: user_id,
        folder_id: folder.folder_id
      }).then((user_folder)=>{
        console.log("create2:",user_folder);
        resolve(true);
      });
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}

function getFolderList(user_id) {
  return new Promise((resolve, reject) => {
    Folder.findAll({
      raw : true,
      where : { user_id:user_id }
    }).then((folders)=>{
      console.log("get:",folders);
      resolve(folders);
    }).catch((err) => {
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
    }).then((image)=>{
      console.log("create1:",image);
      UserImage.create({
        user_id: user_id,
        folder_id: folder_id,
        img_id : image.img_id,
      }).then((user_img)=>{
        console.log("create2:",user_img);
        resolve(true);
      });
    }).catch((err) => {
      console.error(err);
      reject(err);
      return;
    });
  });
}


module.exports = {
  createFolder : createFolder,
  getFolderList: getFolderList,
  addNewImage : addNewImage
};
