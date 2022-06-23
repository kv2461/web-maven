import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name:'state',
    initialState:{state:{}, searchedFriend:{}, searchedFriendError:'', sendFriendReqError:'', sent:[], inventory:[], loading:false},
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
        }
    }
})

export const { SEARCH_FRIEND, SEARCH_FRIEND_ERROR, SEND_FRIENDREQ_ERROR, FRIEND_STATUS, LOADING_OFF, LOADING_ON } = mainSlice.actions; 

export default mainSlice.reducer;