import React, { useEffect, Fragment } from "react";
import "./App.css";
import "materialize-css/dist/css/materialize.min.css";
import M from "materialize-css/dist/js/materialize.min.js";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./routing/PrivateRoute";
import Logs from "./components/logs/Logs";
import Auth from "./components/auth/Auth";

import Home from "./pages/Home";
import PublicRoute from "./routing/PublicRoute";
import Pages from "./pages";
const App = () => {
  useEffect(() => {
    //Initialize materialize JS
    M.AutoInit();
  });
  return (
    <Provider store={store}>
      <Fragment>
        {/* <Routes>
            <Route exact path="/auth" element={<PublicRoute />} />
            <Route exact path="/" element={<Home />} />
          </Routes> */}
        <Pages />
      </Fragment>
    </Provider>
  );
};

export default App;
