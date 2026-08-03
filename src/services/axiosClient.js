import axios from 'axios';

/**
 * Single Axios instance for the whole app. Even though we're reading local
 * JSON (no real backend), routing every request through one client means:
 *  - one place to add interceptors (loading state, error toasts, logging)
 *  - one place to change the base path if data ever moves to a real API
 *  - components never import axios directly — they import a service function
 */
export const axiosClient = axios.create({
  baseURL: '/', // local JSON lives under /public/data — see productService.js
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Centralized error normalization — every service catches the same shape.
    const message = error.response?.data?.message || error.message || 'Something went wrong.';
    return Promise.reject(new Error(message));
  }
);
