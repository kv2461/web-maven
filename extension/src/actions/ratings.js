// import { GET_FOLDERS } from '../reducers/folders'; 
import { LOAD_EXISTING_URL_RATINGS, LOAD_EXISTING_USER_URL_RATINGS, LOAD_EXISTING_AVERAGE, LOAD_EXISTING_REVIEW, LOAD_MOST_RECENT } from '../reducers/ratings';
// import { ADD_EDITOR_ERROR, ADD_VIEWER_ERROR, DELETE_BOOKMARK_ERROR } from '../reducers/folders'

import * as api from '../api';

//FOLDER MAIN

export const RateUrl = (url, value) => async (dispatch) => {
    try {
        const { data } = await api.rateUrl(url, value);

        console.log(data);

        dispatch(GetUrlRatings(url));
    } catch (error) {
        console.log(error);
    }
}

export const GetUrlRatings = (url, sortBy) => async (dispatch) => {
    try {
        const { data } = await api.getUrlRatings(url, sortBy);
        console.log(data);
        if (data.existingRatings) {
            dispatch(LOAD_EXISTING_URL_RATINGS(data.existingRatings));
        }

        if (data.existingUserRatings) {
            dispatch(LOAD_EXISTING_USER_URL_RATINGS(data.existingUserRatings));
        }

        if (data.average) {
            dispatch(LOAD_EXISTING_AVERAGE(data.average));
        }

        if (data.existingReview) {
            console.log(data.existingReview);
            dispatch(LOAD_EXISTING_REVIEW(data.existingReview));
        }
        
        if (data.mostRecentReviews) {
            console.log(data.mostRecentReviews);
            dispatch(LOAD_MOST_RECENT(data.mostRecentReviews));
        }

    } catch (error) {
        console.log(error);
    }
}

export const SubmitReview = (url,review) => async (dispatch) => {
    try {
        const { data } = await api.submitReview(url,review);

        console.log(data);

        dispatch(GetUrlRatings(url));

    } catch (error) {
        console.log(error);
    }
}

export const GetReviewItem = (reviewItem) => async (dispatch) => {
    try {
        if (reviewItem) {
            const { data } = await api.getReviewItem(reviewItem);

            return data
        }

    } catch (error) {
        console.log(error);
    }
}

export const ApproveReview = (reviewItem) => async (dispatch) => {
    try {
        const { data } = await api.approveReview(reviewItem);
        
        
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const DownVoteReview = (reviewItem) => async (dispatch) => {
    try {
        const { data } = await api.downVoteReview(reviewItem);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}