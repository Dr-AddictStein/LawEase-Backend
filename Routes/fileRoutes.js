import express from 'express';

import uploadMiddleWare from "../middlewares/fileUpload.js";
import { createImage } from '../controllers/fileController.js';


const router = express.Router();

router.post('/image/:labId',uploadMiddleWare.single("file"), createImage);

export default router;

