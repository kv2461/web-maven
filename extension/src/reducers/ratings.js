import { createSlice } from '@reduxjs/toolkit';

export const ratingsSlice = createSlice({
    name:'state',
    initialState:{ urlRatings:[], userUrlRatings:{}},
    reducers: {
        LOAD_EXISTING_URL_RATINGS: (state, action) => { 
            return {...state, urlRatings:action.payload,}
        },
        LOAD_EXISTING_USER_URL_RATINGS: (state, action) => {
            return {...state, userUrlRatings:action.payload}
        }    
    }
})

export const { LOAD_EXISTING_URL_RATINGS, LOAD_EXISTING_USER_URL_RATINGS } = ratingsSlice.actions; 

export default ratingsSlice.reducer;