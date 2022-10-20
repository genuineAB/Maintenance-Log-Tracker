import { combineReducers } from "redux";
import authReducer from "./authReducer";
import logReducer from "./logReducer";
import userReducer from "./userReducer";


export default combineReducers({
    auth: authReducer,
    log: logReducer,
    user: userReducer
});