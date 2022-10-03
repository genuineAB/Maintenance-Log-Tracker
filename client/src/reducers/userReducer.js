import {
    GET_USERS, ADD_USER, DELETE_USER, USER_ERROR, SET_LOADING, UPDATE_USER, GET_USER, SET_CURRENT_USER
} from '../actions/types';

const initialState = {
    users: null,
    loading: false,
    error: null,
    current: null
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

    case GET_USER:
        
        return {
            ...state,
            users: state.users.filter(user => user.id !== action.payload),
            loading: false
        }

    case UPDATE_USER:
        
        return{
            ...state,
            users: state.users.map(user => user.id ===  action.payload._id ? action.payload._id : user)
        }

    case DELETE_USER:
        return {
            ...state,
            users: state.users.filter(user => user.id !== action.payload),
            loading: false
        }
    case SET_CURRENT_USER:
        
        return{
            ...state,
            current: action.payload
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