import mongoose from 'mongoose';

import User from '../models/user.js';
import BookmarkFolder from '../models/bookmarkfolder.js';
import BookmarkFolderRequest from '../models/bookmarkfolderrequest.js';

export const createNewFolder = async (req,res) => {
    try {
        const newBookmarkFolder = new BookmarkFolder(req.body)

        const existingUser = await User.findById(req.userId);
        
        const {_id} = await newBookmarkFolder.save();
        console.log(_id);

        if (newBookmarkFolder.mainFolder) {
            existingUser.bookmarkfolders.push(_id);
            await User.findByIdAndUpdate(req.userId, existingUser, {new:true});
            
            res.status(201).json(newBookmarkFolder);
        } else {
            const existingParentFolder = await BookmarkFolder.findById(newBookmarkFolder.parentFolder); 

            existingParentFolder.subFolders.push(_id);

            const updatedFolder = await BookmarkFolder.findByIdAndUpdate(newBookmarkFolder.parentFolder,existingParentFolder, {new:true})

            res.status(201).json(updatedFolder);
        }

        
    } catch(error) {
        res.status(404).json({message:error.message});
    }
}

export const removeFromBookmarkFolder = async (req,res) => {
    const {userId, folderId, rights} = req.body;
    console.log(userId, folderId, rights);

    try {
        //delete Request
        const existingRequest = await BookmarkFolderRequest.findOne({recipient:userId, bookmarkFolderId:folderId})

        //update user to not have bookmarkFolderId
        const userAccount = await User.findById(userId);

        let indexUser = userAccount.bookmarkfolders.findIndex((id)=>id===folderId);

        if (indexUser !==-1) {
            userAccount.bookmarkfolders = userAccount.bookmarkfolders.filter((folder) => folder !== folderId)
            console.log(folderId)
        };


        // //update bookmarkFolderId to remove userId 
        const bookmarkFolder = await BookmarkFolder.findById(folderId);

        let indexFolder = bookmarkFolder[`${rights}s`].findIndex((id)=>id===String(userId));


        if(indexFolder!==-1) {
            bookmarkFolder[`${rights}s`] = bookmarkFolder[`${rights}s`].filter((people) => people !== userId); 
        } 

    
        // //save to db

        if (existingRequest) {
            await BookmarkFolderRequest.deleteOne({recipient:userId, bookmarkFolderId:folderId});
        }

        const updatedUser = await User.findByIdAndUpdate(userId, userAccount, {new:true});

        const updatedFolder = await BookmarkFolder.findByIdAndUpdate(folderId, bookmarkFolder, {new:true});

        const data = {updatedFolder, updatedUser};

       

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }

}

