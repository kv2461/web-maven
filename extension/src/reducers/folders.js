import { createSlice } from '@reduxjs/toolkit';

export const folderSlice = createSlice({
    name:'state',
    initialState:{folders:[], sentFolders:[], recievedFolders:[]},
    reducers: {
        GET_FOLDERS: (state,action) => {
            return {...state, folders:action.payload.bookmarkfolders, sentFolders:action.payload.sentFolders, recievedFolders:action.payload.recievedFolders}
        },
    }
})

export const { GET_FOLDERS } = folderSlice.actions; 

export default folderSlice.reducer;