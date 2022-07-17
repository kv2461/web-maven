import mongoose from 'mongoose';

import UserUrlRatings from '../models/userurlratings.js';
import UrlRatings from '../models/urlratings.js';

//FOLDERS
export const rateUrl = async (req,res) => {

    //need to first see if the ratings exist, if they don't make a new rating object and add ratings into ratings array
    //if ratings does exist, check if the object already has the user's ratings
        //use findIndex/indexOf
        //if !exist then push to ratings,
        //if exist then ratings[index] = {} of new ratings

        //call getUrlRatings after

    const {url, value} = req.body;
    console.log(url);
    console.log(value);
    try {

        res.status(201).json(req.body);

        
    } catch(error) {
        res.status(404).json({message:error.message});
    }
}


export const getUrlRatings = async (req,res) => {
    const {url} = req.body;
    console.log(url);
    try {
        res.status(201).json(req.body);

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}