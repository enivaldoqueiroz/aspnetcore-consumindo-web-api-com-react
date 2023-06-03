import axios from 'axios';

const api = axios.create({
    //baseURL recebe o endpoint da api
    baseURL : "https://localhost:44379",
})

export default api;