import express, { urlencoded, json } from "express";
import { engine } from "express-handlebars";
import { conn } from "./db/conn.js";
import session from "express-session";
import FileStore from "session-file-store";
import flash from "express-flash"; 
import path from "node:path";
import os from "node:os";

const newLocal = FileStore(session);
const app = express();

//models
import { Sneaker } from "./models/Sneaker.js";
import { User } from "./models/User.js";

//import routes
import sneakerRouter from "./routes/sneakersRoutes.js";
import authRouter from "./routes/authRoutes.js"
//import controller
import { sneakersController } from "./controllers/SneakersController.js";
//template engine
app.engine('handlebars', engine());
app.set('view engine','handlebars')

//recerber resposta do body
app.use(
  urlencoded({
    extended: true,
  })
);

app.use(json());

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
      maxAge: 3600000,
      expires: new Date(Date.now() + 3600000),
      httpOnly: true,
    },
  })
);

//flash messages
app.use(flash());

//public path
app.use(express.static("public"));

//set session to res
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  if (req.session.userseller) {
    res.locals.session = req.session;
  }
  next();
});

//routes
app.use("/sneakers", sneakerRouter);
app.use("/", authRouter)
app.get("/", sneakersController.showSneakers);


//conexão BD
conn
  .sync()
  .then(() => {
    app.listen(3030);
  })
  .catch((err) => console.log(err));
