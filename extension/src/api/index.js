import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001' });

API.interceptors.request.use((req)=> {
    if(localStorage.getItem('web-maven-profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('web-maven-profile')).token}`;
    }

    return req;
})


export const searchByUsername = (username) => API.get(`/friends/search/${username}`)

export const signIn = (formData) => API.post('/user/signin',formData);

export const signUp = (formData) => API.post('/user/signup',formData);