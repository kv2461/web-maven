import { SEARCH_FRIEND, SEARCH_FRIEND_ERROR } from '../reducers/main'; 

import * as api from '../api';

export const SearchByUsername = (username) => async (dispatch) => {
    try {
        const { data } = await api.searchByUsername(username);

        dispatch(SEARCH_FRIEND(data));
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(SEARCH_FRIEND_ERROR(error.response.data.message));
    }
}