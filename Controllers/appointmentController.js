import appointmentModel from "../Models/AppointmentModel.js";
import lawyerModel from "../models/LawyerModel.js";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import twilio from "twilio";

const accountSid = "AC7d303f2772889487221e8aefa346f78a";
const authToken = "035f50ae41274e3f30e815aa95d29757";

const client = twilio(accountSid, authToken);


export const sendOTP = async (req, res) => {
    const data = {
        clientname: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        date: req.body.date,
        slot: req.body.slot,
        desc: req.body.desc,
    };
    const sa = Date.now().toString();

    const mid  = parseInt(sa);

    const otp = mid%1000000;

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
        subject: `Email verification for Appointment `,
        text: `Hi ${data.clientname},\nThank you for choosing LawEase\nHere is your OTP for Email Verification ${otp}\nLooking forward to help you.\nTeam LawEase`,
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
            desc: req.body.desc,
            iscompleted: false
        };
        const newAppointment = new appointmentModel(data);
        const lawyer = await lawyerModel.findById(id);
        console.log("lawyer-->>>>", lawyer.firstname, lawyer.lastname);
        const savedAppointment = await newAppointment.save();
        console.log("saved Appoinment", savedAppointment);

        if (savedAppointment) {
            const sendSMS = async (body) => {
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
                    subject: `Appointment Confirmation: ${data.date} `,
                    text: `Hi ${data.clientname},\nThank you for choosing LawEase, Your appointment is booked with ${lawyer.firstname} ${lawyer.lastname} on Date: ${data.date}, Time: ${data.slot} (24hrs format)\n We will shortly send you our location\nLooking forward to help you.\nTeam LawEase`,
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Email sent: " + info.response);
                    }
                });
                let msgOptions = {
                    from: "+12066874593",
                    to: "+13065802724",
                    body: `Hi ${data.clientname}, Your appointment is booked with ${lawyer.firstname} ${lawyer.lastname} on Date: ${data.date}, Slot: ${data.slot}`,
                };
                try {
                    const message = await client.messages.create(msgOptions);
                    //   console.log(message);
                } catch (error) {
                    console.error(
                        `New appointment created for ${data.clientname}. Date: ${data.date}, Slot: ${data.slot}`
                    );
                }
            };
            sendSMS();
        }

        return res.status(201).json(savedAppointment);
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
        return appo.lawyerId === id;
    });

    if (response) {
        res.status(200).json(response);
    } else {
        return res.status(400).json({ error: "No Such lawyer Found.!." });
    }
};

export const markAsCompleted = async (req, res) => {
    const { id } = req.params;
    let dat = await appointmentModel.findById(id);
    dat.iscompleted = true;

    const lawyer = await lawyerModel.findById(dat.lawyerId);

    const appo = await appointmentModel.findOneAndUpdate(
        {
            _id: id
        },
        {
            ...dat
        }
    );

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "lawease24@gmail.com",
            pass: "caou envd jhnj tmxl",
        },
    });

    const mailOptions = {
        from: 'lawease24@gmail.com',
        to: dat.email,
        subject: `Rate Your Appointment with ${lawyer.firstname}`,
        text: `Hi ${dat.clientname},\nHow was your appointment with ${lawyer.firstname}?\n`,
        html: `<p>Hi ${dat.clientname},</p>
               <p>How was your appointment with ${lawyer.firstname}?</p>
               <p>Provide your valuable feedback by clicking this <a href="http://localhost:3000/share-review/${lawyer._id}">Lawease Feedback Posting</a>.</p>
               <p>Team LawEase</p>`,
        };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log("Email sent: " + info.response);
        }
    });

    return res.status(200).json(appo);

}

// export{data};
