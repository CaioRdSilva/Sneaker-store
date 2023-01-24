import { DataTypes } from "sequelize";
import { conn } from "../db/conn.js";

export const User = conn.define("User", {
  name: {
    type: DataTypes.STRING,
    require: true,
  },
  email: {
    type: DataTypes.STRING,
    require: true,
  },
  senha: {
    type: DataTypes.STRING,
    require: true,
  },
});
