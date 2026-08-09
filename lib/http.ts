import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { toast } from "sonner";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const http = axios.create({
  baseURL: apiUrl,
});

// Request interceptor: Add access token to headers
http.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: Handle token refresh on 401
http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Prevent infinite loop
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = getCookie("refreshToken");
      const token = getCookie("token");

      if (!refreshToken || !token) {
        return Promise.reject(error);
      }
      try {
        const res = await axios.post(
          `${apiUrl}/auth/refresh-token`,
          { refreshToken: `Bearer ${refreshToken}` },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (res.data?.token) {
          // Save new tokens in cookies
          setCookie("token", res.data.token);
          setCookie("refreshToken", res.data.refreshToken);

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${res.data.token}`;
          return http(originalRequest);
        } else {
          toast.error("Please login again, session expired 😉!!");
          logoutUser();
          return Promise.reject(error);
        }
      } catch (refreshError) {
        logoutUser();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Utility function to log user out
function logoutUser() {
  deleteCookie("token");
  deleteCookie("refreshToken");
  window.location.href = "/login"; // Redirect to login page
}

export { http };
