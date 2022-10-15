import {
    GET_USERS, ADD_USER, DELETE_USER, USER_ERROR, SET_LOADING, UPDATE_USER, GET_USER, SET_CURRENT_USER, VERIFY_USER, CLEAR_ERRORS
} from './types';
import axios from 'axios';


//Get Users
export const getUsers = () => async dispatch => {
    try {
      setLoading();
  
      const res = await axios.get('/api/users');
  
      dispatch({
          type: GET_USERS,
          payload: res.data
      })
  
    } catch (error) {
      dispatch({
          type: USER_ERROR,
          payload: error.response.statusText
      })
    }
}
  

  //Add Users
  export const addUser = FormData => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        } 
    }
    try {
        setLoading();

        const res = await axios.post('/api/users', FormData, config);

        dispatch({
            type: ADD_USER,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.response.data
        })
        
    }
  }
// GET A User
export const getSingleUser = (id) => async dispatch => {

    try {
      const res = await axios.get(`/api/users/${id}`);
      dispatch({
          type: GET_USER,
          payload: res.data
      })
      
      setLoading();
  
    } catch (error) {
      dispatch({
          type: USER_ERROR,
          payload: error.response.data
      })
    }
  }

  //Verify User
  export const verifyUser = FormData => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        } 
    }
    
    try {
        

        const res = await axios.post('/api/verify', FormData, config);
        setLoading();
        
        dispatch({
            type: VERIFY_USER,
            payload: res.data
        });
        
    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.response.data
        })
        
    }
  }

  //Resend User OTP
  export const resendOTP = FormData => async dispatch => {
    const config = {
        headers:{
            'Content-Type': 'application/json'
        } 
    }
    
    try {
        

        const res = await axios.post('/api/verify/resend', FormData, config);
        setLoading();
        
        dispatch({
            type: VERIFY_USER,
            payload: res.data
        });
        
    } catch (error) {
        
        dispatch({
            type: USER_ERROR,
            payload: error.response.data
        })
        
    }
  }



  //Update Users
export const updateUser = (formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    setLoading()
    try {
      const res = await axios.patch(`/api/users/${formData.id}`, formData, config);
      dispatch({
          type: UPDATE_USER,
          payload: res.data
      })
      
      setLoading();
  
    } catch (error) {
      dispatch({
          type: USER_ERROR,
          payload: error.message
      })
    }
  }

  //Delete Users
  export const deleteUser = (id) => async dispatch => {
    setLoading();
    try {
        await axios.delete(`/api/users/${id}`);
        
        dispatch({
            type: DELETE_USER,
            payload: id
        })

    } catch (error) {
        dispatch({
            type: USER_ERROR,
            payload: error.message
        })
    }
  }

  //Set Current
export const setCurrent = (user) => dispatch => {
    dispatch({
        type: SET_CURRENT_USER,
        payload: user
    })
}
  //Set Loading to True
  export const setLoading = () => {
      return {
          type: SET_LOADING
      }
  }

  //Clear Errors
  export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
  }
  
  export default getUsers;
  