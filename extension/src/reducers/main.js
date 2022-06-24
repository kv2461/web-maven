import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name:'state',
    initialState:{state:{}, searchedFriend:{}, searchedFriendError:'', sendFriendReqError:'', sent:[], inventory:[], loading:false, friends:[], friendArray:[]},
    reducers: {
        SEARCH_FRIEND: (state, action) => {
            return {...state, searchedFriend:action.payload, searchedFriendError:'', sendFriendReqError:''}
        },
        SEARCH_FRIEND_ERROR: (state, action) => {
            return {...state, searchedFriend:{}, searchedFriendError:action.payload,sendFriendReqError:''}
        },
        SEND_FRIENDREQ_ERROR: (state, action) => {
            return {...state, searchedFriendError:'', sendFriendReqError:action.payload}
        },
        FRIEND_STATUS: (state, action) => {
            return {...state, sent:action.payload.sent, inventory:action.payload.inventory}
        },
        LOADING_ON: (state,action) => {
            return {...state, loading:true};
        },
        LOADING_OFF: (state,action) => {
            return {...state, loading:false};
        },
        CLEAR: (state,action) => {
            return {...state, searchedFriend:{}, searchedFriendError:'', sendFriendReqError:''};
        },
        ADDED_FRIENDS: (state,action) => {
            return {...state, friends:action.payload};
        },
        FRIEND_ARRAY: (state,action) => {
            return {...state, friendArray: [...state.friendArray.filter((friend) => friend._id !== action.payload._id), action.payload]}
        },
    }
})

export const { SEARCH_FRIEND, SEARCH_FRIEND_ERROR, SEND_FRIENDREQ_ERROR, FRIEND_STATUS, LOADING_OFF, LOADING_ON, CLEAR, ADDED_FRIENDS, FRIEND_ARRAY} = mainSlice.actions; 

export default mainSlice.reducer;