import mongoose from 'mongoose';

import UserUrlRatings from '../models/userurlratings.js';
import UrlRatings from '../models/urlratings.js';

//FOLDERS
export const rateUrl = async (req,res) => {
    const {url, value} = req.body;

    console.log(url);
    console.log(value);
    try { 
        
        //need to first see if the ratings exist, if they don't make a new rating object and add ratings into ratings array

        const existingUserRatings = await UserUrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId});

        if (existingUserRatings) {
            existingUserRatings.rating = value;
            

            const updatedUserRatings = await UserUrlRatings.updateOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId} , existingUserRatings, {new:true});
            res.status(201).json(updatedUserRatings);
        } else {
            const newUserUrlRatings = new UserUrlRatings({url: url, userId:req.userId, rating:value});
            console.log('hi')

            const {_id} = await newUserUrlRatings.save();
            console.log(_id);

            const existingRatings = await UrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }});

            if (!existingRatings) {
                const newUrlRatings = new UrlRatings({url: url, ratings: [String(_id)]});

                const savedUrlRatings = await newUrlRatings.save();

                res.status(201).json(savedUrlRatings);
            } else {
                existingRatings.ratings.push(String(_id));

                const updatedUrlRatings = await UrlRatings.updateOne({'url': {$regex : new RegExp(url, "i") }}, existingRatings, {new:true});

                res.status(201).json(updatedUrlRatings);
            }
        }
        
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