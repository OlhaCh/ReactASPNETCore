import { notification } from 'antd';
import { type } from 'os';
import { Action, Reducer } from 'redux';
import { AppThunkAction } from '../../store';
import { ILoginUser } from './auth-service';
import AuthService, { } from './auth-service'

const authService = new AuthService();

export interface AuthState {
    isLoding: boolean;
    isSucces: boolean;
}

export interface SetIsLoading {
    type: 'SET_IS_LOADING';
    isLoading: boolean;
}

export interface SetIsSuccess {
    type: 'SET_IS_SUCCESS';
    isSucces: boolean;
}

type AuthAction = SetIsLoading | SetIsSuccess;

export const actionCreators = {
    login: (loginUser: ILoginUser): AppThunkAction<AuthAction> => (dispatch, getState) => {

        dispatch({ type: "SET_IS_LOADING", isLoading: true });
        authService.login(loginUser)
            .then((response) => {
                console.log("Token: ", response.data);
                notification.success({ message: "Sign In is success!", duration: 4 });
                dispatch({ type: "SET_IS_SUCCESS", isSucces: true });
                localStorage.setItem("JWT", `Bearer ${response.data}`)
            })
            .catch(error => {
                dispatch({ type: "SET_IS_SUCCESS", isSucces: false });
                notification.error({ message: error.response.data })
                console.log(error.response.data);
            })
            .finally(() => dispatch({ type: "SET_IS_LOADING", isLoading: false }))
    }
}

const unloadedState: AuthState = {
    isLoding: false,
    isSucces: false
}

export const reducer: Reducer<AuthState> = (state: AuthState | undefined, incomingAction: Action): AuthState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as AuthAction;

    switch (action.type) {
        case "SET_IS_LOADING":
            return {
                ...state,
                isLoding: action.isLoading
            }
        case "SET_IS_SUCCESS":
            return {
                ...state,
                isSucces: action.isSucces
            }
        default: return state;
    }
}