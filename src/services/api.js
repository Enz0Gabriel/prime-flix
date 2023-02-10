import axios from 'axios';

// Base da URL: https://api.themoviedb.org/3/
// URL DA API : /movie/now_playing?api_key=6172ce52b78bd185b74c4620691772d7&language=pt-br

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;