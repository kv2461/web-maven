// import { GET_FOLDERS } from '../reducers/folders'; 
// import { LOADING_OFF, LOADING_ON, CLEAR, } from '../reducers/main';
// import { ADD_EDITOR_ERROR, ADD_VIEWER_ERROR, DELETE_BOOKMARK_ERROR } from '../reducers/folders'

import * as api from '../api';

//FOLDER MAIN

export const RateUrl= (url, value) => async (dispatch) => {
    try {
        const { data } = await api.rateUrl(url, value);

        console.log(data);

    } catch (error) {
        console.log(error);
    }
}