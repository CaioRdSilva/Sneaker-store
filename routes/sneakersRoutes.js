import express from "express";
const router = express.Router();
import { sneakersController } from "../controllers/SneakersController.js";

router.get("/", sneakersController.showSneakers);

export default router;