import express from 'express';
import { getAllLawyer, getSingleLawyer, loginUser, postReview, singupUser, updateLawyer } from '../Controllers/lawyerController.js';



const router = express.Router();




router.post('/login',loginUser)
router.post('/signup',singupUser)
router.get('/getLawyer/:id',getSingleLawyer)
router.get('/getLawyer',getAllLawyer)
router.patch('/updateLawyer/:id',updateLawyer)
router.patch('/postreview/:id',postReview)



export default router;