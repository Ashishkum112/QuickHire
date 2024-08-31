import express from "express";
// import isAuthenticated from "../middlewares/isAuthenticated.js";
import { aicontroller } from "../controllers/ai.controller.js";
const router = express.Router();

router.route('/').post(aicontroller);

export default router;  