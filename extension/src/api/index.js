import axios from 'axios';

const API = axios.create({ baseURL : 'https://web-maven-kv.herokuapp.com/' });

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

export const deleteBookmarkFolder = (folder) => API.patch('/folders/delete', folder);

export const sendEditorRequest = (friend,bookmarkFolderId) => API.post('/folders/sendEditorReq', {friend,bookmarkFolderId});

export const sendViewerRequest = (friend,bookmarkFolderId) => API.post('/folders/sendViewerReq', {friend,bookmarkFolderId});

export const getFolders = () => API.get('/folders/get');

export const searchFolderById = (id) => API.get(`/folders/searchById/${id}`);

export const acceptBookmarkRequest = (requestId, bookmarkFolderId, rights) => API.patch('/folders/accept', {requestId, bookmarkFolderId, rights});

export const denyBookmarkRequest = (requestId, rights) => API.patch('/folders/deny', {requestId, rights});

export const removeFromBookmarkFolder = (userId, folderId, rights) => API.patch('/folders/remove', {userId, folderId, rights});


//bookmarks
export const addBookmark = (folderId, bookmark) => API.patch('/folders/addBookmark', {folderId, bookmark});

export const deleteBookmark = (folderId, bookmark) => API.patch('/folders/deleteBookmark', {folderId, bookmark});

export const flagBookmark = (folderId, bookmark, flag) => API.patch('/folders/flagBookmark', {folderId, bookmark, flag});

export const unflagBookmark = (folderId, bookmark) => API.patch('/folders/unflagBookmark', {folderId, bookmark});

//favorite
export const favoriteFolder = (folderId) => API.patch('/folders/favoriteFolder', {folderId});

//ratings
export const rateUrl = (url, value) => API.patch('/ratings/url', {url, value});

export const getUrlRatings = (url) => API.patch('/ratings/info', {url});

export const submitReview = (url, value) => API.patch('/ratings/submitreview', {url});