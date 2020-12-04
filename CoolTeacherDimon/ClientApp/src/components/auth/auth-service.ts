import axios from "axios";

export interface ILoginUser {
    email: string;
    password: string;
}

export default class AuthService {
    login(loginUser: ILoginUser) {
        return axios.post<string>("api/auth/login", loginUser);
    }
}