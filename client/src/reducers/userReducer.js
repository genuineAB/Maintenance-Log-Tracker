import {
    GET_USERS, ADD_USER, DELETE_USER, USER_ERROR, SET_LOADING
} from '../actions/types';

const initialState = {
    users: null,
    loading: false,
    error: null
}


const userReducer = (state=initialState, action) => {
  switch (action.type) {

    case SET_LOADING: {
        return {
            ...state,
            loading: true
        }

    }

    case GET_USERS:
        return {
            ...state,
            users: action.payload,
            loading: false
        }
    
    case ADD_USER:
        return {
            ...state,
            users: [action.payload, ...state.users],
            loading: false
        }
    
    case DELETE_USER:
        return {
            ...state,
            users: state.users.filter(tech => tech.id !== action.payload),
            loading: false
        }

    case USER_ERROR:
        return {
            ...state,
            error: action.payload,
            loading: false
        }

    default:
        return state;
  }
}

export default userReducer