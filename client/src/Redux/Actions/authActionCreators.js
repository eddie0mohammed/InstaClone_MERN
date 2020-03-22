

import axios from 'axios';

import * as actionTypes from './actionTypes';
import {returnErrors } from './errorActionCreators';




//setup config/headers and token
export const tokenConfig = (getState) => {
    //get token from local storage
    const token = getState().auth.token;

    //headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    //if token, then add token to headers
    if (token){
        config.headers['auth-token'] = token;
    }

    return config;
}



//check token and load user
export const loadUser = () => async (dispatch, getState) => {

    //dispatch user loading
    dispatch({
        type: actionTypes.USER_LOADING
    });

    const config = tokenConfig(getState);

    try{

        const res = await axios.get('http://localhost:8080/auth', config);
        
        dispatch({
            type: actionTypes.USER_LOADED,
            payload: res.data
        })


    }catch(err){
        // console.log(err.response.data);
        dispatch(returnErrors(err.response.data, err.response.status));

        dispatch({
            type: actionTypes.AUTH_ERROR
        })
    }

}







export const register = (userName, email, password) => async (dispatch) => {

    try{
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        //body
        const body = JSON.stringify({userName, email, password});

        await axios.post('http://localhost:8080/auth', body, config);
        
        dispatch({
            type: actionTypes.REGISTER_SUCCESS
        });

    }catch(err){

        dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));

        dispatch({
            type: actionTypes.REGISTER_FAIL
        });

    }   
}


export const login = (email, password) =>  async (dispatch) => {

    try{
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        //body
        const body = JSON.stringify({email, password});

        const res = await axios.post('http://localhost:8080/auth/login', body, config);
        
        dispatch({
            type: actionTypes.LOGIN_SUCCESS,
            payload: res.data
        });

    }catch(err){

        dispatch(returnErrors(err.response.data, err.response.status, 'LOGIN_FAIL'));

        dispatch({
            type: actionTypes.LOGIN_FAIL
        });

    }   


}





export const logout = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
}




export const turnRegisterToFalse = () => {
    return {
        type: actionTypes.TURN_REGISTERED_TO_FALSE
    }
}


export const resetForgotPasswordState = () => {
    return {
        type: actionTypes.RESET_FORGOT_PASSWORD
    }
}


export const forgotPassword = (email) => async (dispatch) => {

    try{
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        //body
        const body = JSON.stringify({email: email});
        
        const res = await axios.post('http://localhost:8080/auth/forgotPassword', body, config);

        dispatch({
            type: actionTypes.FORGOT_PASSWORD,
            payload: res.data
        });


    }catch(err){
        console.log(err);
    }
}


export const resetPassword = (password, token) => async (dispatch) => {

    try{
        //headers
        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

         //body
         const body = JSON.stringify({password: password});

        const res = await axios.post(`http://localhost:8080/auth/resetPassword/${token}`, body, config);

        dispatch({
            type: actionTypes.PASSWORD_CHANGED,
            payload: res.data
        });

    }catch(err){
        console.log(err);
    }
}

export const reset_resetPassword_state = () => {
    return {
        type: actionTypes.RESET_PASSWORD_CHANGED
    }
}