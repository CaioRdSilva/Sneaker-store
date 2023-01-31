import express from "express";
import session from "express-session";
const sneakerRouter = express.Router();
import { sneakersController } from "../controllers/SneakersController.js";
import { checkAuth } from "../helpers/auth.js";
//import { checkSeller } from "../helpers/auth.js";

sneakerRouter.get( "/dashboard", checkAuth, sneakersController.dashboard);
sneakerRouter.get( "/add", checkAuth, sneakersController.createSneaker);
sneakerRouter.get("/", sneakersController.showSneakers);

export default sneakerRouter;
