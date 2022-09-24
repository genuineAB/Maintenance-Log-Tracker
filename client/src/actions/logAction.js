import {
    GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOGS, DELETE_LOGS, SET_CURRENT, UPDATE_LOG, CLEAR_CURRENT, SEARCH_LOGS
} from './types';
import axios from 'axios';


//Get Logs
export const getLogs = () => async dispatch => {
  try {
    setLoading();

    const res = await axios.get('/api/logs');

    dispatch({
        type: GET_LOGS,
        payload: res.data
    })


  } catch (error) {
    dispatch({
        type: LOGS_ERROR,
        payload: error.response.statusText
    })
  }
}

//Add Logs
export const addLogs = (logs) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
      setLoading();
  
      const res = await axios.post('/logs', logs, config);
  
      dispatch({
          type: ADD_LOGS,
          payload: res.data
      })
  
  
    } catch (error) {
      dispatch({
          type: LOGS_ERROR,
          payload: error.response.statusText
      })
    }
  }
  
  //Delete Logs
  export const deleteLogs = id => async (dispatch) => {
    setLoading();
    try {
        await axios.delete(`/logs/${id}`);
        dispatch({
            type: DELETE_LOGS,
            payload: id
        })

    } catch (error) {
        dispatch({
            type: LOGS_ERROR,
            payload: error.response.statusText
        })
    }
  }

//Update Logs
export const updateLogs = (log) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    try {
  
      const res = await axios.patch(`/logs/${log.id}`, log, config);
  
      dispatch({
          type: UPDATE_LOG,
          payload: res.data
      })
      
      setLoading();
  
    } catch (error) {
      dispatch({
          type: LOGS_ERROR,
          payload: error.response.statusText
      })
    }
  }
  
//Set Current
export const setCurrent = (log) => dispatch => {
    dispatch({
        type: SET_CURRENT,
        payload: log
    })
}

//Search Logs
export const searchLogs = (text) => async dispatch => {
    try {
      setLoading();
   
      const res = await axios.get(`/logs?q=${text}`);
  
      dispatch({
          type: SEARCH_LOGS,
          payload: res.data
      })
  
  
    } catch (error) {
      dispatch({
          type: LOGS_ERROR,
          payload: error.response.statusText
      })
    }
  }

//Clear Current
export const clearCurrent = (dispatch) => {
    dispatch({
        type: CLEAR_CURRENT
    })
}
//Set Loading to True
export const setLoading = () => {
    return {
        type: SET_LOADING
    }
}

export default getLogs;
