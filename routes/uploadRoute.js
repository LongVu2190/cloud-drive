import express from "express";
import { uploadController } from "../controllers/index.js";
const router = express.Router();

router.post("/upload", uploadController.uploadFiles);
router.post("/delete", uploadController.deleteFiles);

export default router;
