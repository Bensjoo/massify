import axios from "axios";

const api = axios.create({
    baseURL: 'http://localhost:8000/',


})

export interface User {
    id: number;
    nick_name: string;
    is_admin: boolean;
  }

export interface Beer {
  id: number;
  name: string;
  short_name: string;
  brewery: string;
  bolaget_number: number;
  abv: number;
}

export interface Tasting {
  id: number;
  title: string;
  started: string;
  ended?: string; // Optional, ISO date string
  participants?: Array<User>; // Assuming you have a User interface defined
}
export default api;