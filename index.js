import express from "express";
import { engine } from "express-handlebars";
import { conn } from "./db/conn.js";
import session from'express-session';
import  FileStore from 'session-file-store';
import  flash  from "express-flash";

FileStore(session);
const app = express();

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
