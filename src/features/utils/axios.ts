import axios from 'axios';

const client = axios.create({ 
  baseURL: 'https://social-media-api-8ch8.onrender.com/',
})

export const request = ({ ...options }) => {
  client.defaults.headers.common.Authorization = 'Bearer token';
  const onSuccess = response => response;
  const onError = error => error;
  return client(options).then(onSuccess).catch(onError);
}
