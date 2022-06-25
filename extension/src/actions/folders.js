import { GET_FOLDERS } from '../reducers/folders'; 
import { LOADING_OFF, LOADING_ON, CLEAR } from '../reducers/main';

import * as api from '../api';

export const CreateNewFolder = (folder,editors,viewers) => async (dispatch) => {
    try {
        dispatch(LOADING_ON);
        const { data } = await api.createNewFolder(folder);

        const bookmarkfolderId = await data._id
        
        if (editors) {
            for (let i=0; i<editors.length; i++) {
                await dispatch(SendEditorRequest(editors[i],bookmarkfolderId));
            }
        }

        if (viewers) {
            const viewersFiltered = viewers.filter(function(viewer){
                return editors.filter(function(editor){
                    return editor._id == viewer._id;
                }).length == 0 }); //filter out viewers already sent at editors

            for (let i=0; i<viewersFiltered.length; i++) {
                await dispatch(SendViewerRequest(viewersFiltered[i],bookmarkfolderId));
            }
        }

    dispatch(GetFolders());
    
    dispatch(LOADING_OFF)

    } catch (error) {
        console.log(error);
    }
}

export const SendEditorRequest = (friend, bookmarkFolderId) => async (dispatch) => {
    try {
        const { data } = await api.sendEditorRequest(friend,bookmarkFolderId);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const SendViewerRequest = (friend, bookmarkFolderId) => async (dispatch) => {
    try {
        const { data } = await api.sendViewerRequest(friend,bookmarkFolderId);

        console.log(data);
    } catch (error) {
        console.log(error);
    }
}

export const GetFolders = () => async (dispatch) => {
    try {
        const { data } = await api.getFolders();

        dispatch(GET_FOLDERS(data));
    } catch (error) {
        console.log(error);
    }
}

export const SearchFolderById = (folderId) => async (dispatch) => {
    if (!folderId) {
        return;
    }
    
    try {
        const id = folderId.replace(/^"(.+(?="$))"$/, '$1');
        dispatch(LOADING_ON());
        const { data } = await api.searchFolderById(id);
        
        dispatch(LOADING_OFF());
        return data;
    } catch (error) {
        console.log(error);
    }
}

export const AddBookmark = (folderId, bookmark) => async (dispatch) => {
    try{
        dispatch(LOADING_ON);
        const data = await api.addBookmark(folderId, bookmark);

        console.log(data);
        dispatch(LOADING_OFF());
        dispatch(GetFolders());
        dispatch(CLEAR());
    } catch (error) {
        console.log(error);
    }
}