import mongoose from 'mongoose';

import User from '../models/user.js';

export const searchByUsername = async (req,res) => {
    const { username } = req.params


    try {
        const dataRaw = await User.findOne({username:username});

        if (!dataRaw) return res.status(404).json({message: "User doesn't exist"});
        
        const data = {username: dataRaw.username, _id: dataRaw._id}
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}