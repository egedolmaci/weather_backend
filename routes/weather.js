import express from "express";
import weather from "../controllers/weather.js";

const router = express.Router();

router.get("/daily", weather.getDaily);

router.get("/hourly", weather.getHourly);

export default router;
