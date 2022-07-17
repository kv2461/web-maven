import mongoose from 'mongoose';

// import User from '../models/user.js';
// import BookmarkFolder from '../models/bookmarkfolder.js';
// import BookmarkFolderRequest from '../models/bookmarkfolderrequest.js';

//need to make a model, UrlRatings = { url: , ratings: [ {userId:req.userId, rating: value} ] }
//ratings is an object that has the userId, and ratings associated... maybe make a model for this to and just have ratings? probably not


//FOLDERS
export const rateUrl = async (req,res) => {
    const {url, value} = req.body;
    console.log(url);
    console.log(value);
    try {

        res.status(201).json(req.body);

        
    } catch(error) {
        res.status(404).json({message:error.message});
    }
}
