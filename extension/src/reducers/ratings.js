import { createSlice } from '@reduxjs/toolkit';

export const ratingsSlice = createSlice({
    name:'state',
    initialState:{ urlRatings:[], userUrlRatings:{}, average:0, userReview:{}, mostRecentReviews:[]},
    reducers: {
        LOAD_EXISTING_URL_RATINGS: (state, action) => { 
            return {...state, urlRatings:action.payload};
        },
        LOAD_EXISTING_USER_URL_RATINGS: (state, action) => {
            return {...state, userUrlRatings:action.payload};
        },
        LOAD_EXISTING_AVERAGE: (state, action) => {
            return {...state, average:action.payload};
        },
        LOAD_EXISTING_REVIEW: (state, action) => {
            return {...state, userReview:action.payload};
        },
        LOAD_MOST_RECENT: (state, action) => {
            return {...state, mostRecentReviews:action.payload };
        }
    }
})

export const { LOAD_EXISTING_URL_RATINGS, LOAD_EXISTING_USER_URL_RATINGS, LOAD_EXISTING_AVERAGE, LOAD_EXISTING_REVIEW, LOAD_MOST_RECENT } = ratingsSlice.actions; 

export default ratingsSlice.reducer;