import { notification } from 'antd';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../../store';
import ProductsService, { IProduct } from "./products-service";

const productsService = new ProductsService();

export interface ProductsState {
    listProducts: IProduct[];
    isLoading: boolean;
    isFailed: boolean;
    isSucces: boolean;
}

export interface GetProductsStarted {
    type: 'GET_PRODUCTS_STARTED';
}

export interface GetProductsSuccess {
    type: 'GET_PRODUCTS_SUCCESS';
    listProducts: IProduct[];
}

export interface GetProductsFailed {
    type: 'GET_PRODUCTS_FAILED';
}

type ProductsAction = GetProductsStarted | GetProductsSuccess | GetProductsFailed;

export const actionCreators = {
    getProducts: (): AppThunkAction<ProductsAction> => (dispatch, getState) => {

        dispatch({ type: "GET_PRODUCTS_STARTED" });
        productsService.getProducts()
            .then(response => {
                dispatch({ type: "GET_PRODUCTS_SUCCESS", listProducts: response.data });
            })
            .catch(error => {
                dispatch({ type: "GET_PRODUCTS_FAILED" });
                notification.error({message: error.response.data})
                console.log(error.response.data);
            })
    }
}

const unloadedState: ProductsState = {
    isFailed: false,
    isLoading: false,
    isSucces: false,
    listProducts: []
}

export const reducer: Reducer<ProductsState> = (state: ProductsState | undefined, incomingAction: Action): ProductsState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as ProductsAction;

    switch (action.type) {
        case "GET_PRODUCTS_STARTED":
            return {
                ...state,
                isFailed: false,
                isLoading: true,
                isSucces: false,
                listProducts: []
            }
        case "GET_PRODUCTS_SUCCESS":
            return {
                ...state,
                isFailed: false,
                isLoading: false,
                isSucces: true,
                listProducts: action.listProducts
            }
        case "GET_PRODUCTS_FAILED":
            return {
                ...state,
                isFailed: true,
                isLoading: false,
                isSucces: false
            }
    }
    return state;
}