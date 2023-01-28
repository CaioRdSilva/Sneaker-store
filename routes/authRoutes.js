import express from "express";
const authRouter = express.Router();
import { authController } from "../controllers/authController.js";

authRouter.get("/login", authController.login);
authRouter.get("/register", authController.register)
authRouter.post("/register", authController.registerPost)

export default authRouter;