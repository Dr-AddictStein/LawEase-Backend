import lawyerModel from '../models/LawyerModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await lawyerModel.login(email, password);

        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}


export const singupUser = async (req, res) => {
    // console.log("AOAOAO",req.body)
    const { firstname, lastname, phone, email, password } = req.body;
    try {
        const user = await lawyerModel.signup(firstname, lastname, phone, email, password);

        const token = createToken(user._id);

        res.status(200).json({ user, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

export const getAllLawyer = async (req, res) => {
    const users = await lawyerModel.find({});
    res.status(200).json(users);
};

export const getSingleLawyer = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const lawyer = await lawyerModel.findById(id);

    if (lawyer) {
        res.status(200).json(lawyer);
    } else {
        return res.status(400).json({ error: "No Such lawyer Found.!." });
    }
};

export const updateLawyer = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    const lawyer = await lawyerModel.findOneAndUpdate({ _id: id }, {
        ...req.body
    });

    if (lawyer) {
        res.status(200).json(lawyer);
    } else {
        return res.status(400).json({ error: "No Such Lawyer Found.!." });
    }
};