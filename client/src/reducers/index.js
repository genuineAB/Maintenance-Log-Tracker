import { combineReducers } from "redux";
import authReducer from "./authReducer";
import logReducer from "./logReducer"


export default combineReducers({
    auth: authReducer,
    log: logReducer
});