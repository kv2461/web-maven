import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req,res) => {
    const {username, password} = req.body
    console.log(username)

    try {
        const existingUser = await User.findOne({'username' : {
            $regex : new RegExp(username, "i") } });

        if (!existingUser) return res.status(404).json({message: "User doesn't exist"});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message:'Invalid credentials'});

        const token = jwt.sign({ email:existingUser.email, id: existingUser._id}, 'test', {expiresIn:'24h'})

        res.status(200).json({ result:existingUser, token})

    } catch (error) {
        res.status(500).json({message: 'Something went wrong'})
    }
}

export const signup = async (req,res) => {
    const {email, password, confirmPassword, username} = req.body;

    try {
        const existingEmail = await User.findOne({ 'email' : {
            $regex : new RegExp(email, "i") } });
        if (existingEmail) return res.status(400).json({message: 'Email already in use'});

        const existingUser = await User.findOne({'username' : {
            $regex : new RegExp(username, "i") } });
        if (existingUser) return res.status(404).json({message: "Username already in use"});

        if (password !== confirmPassword) return res.status(400).json({message:'Passwords do not match'});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({ username, email, password: hashedPassword });

        const token = jwt.sign({email: result.email, id:result._id}, 'test', {expiresIn:'24h'})

        res.status(200).json({result, token})
    } catch(error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong'})
    }
}