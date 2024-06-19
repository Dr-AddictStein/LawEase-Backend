import appointmentModel from '../Models/AppointmentModel.js'
import mongoose from 'mongoose';


export const createAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const data = {
            clientname: req.body.name,
            lawyerId: id,
            phone: req.body.phone,
            email: req.body.email,
            date: req.body.date,
            slot: req.body.slot,
            desc: req.body.desc
        }

        const newAppointment = new appointmentModel(data);
        const savedAppointment = await newAppointment.save();

        res.status(201).json(savedAppointment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const getAllAppointment = async (req, res) => {
    const users = await appointmentModel.find({});
    res.status(200).json(users);
};

export const getLawyerAppointments = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const all = await appointmentModel.find({});

    const response = all.filter((appo) => {
        return appo.lawyerId === id
    });

    if (response) {
        res.status(200).json(response);
    } else {
        return res.status(400).json({ error: "No Such lawyer Found.!." });
    }
};

