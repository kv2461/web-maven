import mongoose from 'mongoose';

import User from '../models/user.js';
import BookmarkFolder from '../models/bookmarkfolder.js';
import BookmarkFolderRequest from '../models/bookmarkfolderrequest.js';
import { response } from 'express';

export const createNewFolder = async (req,res) => {

    try {
        const newBookmarkFolder = new BookmarkFolder(req.body)

        const existingUser = await User.findById(req.userId);

        const {_id} = await newBookmarkFolder.save();

        existingUser.bookmarkfolders.push(JSON.stringify(_id))

        await User.findByIdAndUpdate(req.userId, existingUser, {new:true});

        res.status(201).json(newBookmarkFolder);
    } catch(error) {
        res.status(404).json({message:error.message})
    }
}

export const sendEditorRequest = async (req,res) => {
    const {friend, bookmarkFolderId} = req.body;
 
    try {
        const existingRequest = await BookmarkFolderRequest.findOne({requester:req.userId, recipient:friend._id, rights:'editor', bookmarkFolderId:bookmarkFolderId});

        if (existingRequest) return res.status(400).json({message:'Already sent'});

        const existingRequest2 = await BookmarkFolderRequest.findOne({requester:req.userId, recipient:friend._id, rights:'viewer', bookmarkFolderId:bookmarkFolderId});

        if (existingRequest2) {
            existingRequest2.rights = 'editor';
            existingRequest2.status = 'unseen';
            const updatedRequest = await BookmarkFolderRequest.findByIdAndUpdate(existingRequest2._id, existingRequest2, {new:true});

            res.status(201).json(updatedRequest);
        } else {
            const newEditorRequest = new BookmarkFolderRequest({requester:req.userId, recipient:friend._id, status:'unseen', rights:'editor', bookmarkFolderId:bookmarkFolderId})

            await newEditorRequest.save();

            res.status(201).json(newEditorRequest);
        }

        
    } catch(error) {
        res.status(404).json({message:error.message})
    }
}

export const sendViewerRequest = async (req,res) => {
    const {friend, bookmarkFolderId} = req.body;
 
    try {
        const existingRequest = await BookmarkFolderRequest.findOne({requester:req.userId, recipient:friend._id, rights:'viewer', bookmarkFolderId:bookmarkFolderId})

        if (existingRequest) return res.status(400).json({message:'Already sent'})

        const existingRequest2 = await BookmarkFolderRequest.findOne({requester:req.userId, recipient:friend._id, rights:'editor', bookmarkFolderId:bookmarkFolderId})

        if (existingRequest2) return res.status(400).json({message:'Already invited to be editor'})

        const newEditorRequest = new BookmarkFolderRequest({requester:req.userId, recipient:friend._id, status:'unseen', rights:'viewer', bookmarkFolderId:bookmarkFolderId})

        await newEditorRequest.save();

        res.status(201).json(newEditorRequest);
    } catch(error) {
        res.status(404).json({message:error.message})
    }
}

export const getFolders = async (req,res) => {

    try {
        const {bookmarkfolders} = await User.findById(req.userId);
        const sentFolders = await BookmarkFolderRequest.find({requester:req.userId, status:'unseen'});
        const recievedFolders = await BookmarkFolderRequest.find({recipient:req.userId, status:'unseen'});

        const data = {bookmarkfolders, sentFolders, recievedFolders};

        res.status(201).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}