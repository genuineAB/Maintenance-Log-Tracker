import React, { useEffect } from "react";
import AppNavbar from "./AppNavbar";
// import { connect } from 'react-redux';
import SearchLog from "../logs/SearchLog";
import Logs from "../logs/Logs";
// import getLogs from '../../actions/logAction';

export const UserLandingPage = () => {
  // useEffect(() => {
  //   getLogs();
  //   // eslint-disable-next-line
  // }, [])

  return (
    <div>
      <AppNavbar />
      <div className="container">
        <SearchLog />
        {/* <Logs /> */}
      </div>
      {/* <SearchLog /> */}
    </div>
  );
};

// const mapStateToProps = (state) => {
//     return {
//         log: state.log
//     }
//   }

export default UserLandingPage;
