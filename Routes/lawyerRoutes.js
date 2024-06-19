import express from 'express';
import { getAllLawyer, getSingleLawyer, loginUser, singupUser, updateLawyer } from '../Controllers/lawyerController.js';



const router = express.Router();




router.post('/login',loginUser)
router.post('/signup',singupUser)
router.get('/getLawyer/:id',getSingleLawyer)
router.get('/getLawyer',getAllLawyer)
router.patch('/updateLawyer/:id',updateLawyer)



export default router;