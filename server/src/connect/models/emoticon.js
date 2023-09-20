const { DataTypes } = require("sequelize");
const sequelize = require("../connection");
const UserInfo = require("./user_info");

/*
const Emoticon = sequelize.define(
  "emoticon",
  {
    emoticon_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    emoticon_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    create_time: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
    edit_time: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

const EmoticonUploader = sequelize.define(
  "emoticon_uploader",
  {
    uploader_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: UserInfo,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    emoticon_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Emoticon,
        key: "emoticon_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

const EmoticonUsage = sequelize.define(
  "emoticon_usage",
  {
    requester_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: UserInfo,
        key: "user_id",
      },
      onDelete: "CASCADE",
    },
    emoticon_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      references: {
        model: Emoticon,
        key: "emoticon_id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

const EmoticonItem = sequelize.define(
  "emoticon_item",
  {
    emoticon_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    emoticon_id: {
      type: DataTypes.INTEGER,
      primaryKey: false,
      references: {
        model: Emoticon,
        key: "emoticon_id",
      },
      onDelete: "CASCADE",
      allowNull: false,
    },
    emoticon_item_name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    is_main_image: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    upload_time: {
      type: "TIMESTAMP",
      defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
      allowNull: false,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = {
  Emoticon,
  EmoticonUploader,
  EmoticonUsage,
  EmoticonItem,
};
*/
