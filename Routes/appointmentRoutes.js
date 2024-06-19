import express from 'express';
import { createAppointment, getAllAppointment, getLawyerAppointments } from '../Controllers/appointmentController.js';




const router = express.Router();



router.post('/createAppointment/:id',createAppointment)

router.get('/getAppointment/:id',getLawyerAppointments)
router.get('/getAppointment',getAllAppointment)




export default router;