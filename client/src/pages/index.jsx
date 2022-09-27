import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Authenticated from "./Authenticated";
import UnAuthenticated from "./UnAuthenticated";
import axios from "axios";

import setAuthToken from "../authToken/setAuthToken";
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
      const res = await axios.get("http://localhost:5050/api/auth");

      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    } catch (err) {
      console.log("error");
      dispatch({ type: AUTH_ERROR });
    }
  };

  React.useEffect(() => {
    getUser();
    // eslint-disable-next-line
  }, []);
  console.log("auth: loading", auth.loading);

  if (auth.loading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return <Authenticated />;
  }

  return <UnAuthenticated />;
};

export default Pages;
