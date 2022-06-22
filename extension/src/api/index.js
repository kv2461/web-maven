import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001' });

export const fetchPostsByUsername = (username) => API.get(`/posts/user/${username}`)

export const signIn = (formData) => API.post('/user/signin',formData);

export const signUp = (formData) => API.post('/user/signup',formData);