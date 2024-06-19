import express from 'express';
import { getSingleLawyer, loginUser, singupUser, updateLawyer } from '../Controllers/lawyerController.js';



const router = express.Router();




router.post('/login',loginUser)
router.post('/signup',singupUser)
router.get('/getLawyer/:id',getSingleLawyer)
router.patch('/updateLawyer/:id',updateLawyer)



export default router;