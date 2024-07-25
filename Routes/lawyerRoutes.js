import express from 'express';
import { getAllLawyer, getSingleLawyer, loginUser, postReview, sendOTP, sendOTPForForgetPassword, singupUser, updateLawyer, updatePassword } from '../Controllers/lawyerController.js';



const router = express.Router();




router.post('/login',loginUser)
router.post('/login/forgetpassword',sendOTPForForgetPassword)
router.post('/signup',singupUser)
router.post('/signup/sendotp',sendOTP)
router.get('/getLawyer/:id',getSingleLawyer)
router.get('/getLawyer',getAllLawyer)
router.patch('/updateLawyer/:id',updateLawyer)
router.patch('/updatePassword/:email',updatePassword)
router.patch('/postreview/:id',postReview)



export default router;