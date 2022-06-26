import { SEARCH_FRIEND, SEARCH_FRIEND_ERROR, SEND_FRIENDREQ_ERROR, FRIEND_STATUS,LOADING_OFF,LOADING_ON, ADDED_FRIENDS, FRIEND_ARRAY } from '../reducers/main'; 

import * as api from '../api';

//USER SEARCH

export const SearchByUsername = (username) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.searchByUsername(username);

        dispatch(SEARCH_FRIEND(data));
        dispatch(LOADING_OFF());
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(SEARCH_FRIEND_ERROR(error.response.data.message));
    }
}

export const SearchById = (id,situation) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.searchById(id);
        
        dispatch(LOADING_OFF());
        if (situation === 'friends') {
            dispatch(FRIEND_ARRAY(data));
        }

        return data;
    } catch (error) {
        console.log(error.response.data.message);
        dispatch(SEARCH_FRIEND_ERROR(error.response.data.message));
    }
}



//FRIEND REQUESTS
export const SendFriendRequest = (friend) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.sendFriendRequest(friend);

    
        dispatch(LOADING_OFF());
    } catch (error) {
        console.log(error);
        dispatch(SEND_FRIENDREQ_ERROR(error.response.data.message));
    }
}


export const CancelFriendRequest = (friend) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.cancelFriendRequest(friend);

        dispatch(LOADING_OFF());
    } catch (error) {
        console.log(error);
        dispatch(SEND_FRIENDREQ_ERROR(error.response.data.message));
    }
}

export const DenyFriendRequest = (friend) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.denyFriendRequest(friend);

        dispatch(LOADING_OFF());
    } catch (error) {
        console.log(error);
    }
}

export const AcceptFriendRequest = (friend) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.acceptFriendRequest(friend);

        dispatch(LOADING_OFF());
    } catch (error) {
        console.log(error)
    }
}

export const GetFriendStatus = () => async (dispatch) => {
    try {
        const { data } = await api.getFriendStatus();

        dispatch(FRIEND_STATUS(data));
    } catch (error) {
        console.log(error);
    }
} 





//LOAD
export const GetFriends = () => async (dispatch) => {
    try {
        const { data } = await api.getFriends();

        dispatch(ADDED_FRIENDS(data));
    } catch (error) {
        console.log(error);
    }
}



//FRIEND ACTIONS
export const RemoveFriend = (friend) => async (dispatch) => {
    try {
        dispatch(LOADING_ON());
        const { data } = await api.removeFriend(friend);

        console.log(data);

        dispatch(LOADING_OFF());
    } catch (error) {
        console.log(error)
    }
}
