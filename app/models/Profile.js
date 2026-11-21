import { DataTypes } from "sequelize";
import { sequelize } from "../../lib/db";

export const Stat = sequelize.define(
  "Stat",
  {
    label: { type: DataTypes.STRING(50), allowNull: false },
    value: { type: DataTypes.STRING(20), allowNull: false },
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "stats" }
);

export const CarouselItem = sequelize.define(
  "CarouselItem",
  {
    title: { type: DataTypes.STRING(150), allowNull: false },
    category: DataTypes.STRING(50),
    imageUrl: { type: DataTypes.STRING(500), allowNull: false },
    path: DataTypes.STRING(200),
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "carousel_items" }
);

export const Service = sequelize.define(
  "Service",
  {
    emoji: DataTypes.STRING(10),
    title: { type: DataTypes.STRING(150), allowNull: false },
    description: DataTypes.TEXT,
    items: { type: DataTypes.JSON, defaultValue: [] },
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "services" }
);

export const Media = sequelize.define(
  "Media",
  {
    type: { type: DataTypes.ENUM("image", "reel"), allowNull: false },
    src: { type: DataTypes.STRING(500), allowNull: false },
    poster: DataTypes.STRING(500),
    caption: DataTypes.TEXT,
    category: DataTypes.STRING(50),
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    comments: { type: DataTypes.INTEGER, defaultValue: 0 },
    uploadDate: DataTypes.DATEONLY,
    sortOrder: { type: DataTypes.INTEGER, defaultValue: 0 },
  },
  { tableName: "media" }
);