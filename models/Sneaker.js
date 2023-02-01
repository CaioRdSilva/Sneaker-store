import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";

//user
import { User } from "./User.js";

export const Sneaker = conn.define("Sneaker", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    require: true,
  },
});

Sneaker.belongsTo(User);
User.hasMany(Sneaker);
