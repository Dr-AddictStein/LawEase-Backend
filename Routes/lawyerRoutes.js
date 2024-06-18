import express from 'express';
import { loginUser, singupUser } from '../Controllers/lawyerController.js';



const router = express.Router();




router.post('/login',loginUser)
router.post('/signup',singupUser)



export default router;