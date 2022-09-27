import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  LOGOUT,
  SET_LOADING,
} from "../actions/types";

const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: null,
  loading: true,
  user: null,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOADED:
      // console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };

    case SET_LOADING: {
      return {
        ...state,
        loading: true,
      };
    }

    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      // localStorage.setItem('token', action.payload.token);
      //   console.log(action.payload);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAIL:
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
