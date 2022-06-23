import { createSlice } from '@reduxjs/toolkit';

export const mainSlice = createSlice({
    name:'state',
    initialState:{state:{}, searchedFriend:{}, searchedFriendError:''},
    reducers: {
        SEARCH_FRIEND: (state, action) => {
            return {...state, searchedFriend:action.payload, searchedFriendError:''}
        },
        SEARCH_FRIEND_ERROR: (state, action) => {
            return {...state, searchedFriend:{}, searchedFriendError:action.payload}
        }
    }
})

export const { SEARCH_FRIEND, SEARCH_FRIEND_ERROR } = mainSlice.actions; 

export default mainSlice.reducer;