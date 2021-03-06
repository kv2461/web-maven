import mongoose from 'mongoose';

import User from '../models/user.js';
import FriendRequest from '../models/friendrequest.js';

export const searchByUsername = async (req,res) => {
    const { username } = req.params

    try {
        const dataRaw = await User.findOne({'username':{
            $regex : new RegExp(username, "i") }});

        if (!dataRaw) return res.status(404).json({message: `User ${username} doesn't exist`});
        
        const data = {username: dataRaw.username, _id: dataRaw._id}
        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const searchById = async (req,res) => {
    const {id} = req.params;

    try {
        const dataRaw = await User.findById(id);
        
        const data = {username: dataRaw.username, _id: dataRaw._id}

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const sendFriendRequest = async (req,res) => {
    const {_id} = req.body;
    
    try {
        const existingRequest = await FriendRequest.findOne({requester:req.userId, recipient:_id})

        if (existingRequest) return res.status(400).json({message:'Already sent'})

        const newFriendRequest = new FriendRequest({requester:req.userId, recipient:_id, status:'unseen'})
        await newFriendRequest.save();

        res.status(201).json(newFriendRequest);
    } catch(error) {
        res.status(404).json({message:error.message})
    }
}

export const getFriendStatus = async (req,res) => {
    try {
        const sent = await FriendRequest.find({requester:req.userId})
        const inventory = await FriendRequest.find({recipient:req.userId});

        const friendRequests = {sent, inventory}

        res.status(201).json(friendRequests);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getFriends = async (req,res) => {
    try {
        const userAccount = await User.findById(req.userId);
        const {friends} = userAccount

        res.status(201).json(friends);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const cancelFriendRequest = async (req,res) => {
    const {_id} = req.body;
    try {
        const existingRequest = await FriendRequest.findOne({requester:req.userId, recipient:_id})

        if (!existingRequest) return res.status(400).json({message:'Request already cancelled'});

        await FriendRequest.deleteOne({requester:req.userId, recipient:_id})

        res.status(201).json(req.body);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const denyFriendRequest = async (req, res) => {
    const {_id} = req.body;
    try {
        const existingRequest = await FriendRequest.findOne({requester:_id, recipient:req.userId})

        if (!existingRequest) return res.status(400).json({message:'Request already denied'});

        await FriendRequest.deleteOne({requester:_id, recipient:req.userId});

        res.status(201).json(req.body);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const acceptFriendRequest = async (req, res) => {
    const {_id} = req.body;
    try {
        const userAccount = await User.findById(req.userId);
        const friendAccount = await User.findById(_id);
        const index = userAccount.friends.findIndex((id)=>id===String(_id));

        if ( index=== -1 ) {
            userAccount.friends.push(_id);
            friendAccount.friends.push(req.userId); 
            const existingRequest = await FriendRequest.findOne({requester:_id, recipient:req.userId})
            existingRequest.status = 'completed';

            const updatedUserAccount = await User.findByIdAndUpdate(req.userId, userAccount, {new:true});
            const updatedFriendAccount = await User.findByIdAndUpdate(_id, friendAccount, {new:true});
            const updatedFriendRequest = await FriendRequest.findByIdAndUpdate(existingRequest._id, existingRequest, {new:true});

            const data = {updatedUserAccount, updatedFriendAccount, updatedFriendRequest}

            res.status(201).json(data);
        } else {
            res.status(400).json({message:'Request already accepted'});
        }
        

       
    } catch (error) {
        res.status(404).json({message:error.message});
    } 
}


export const removeFriend = async (req, res) => {
    const {_id} = req.body;
    try {
        const userAccount = await User.findById(req.userId);
        const friendAccount = await User.findById(_id);
        const index = userAccount.friends.findIndex((id)=>id===String(_id));

        if ( index !== -1 ) {
            userAccount.friends = userAccount.friends.filter((id) => id !== String(_id));
            friendAccount.friends = friendAccount.friends.filter((id) => id !== String(req.userId));

            const findFriendRequest = await FriendRequest.find({requester:_id, recipient:req.userId}).count()

            if (findFriendRequest === 1) {
                await FriendRequest.deleteOne({requester:_id, recipient:req.userId});
            } else {
                await FriendRequest.deleteOne({requester:req.user_id, recipient:_id});
            }

            const updatedUserAccount = await User.findByIdAndUpdate(req.userId, userAccount, {new:true});
            const updatedFriendAccount = await User.findByIdAndUpdate(_id, friendAccount, {new:true});

            const data = {updatedUserAccount, updatedFriendAccount,}

            res.status(201).json(data);
        } else {
            res.status(400).json({message:'Friend already removed'});
        }
       
    } catch (error) {
        res.status(404).json({message:error.message});
    } 
}