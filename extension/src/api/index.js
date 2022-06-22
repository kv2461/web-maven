import axios from 'axios';

const API = axios.create({ baseURL : 'http://localhost:4001' });

export const fetchPostsByUsername = (username) => API.get(`/posts/user/${username}`)