import express from "express";
import session from "express-session";
const sneakerRouter = express.Router();
import { sneakersController } from "../controllers/SneakersController.js";
import { checkAuth } from "../helpers/auth.js";
import { upload } from "../helpers/record.js";

sneakerRouter.get("/dashboard", checkAuth, sneakersController.dashboard);
sneakerRouter.get("/add", checkAuth, sneakersController.createSneaker);
sneakerRouter.post("/add", checkAuth, upload.single("prodImg"), sneakersController.createSneakerPost);
sneakerRouter.get("/", sneakersController.showSneakers);

export default sneakerRouter;
