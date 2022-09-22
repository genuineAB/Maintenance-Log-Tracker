
import axios from 'axios';
import setAuthToken from '../authToken/setAuthToken';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    CLEAR_ERRORS,
    LOGOUT,
    SET_LOADING
} from './types'


// Register A User
export const register = async (dispatch, formData) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }
    try {
      const res = await axios.post('/api/users', formData, config);
      localStorage.setItem('token', res.data.token);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser();
      // console.log(loadUser);

    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      })
    }
}

// Load User
export const loadUser = async (dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
        
    }
    try {
        const res = await axios.get('/api/auth');

        dispatch({
        type: USER_LOADED,
        payload: res.data
        });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
};

export const login = async (dispatch, formData) => {
    const config = {
    headers: {
        'Content-Type': 'application/json'
    }
    }
    try {
    const res = await axios.post('/api/auth', formData, config);
    localStorage.setItem('token', res.data.token)
    dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
    })
    loadUser();

    } catch (error) {
    dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
    })
    }
}

//Logout
export const logout = (dispatch) => {
    localStorage.removeItem('token');
    dispatch({type: LOGOUT})
}

//Clear Errors
export const clearErrors = (dispatch) => {
    dispatch({type: CLEAR_ERRORS});
}

//Set Loading to True
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}