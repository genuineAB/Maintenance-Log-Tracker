import {
    GET_USERS, ADD_USER, DELETE_USER, USER_ERROR, SET_LOADING
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
            payload: error.message
        })
        
    }
  }
 
  //Delete Users
  export const deleteUser = (id) => async dispatch => {
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

  //Set Loading to True
  export const setLoading = () => {
      return {
          type: SET_LOADING
      }
  }
  
  export default getUsers;
  