import { GET_FOLDERS } from '../reducers/folders'; 

import * as api from '../api';

export const CreateNewFolder = (folder,editors,viewers) => async (dispatch) => {
    try {
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