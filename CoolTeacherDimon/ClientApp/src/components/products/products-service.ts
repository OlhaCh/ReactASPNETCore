import axios, { AxiosRequestConfig } from "axios"

//ToDo: add values for this 
export interface IProduct {
    id: number;
    name: string;
    price: number;
}

const config: AxiosRequestConfig = {
    headers: {
        'Authorization': localStorage.getItem("JWT")
    }
}

export default class ProductsService {

    getProducts() {
        console.log(config);
        return axios.get<IProduct[]>("api/product/get-all", config);
    }
}