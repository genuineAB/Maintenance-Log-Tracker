import {RESET_PASSWORD, RESET_ERROR, SET_LOADING, CLEAR_ERRORS} from '../actions/types';

const initialState = {
    user: null,
    loading: false,
    error: null
}


const resetPassword = (state=initialState, action) => {
    console.log(action.type)
    switch (action.type) {

        case SET_LOADING: {
            return {
                ...state,
                loading: true
            }
    
        }
        case CLEAR_ERRORS: {
            return {
                ...state,
                error: null
            }
        }

        case RESET_PASSWORD: {
            return {
                ...state,
                user: action.payload,
                loading: false
            }
        }
        case RESET_ERROR:
            return {
                ...state,
                user: null,
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}

export default resetPassword;