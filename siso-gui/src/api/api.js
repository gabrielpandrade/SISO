import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/",
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers["authorization"] = token;
        }
        console.log(config);
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
