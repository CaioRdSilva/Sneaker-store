import { Sequelize } from "sequelize";

export const conn = new Sequelize("sneakerstore", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

try {
  conn.authenticate();
  console.log("BD connected");
} catch (err) {
  console.log(err);
}
