import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import validator from 'validator';


const lawyerSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    bio: {
        type: String
    },
    experience: {
        type: String
    },
    category: {
        type: String
    },
    city: {
        type: String
    }
}, { timestamps: true });

lawyerSchema.statics.signup = async function (firstname, lastname, phone, email, password) {
    const exist = await this.findOne({ email });

    if (exist) {
        throw Error("Email already exists.!.");
    }
    if (!email || !password || !firstname || !lastname || !phone) {
        throw Error("All fields must be filled...")
    }

    if (!validator.isEmail(email)) {
        throw Error("Not a valid email.!.")
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Password is not strong enough.!.")
    }


    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ firstname, lastname, phone, email, password: hash });

    return user;
};


lawyerSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled...")
    }

    const user = await this.findOne({ email });

    if (!user) {
        throw Error('Incorrect Email.!.');
    }

    const match = await bcrypt.compare(password, user.password)

    if (!match) {
        throw Error('Incorrect password.!.');
    }


    return user;


}

const user = mongoose.model("LawyerCollection", lawyerSchema);

export default user;