export const sendEditorRequest = async (req,res) => {
    const {friend, bookmarkFolderId} = req.body;
 
    try {
        const existingRequest = await BookmarkFolderRequest.findOne({recipient:friend._id, rights:'editor', bookmarkFolderId:bookmarkFolderId});

        if (existingRequest) return res.status(400).json({message:`A request has already been sent to ${friend.username}`});

        const existingRequest2 = await BookmarkFolderRequest.findOne({recipient:friend._id, rights:'viewer', status:'unseen', bookmarkFolderId:bookmarkFolderId});

        const existingRequest3 = await BookmarkFolderRequest.findOne({recipient:friend._id, rights:'viewer', status:'complete', bookmarkFolderId:bookmarkFolderId});

        if (existingRequest2) {
            existingRequest2.rights = 'editor';
            existingRequest2.status = 'unseen';
            const updatedRequest = await BookmarkFolderRequest.findByIdAndUpdate(existingRequest2._id, existingRequest2, {new:true});

            res.status(201).json(updatedRequest);
        } else if (existingRequest3) {
            existingRequest3.rights = 'editor';
            existingRequest3.status = 'unseen';
            const updatedRequest = await BookmarkFolderRequest.findByIdAndUpdate(existingRequest3._id, existingRequest3, {new:true});
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
        const existingRequest = await BookmarkFolderRequest.findOne({requester:req.userId, recipient:friend._id, rights:'viewer', bookmarkFolderId:bookmarkFolderId});
        

        if (existingRequest) return res.status(400).json({message:`Already sent to ${friend.username}`});

        const existingRequest2 = await BookmarkFolderRequest.findOne({requester:req.userId, recipient:friend._id, rights:'editor', bookmarkFolderId:bookmarkFolderId});

        if (existingRequest2) return res.status(400).json({message:`${friend.username} is already ready invited to be editor`});
        
        const existingRequestByAnother = await BookmarkFolderRequest.findOne({recipient:friend._id,bookmarkFolderId:bookmarkFolderId});

        if (existingRequestByAnother) return res.status(400).json({message:'Already invited/joined'});

        const newEditorRequest = new BookmarkFolderRequest({requester:req.userId, recipient:friend._id, status:'unseen', rights:'viewer', bookmarkFolderId:bookmarkFolderId});

        await newEditorRequest.save();

        res.status(201).json(newEditorRequest);
    } catch(error) {
        res.status(404).json({message:error.message});
    }
}

export const acceptBookmarkRequest = async (req,res) => {
    const {requestId, bookmarkFolderId, rights} = req.body;

    try {
        //update request to complete
        const existingRequest = await BookmarkFolderRequest.findOne({recipient:req.userId, rights:rights, bookmarkFolderId : bookmarkFolderId})

        existingRequest.status = 'complete';
        
        //update user to have bookmarkFolderId
        const userAccount = await User.findById(req.userId);

        let indexUser = userAccount.bookmarkfolders.findIndex((id)=>id===String(bookmarkFolderId));


        if (indexUser === -1) {
            userAccount.bookmarkfolders.push(bookmarkFolderId);
        } 

        //update bookmarkFolderId to add userId 
        const bookmarkFolder = await BookmarkFolder.findById(bookmarkFolderId);

        if (rights === 'editor') {
            let indexFolderViewer = bookmarkFolder.viewers.findIndex((id)=>id===String(req.userId));
            if ( indexFolderViewer !== -1) {
                bookmarkFolder.viewers = bookmarkFolder.viewers.filter((viewer) => viewer !== req.userId);
            }
        }

        let indexFolder = bookmarkFolder[`${rights}s`].findIndex((id)=>id===String(req.userId));

        if(indexFolder === -1 ) {
           bookmarkFolder[`${rights}s`].push(req.userId); 
        } 
    
        //save to db

        const updatedRequest = await BookmarkFolderRequest.findByIdAndUpdate(existingRequest._id, existingRequest, {new:true});

        const updatedUser = await User.findByIdAndUpdate(req.userId, userAccount, {new:true});

        const updatedFolder = await BookmarkFolder.findByIdAndUpdate(bookmarkFolderId, bookmarkFolder, {new:true});

        const data = {updatedFolder, updatedUser, updatedRequest};

       

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const denyBookmarkRequest = async (req,res) => {
    const {requestId,  rights} = req.body;

    try {
        // find request and delete
        const existingRequest = await BookmarkFolderRequest.findById(requestId)

        if (!existingRequest) return res.status(400).json({message:'Request already denied'});

        await BookmarkFolderRequest.deleteOne({_id:requestId});

        res.status(201).json({message:'deleted'});

    } catch (error) {
        res.status(404).json({message:error.message});
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

export const searchFolderById = async (req,res) => {
    const {id} = req.params;
    try {
        const data = await BookmarkFolder.findById(id);

        res.status(200).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const addBookmark = async (req,res) => {
    const {folderId, bookmark} = req.body;
    try {
        
        const existingFolder = await BookmarkFolder.findById(folderId);

        existingFolder.bookmarks.push(bookmark);

        const updatedFolder = await BookmarkFolder.findByIdAndUpdate(folderId, existingFolder, {new:true});

        res.status(201).json(updatedFolder);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}