import mongoose from "mongoose";



const appointmentSchema = new mongoose.Schema({
    clientname: {
        type: String,
        required: true
    },
    lawyerId:{
        type:String,
        required:true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    slot:{
        type: String,
        required:true
    },
    desc:{
        type: String,
    }
}, { timestamps: true });



const appointment = mongoose.model("AppointmentCollection", appointmentSchema);

export default appointment;
