import lawyerModel from '../models/LawyerModel.js';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import nodemailer from "nodemailer";
import bcrypt from 'bcrypt'

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
}


export const sendOTP = async (req, res) => {
    const data = {
        name: req.body.firstName,
        phone: req.body.phone,
        email: req.body.email,
    };
    const sa = Date.now().toString();

    const mid  = parseInt(sa);

    let otp = mid%1000000;

    while (otp<1000000) {
        otp = otp*10;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lawease24@gmail.com",
            pass: "caou envd jhnj tmxl",
        },
    });

    var mailOptions = {
        from: "lawease24@gmail.com",
        to: data.email,
        // console.log(date.email)
        subject: `Email verification for Lawyer Registration `,
        text: `Hi ${data.name},\nThank you for choosing LawEase\nHere is your OTP for Email Verification ${otp}\nLooking forward to help you.\nTeam LawEase`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    const toSend=otp.toString();

    return res.status(201).json(toSend);

}
export const sendOTPForForgetPassword = async (req, res) => {
    const data = {
        email: req.body.email,
    };
    const sa = Date.now().toString();

    const mid  = parseInt(sa);

    let otp = mid%1000000;

    while (otp<1000000) {
        otp = otp*10;
    }

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lawease24@gmail.com",
            pass: "caou envd jhnj tmxl",
        },
    });

    var mailOptions = {
        from: "lawease24@gmail.com",
        to: data.email,
        // console.log(date.email)
        subject: `Email verification for Forget Password `,
        text: `Hi,\nHere is your OTP for Email Verification and further process for the Forget Password: ${otp}\nLooking forward to help you.\nTeam LawEase`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    const toSend=otp.toString();

    return res.status(201).json(toSend);

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


export const updatePassword = async (req, res) => {
    const { email } = req.params;


    const password=req.body.password;

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const lawyer = await lawyerModel.findOneAndUpdate({ email: email }, {
        password:hash
    });

    if (lawyer) {
        return res.status(200).json(lawyer);
    } else {
        return res.status(400).json({ error: "No Such Lawyer Found.!." });
    }
};


export const postReview = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Invalid ID.!." });
    }

    let dex = await lawyerModel.findById(id);

    let revArr = dex.reviews;



    revArr.push(req.body);

    console.log("lol.!.",revArr)


    const lawyer = await lawyerModel.findOneAndUpdate({ _id: id }, {
        reviews:revArr
    });

    if (lawyer) {
        res.status(200).json(lawyer);
    } else {
        return res.status(400).json({ error: "No Such Lawyer Found.!." });
    }
};