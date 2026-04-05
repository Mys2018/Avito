import axios from 'axios'

export const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
      console.error('API Error:', error);
      return Promise.reject(error);
    }
);