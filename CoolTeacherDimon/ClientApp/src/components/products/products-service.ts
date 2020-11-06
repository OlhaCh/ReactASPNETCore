import axios from "axios"

//ToDo: add values for this 
export interface IProduct {
    id: number;
    name: string;
}

export default class ProductsService{
    getProducts(){
        return axios.get<IProduct[]>("api/products");
    }
}