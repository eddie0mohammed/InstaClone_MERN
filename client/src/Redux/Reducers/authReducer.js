

import * as actionTypes from '../Actions/actionTypes';


const initialState = {

    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    registered: false,
    passwordReset: '',
    passwordResetSuccess: ''


};


const authReducer = (state = initialState, action) => {

    switch(action.type){

        case (actionTypes.USER_LOADING):
            return {
                ...state,
                isLoading: true
            }

        case (actionTypes.USER_LOADED):
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                user: action.payload.data.user
            }

        case(actionTypes.REGISTER_SUCCESS):
            return {
                ...state,
                registered: true
            }

        case (actionTypes.LOGIN_SUCCESS):
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                isLoading: false,
                isAuthenticated: true,
                token: action.payload.token,
                user: action.payload.data.user,
                registered: false
            }
                

        case (actionTypes.AUTH_ERROR):
        case (actionTypes.LOGIN_FAIL):
        case (actionTypes.LOGOUT_SUCCESS):
        case (actionTypes.REGISTER_FAIL):
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                isLoading: false,
                user: null,
                registered: false

            }


        case (actionTypes.TURN_REGISTERED_TO_FALSE):
            return{
                ...state,
                registered: false
            }

        case (actionTypes.FORGOT_PASSWORD):
            return {
                ...state,
                passwordReset: action.payload.status
            }

        case (actionTypes.RESET_FORGOT_PASSWORD):
            return {
                ...state,
                passwordReset: ''
            }

        case (actionTypes.PASSWORD_CHANGED):
            return {
                ...state,
                passwordResetSuccess: action.payload.status
            }

        case (actionTypes.RESET_PASSWORD_CHANGED):
            return {
                ...state,
                passwordResetSuccess: ''
            }


        default:
            return state;
    }

}


export default authReducer;

