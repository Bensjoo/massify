import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/',


})

export interface User {
    id: number;
    nick_name: string;
    is_admin: boolean;
  }

export default api;