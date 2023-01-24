import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://social-media-api-8ch8.onrender.com/',
})

export default instance;