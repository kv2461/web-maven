import mongoose from 'mongoose';

import User from '../models/user.js';
import UserUrlRatings from '../models/userurlratings.js';
import UrlRatings from '../models/urlratings.js';
import Review from '../models/reviews.js';

//RATINGS
export const rateUrl = async (req,res) => {
    const {url, value} = req.body;
    try { 
        
        //need to first see if the ratings exist, if they don't make a new rating object and add ratings into ratings array

        const existingUserRatings = await UserUrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId});

        if (existingUserRatings) {
            existingUserRatings.rating = value;
            

            const updatedUserRatings = await UserUrlRatings.updateOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId} , existingUserRatings, {new:true});
            res.status(201).json(updatedUserRatings);
        } else {
            const newUserUrlRatings = new UserUrlRatings({url: url, userId:req.userId, rating:value,});


            const {_id} = await newUserUrlRatings.save();


            const existingRatings = await UrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }});

            if (!existingRatings) {
                const newUrlRatings = new UrlRatings({url: url, ratings: [String(_id)], raters: [req.userId]});

                const savedUrlRatings = await newUrlRatings.save();

                res.status(201).json(savedUrlRatings);
            } else {
                existingRatings.ratings.push(String(_id));
                existingRatings.raters.push(req.userId);

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
    let data = {};
    try {
        const existingRatings = await UrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }});
        //need to sort by recency/approval 
        
        if(existingRatings) {
            const aggData = await UserUrlRatings.aggregate([{$match:{url:{$regex : new RegExp(url, "i") }}}, {$group:{_id:existingRatings._id, average:{$avg: '$rating'}}}]);
            const {average} = aggData[0]

            //sort by recency
            const mostRecentReviews = await Review.find({url:{$regex : new RegExp(url, "i") }}).sort({createdAt:-1});

            const existingUserRatings = await UserUrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId});
               
            if (existingUserRatings?.review) {
            
                const existingReview = await Review.findById(existingUserRatings.review);

                data = {existingRatings, existingUserRatings, average, existingReview, mostRecentReviews};
                res.status(201).json(data);
            } else {
            

            data = {existingRatings, existingUserRatings, average, mostRecentReviews};

            res.status(201).json(data);
            }
        } 

    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const submitReview = async (req,res) => {
    const {url, review} = req.body;
    try {
        const existingRatings = await UrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }});
        const existingUserRatings = await UserUrlRatings.findOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId});
        const existingUserReview = await Review.findOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId});
        if (!existingUserReview) {
            const newUserReview = new Review({url: url, review: review, userId: req.userId, rating: String(existingUserRatings._id)});
            const {_id} = await newUserReview.save();
            existingUserRatings.review = String(_id);
            existingRatings.reviews.push(String(_id));
            const updatedUrlRatings = await UrlRatings.updateOne({'url': {$regex : new RegExp(url, "i") }}, existingRatings, {new:true});
            const updatedUserUrlRatings = await UserUrlRatings.updateOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId}, existingUserRatings, {new:true});

            const data = {updatedUrlRatings, updatedUserUrlRatings, newUserReview}
            res.status(201).json(data);
        } else { //updating a review
            existingUserReview.review = review;
            existingUserReview.createdAt = new Date();
            existingUserReview.approval = 0;
            console.log(existingUserReview)
            const updatedUserReview = await Review.updateOne({'url': {$regex : new RegExp(url, "i") }, userId:req.userId}, existingUserReview, {new:true});
            
            res.status(201).json(updatedUserReview);
        }
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const getReviewItem = async (req,res) => {
    const reviewItem = req.body;
    try {
        const { username } = await User.findById(reviewItem.userId);
        const { rating } = await UserUrlRatings.findById(reviewItem.rating);
        const {approval, voters, downVoters} = await Review.findById(reviewItem._id);

        const data = {username, rating, approval, voters, downVoters};

        res.status(201).json(data);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const approveReview = async (req,res) => {
    const reviewItem = req.body;
    try {
        const existingReview = await Review.findById(reviewItem._id);
       
        if (existingReview.voters.indexOf(req.userId) === -1) { //not a voter
            if (existingReview.downVoters.indexOf(req.userId) === -1) { //not a downvoter
                existingReview.voters.push(req.userId);
                existingReview.approval++;
            } else { //is a downvoter
                existingReview.downVoters = existingReview.downVoters.filter((id) => id !== req.userId);
                existingReview.approval++;
            }
        } else {//is already a voter
            existingReview.voters = existingReview.voters.filter((id) => id !== String(req.userId));
            existingReview.approval--;
        }
        
        const updatedReview = await Review.updateOne({_id: reviewItem._id}, existingReview, {new:true});


        res.status(201).json(updatedReview);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const downVoteReview = async (req,res) => {
    const reviewItem = req.body;
    try {
        const existingReview = await Review.findById(reviewItem._id);
       
        if (existingReview.downVoters.indexOf(req.userId) === -1) { //not a downvoter 
            if (existingReview.voters.indexOf(req.userId) === -1) { //not a voter 
                existingReview.downVoters.push(req.userId);
                existingReview.approval--;
            } else { //is a voter 
                existingReview.voters = existingReview.voters.filter((id) => id !== req.userId);
                existingReview.approval--;
            }
        } else {//is already a downvoter
            existingReview.downVoters = existingReview.downVoters.filter((id) => id !== String(req.userId));
            existingReview.approval++;
        }
        
        const updatedReview = await Review.updateOne({_id: reviewItem._id}, existingReview, {new:true});


        res.status(201).json(updatedReview);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}