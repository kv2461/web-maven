import { createSlice } from '@reduxjs/toolkit';

export const folderSlice = createSlice({
    name:'state',
    initialState:{ folders:[], sentFolders:[], recievedFolders:[], addEditorError:[] },
    reducers: {
        GET_FOLDERS: (state, action) => {
            return {...state, folders:action.payload.bookmarkfolders, sentFolders:action.payload.sentFolders, recievedFolders:action.payload.recievedFolders}
        },
        ADD_EDITOR_ERROR: (state, action) => {
            return {...state, addEditorError: [...state.addEditorError.filter((err) => err !== action.payload), action.payload]}
        },
        CLEAR_EDITOR_ERROR: (state, action) => {
            return {...state, addEditorError:[]}
        },
    }
})

export const { GET_FOLDERS, ADD_EDITOR_ERROR, CLEAR_EDITOR_ERROR } = folderSlice.actions; 

export default folderSlice.reducer;