// import { GET_FOLDERS } from '../reducers/folders'; 
import { LOAD_EXISTING_URL_RATINGS, LOAD_EXISTING_USER_URL_RATINGS, LOAD_EXISTING_AVERAGE } from '../reducers/ratings';
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

export const GetUrlRatings = (url) => async (dispatch) => {
    try {
        const { data } = await api.getUrlRatings(url);

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
    } catch (error) {
        console.log(error);
    }
}