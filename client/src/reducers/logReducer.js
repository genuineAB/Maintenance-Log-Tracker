import {
    GET_LOGS, SET_LOADING, LOGS_ERROR, ADD_LOGS, DELETE_LOGS, SET_CURRENT, UPDATE_LOG, CLEAR_CURRENT, SEARCH_LOGS
} from '../actions/types'

const initialState = {
    logs: null,
    current: null,
    loading: false,
    error: null

}

const logReducer = (state=initialState, action) => {
    switch(action.type){
        case SET_LOADING:
            return{
                ...state,
                loading: true
            }

        case LOGS_ERROR:
            console.log(action.payload);
            return{
                ...state,
                error: action.payload
            }
        
        case GET_LOGS:
            return{
                ...state,
                logs: action.payload,
                loading: false
            }

        case ADD_LOGS:
            return{
                ...state,
                logs: [action.payload, ...state.logs],
                loading: false
            }

        case DELETE_LOGS:
            return{
                ...state,
                logs: state.logs.filter(log => log.id !== action.payload),
                loading: false
            }

        case UPDATE_LOG:
            return{
                ...state,
                logs: state.logs.map(log => log.id ===  action.payload.id ? action.payload.id : log)
            }

        case SET_CURRENT:
            return{
                ...state,
                current: action.payload
            }

        case CLEAR_CURRENT:
            return{
                ...state,
                current: null
            }

        case SEARCH_LOGS:
            return{
                ...state,
                logs: action.payload
            }

        default:
            return state;
    }
}

export default logReducer