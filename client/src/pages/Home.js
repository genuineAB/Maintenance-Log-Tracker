import React, { useEffect } from "react";
import Auth from "../components/auth/Auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { UserLandingPage } from "../components/layout/UserLandingPage";
import Preloader from "../components/layout/Preloader";
import { loadUser } from "../actions/authAction";
import { Navigate } from "react-router-dom";
import Logs from "../components/logs/Logs";

const Home = ({ auth: { isAuthenticated, loading, user }, loadUser }) => {
  useEffect(() => {
    // loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div>
      <UserLandingPage />
      <div className="contanier">{/* <Logs /> */}</div>
    </div>
  );
};
Home.propTypes = {
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { loadUser })(Home);
