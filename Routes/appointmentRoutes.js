import express from 'express';
import { createAppointment, getAllAppointment, getLawyerAppointments, sendOTP } from '../Controllers/appointmentController.js';




const router = express.Router();



router.post('/createAppointment/:id',createAppointment)
router.post('/sendotp',sendOTP)

router.get('/getAppointment/:id',getLawyerAppointments)
router.get('/getAppointment',getAllAppointment)




export default router;