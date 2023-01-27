import express from "express";
const sneakerRouter = express.Router();
import { sneakersController } from "../controllers/SneakersController.js";

sneakerRouter.get("/", sneakersController.showSneakers);

export default sneakerRouter;