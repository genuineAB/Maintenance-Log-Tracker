import React,{useEffect} from "react";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./unAuthenticated";
import { useSelector, useDispatch } from "react-redux";
import setAuthToken from "../authToken/setAuthToken";
import axios from 'axios';
import PreLoader from "../components/layout/Preloader";
import { USER_LOADED, AUTH_ERROR } from "../actions/types";

const Pages = () => {
    const auth = useSelector((state) => state.auth);
    const isAuthenticated = auth.isAuthenticated;
    const dispatch = useDispatch();
    const getUser = async () => {
        if (localStorage.token) {
        setAuthToken(localStorage.token);
        }
        try {
        const res = await axios.get("/api/auth");
    
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
        } catch (err) {
        dispatch({ type: AUTH_ERROR });
        }
    };
    
    useEffect(() => {
        getUser();
        // eslint-disable-next-line
    }, []);
    
    if (auth.loading) {
        return <PreLoader />;
    }
    
    if (isAuthenticated) {
        return <Authenticated />;
    }
    
    return <UnAuthenticated />;
};

export default Pages;