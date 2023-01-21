import express from "express";
import { engine } from "express-handlebars";
import { conn } from "./db/conn.js";
import session from "express-session";
import FileStore from "session-file-store";
import flash from "express-flash";
import path from "node:path";
import os from "node:os";


const newLocal = FileStore(session);
const app = express();

//template engine
app.engine("handlebars", engine);
app.set("view engine", "handlebars");

//recerber resposta do body
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//session midleware


app.use(
  session({
    name: "session",
    secret: "hb1exSecret",
    resave: false,
    saveUninitialized: false,
    store: new newLocal({
      logFn: function () {},
      path: path.join(os.tmpdir(), "sessions"),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
  })
);

conn
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => console.log(err));
