import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001' });

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('web-maven-profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('web-maven-profile')).token}`;
    }

    return req;
})



//auth
export const signIn = (formData) => API.post('/user/signin',formData);

export const signUp = (formData) => API.post('/user/signup',formData);


//main
export const searchByUsername = (username) => API.get(`/friends/search/${username}`)

export const searchById = (id) => API.get(`/friends/searchById/${id}`)

export const getFriendStatus = () => API.get('/friends/status');

export const getFriends = () => API.get('/friends/friends');

export const sendFriendRequest = (friend) => API.post('/friends/request', friend);

export const cancelFriendRequest = (friend) => API.patch('/friends/cancel', friend);

export const denyFriendRequest = (friend) => API.patch('/friends/deny', friend);

export const acceptFriendRequest = (friend) => API.patch('/friends/accept', friend);

export const removeFriend = (friend) => API.patch('/friends/remove', friend);


//folders
export const createNewFolder = (folder) => API.post('/folders/createNew', folder);

export const sendEditorRequest = (friend,bookmarkFolderId) => API.post('/folders/sendEditorReq', {friend,bookmarkFolderId});

export const sendViewerRequest = (friend,bookmarkFolderId) => API.post('/folders/sendViewerReq', {friend,bookmarkFolderId});

export const getFolders = () => API.get('/folders/get');

export const searchFolderById = (id) => API.get(`/folders/searchById/${id}`);

export const acceptBookmarkRequest = (requestId, bookmarkFolderId, rights) => API.patch('/folders/accept', {requestId, bookmarkFolderId, rights});


//bookmarks
export const addBookmark = (folderId, bookmark) => API.patch('/folders/addBookmark', {folderId, bookmark});