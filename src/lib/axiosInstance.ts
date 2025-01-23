import axios from "axios";


const BASE_URL=import.meta.env.BASE_URL || "http://localhost:3000/"
export const axiosInstance=axios.create({
    baseURL:BASE_URL
});