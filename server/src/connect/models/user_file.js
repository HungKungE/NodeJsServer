const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const UserInfo = require("./user_info");

const Folder = sequelize.define(
  "folder",
  {
    folder_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    folder_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    create_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    edit_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

const UserFolder = sequelize.define(
  "user_folder",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    folder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "folder_id"],
      },
    ],
  }
);

const Image = sequelize.define(
  "image",
  {
    img_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    img_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    add_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

const UserImage = sequelize.define(
  "user_image",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    folder_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    img_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["user_id", "folder_id", "img_id"],
      },
    ],
  }
);

UserFolder.belongsTo(UserInfo, { foreignKey: "user_id", onDelete: "CASCADE" });
UserFolder.belongsTo(Folder, { foreignKey: "folder_id", onDelete: "CASCADE" });

UserImage.belongsTo(UserInfo, { foreignKey: "user_id", onDelete: "CASCADE" });
UserImage.belongsTo(Folder, { foreignKey: "folder_id", onDelete: "CASCADE" });
UserImage.belongsTo(Image, { foreignKey: "img_id", onDelete: "CASCADE" });

module.exports = {
  Folder,
  UserFolder,
  Image,
  UserImage,
};