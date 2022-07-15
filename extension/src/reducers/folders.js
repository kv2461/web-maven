import { createSlice } from '@reduxjs/toolkit';

export const folderSlice = createSlice({
    name:'state',
    initialState:{ folders:[], sentFolders:[], recievedFolders:[], addEditorError:[], addViewerError:[], bookmarkError:'', favoriteFolders:[], render:false },
    reducers: {
        GET_FOLDERS: (state, action) => { //need to add favorites in  this load
            return {...state, folders:action.payload.bookmarkfolders, sentFolders:action.payload.sentFolders, recievedFolders:action.payload.recievedFolders, favoriteFolders:action.payload.favoriteFolders}
        },
        ADD_EDITOR_ERROR: (state, action) => {
            return {...state, addEditorError: [...state.addEditorError.filter((err) => err !== action.payload), action.payload]}
        },
        CLEAR_EDITOR_ERROR: (state, action) => {
            return {...state, addEditorError:[] }
        },
        ADD_VIEWER_ERROR: (state, action) => {
            return {...state, addViewerError: [...state.addViewerError.filter((err) => err !== action.payload), action.payload]}
        },
        CLEAR_VIEWER_ERROR: (state, action) => {
            return {...state, addViewerError:[] }
        },
        DELETE_BOOKMARK_ERROR: (state, action) => {
            return {...state, bookmarkError:action.payload}
        },
        CLEAR_BOOKMARK_ERROR: (state, action) => {
            return {...state, bookmarkError:''}
        },
        RENDER:(state, action) => {
            return {...state, render:!state.render };
        }
        

    }
})

export const { GET_FOLDERS, ADD_EDITOR_ERROR, CLEAR_EDITOR_ERROR, ADD_VIEWER_ERROR, CLEAR_VIEWER_ERROR, DELETE_BOOKMARK_ERROR, CLEAR_BOOKMARK_ERROR, RENDER } = folderSlice.actions; 

export default folderSlice.reducer;