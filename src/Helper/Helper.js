import axios from 'axios';
import { baseURL } from '../API/endpoint';

// Create an Axios instance with a base URL
export const axiosInstance = axios.create({
    baseURL,
});

// Base URL for profile pictures
const profilePicBaseUrl = 'https://wtsacademy.dedicateddevelopers.us/uploads/user/profile_pic/';

// Function to get the full profile picture URL
const profile_Url = (media) => {
    return `${profilePicBaseUrl}${media}`;
};
const profile_pic="s/upload"
// Interceptor to add authentication token to request headers
axiosInstance.interceptors.request.use(
    async function(config) {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    function(err) {
        return Promise.reject(err);
    }
);

export default profile_Url;
