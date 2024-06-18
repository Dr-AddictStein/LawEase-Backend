import lawyerModel from '../models/LawyerModel.js';
import jwt from 'jsonwebtoken';

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn:'3d'});
}

export const loginUser = async (req,res)=>{
    const {email,password}=req.body;
    try {
        const user = await lawyerModel.login(email,password);

        const token=createToken(user._id);

        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }

}


export const singupUser = async (req,res)=>{
    // console.log("AOAOAO",req.body)
    const {firstname, lastname, phone, email, password}=req.body;
    try {
        const user = await lawyerModel.signup(firstname, lastname, phone, email, password);

        const token=createToken(user._id);

        res.status(200).json({email,token});
    } catch (error) {
        res.status(400).json({error:error.message});
    }
}