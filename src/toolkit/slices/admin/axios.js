import axios from "axios";

const api = axios.create();

// Response Interceptor
api.interceptors.response.use(
    (response) => response,

    (error) => {
        if (error.response?.status === 401) {

            // Admin session remove
            sessionStorage.removeItem("admin");
            sessionStorage.removeItem("token");
            
            // Redirect to Admin Login
            if (window.location.pathname !== "/admin") {
                window.location.replace("/admin");
            }
        }

        return Promise.reject(error);
    }
);

export default api;