import React from "react";
import AppNavbar from "../components/layout/AppNavbar";
import SearchLog from "../components/logs/SearchLog";
import Logs from "../components/logs/Logs";
import AddBtn from "../components/layout/AddBtn";
import AddLogModal from "../components/logs/AddLogModal";
import EditLogsModal from "../components/logs/EditLogsModal";
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import AddUserModal from "../components/users/AddUserModal";
import UserListModal from "../components/users/UserListModal";
import SingleUserModal from "../components/users/SingleUserModal";
import DeleteLogModal from "../components/logs/DeleteLogModal";

const Dashboard = () => {
    React.useEffect(() => {
        //Initialize materialize JS
        M.AutoInit();
      })
    return (
        <div>
            <AppNavbar />
            <SearchLog />
            <div className='container'>
                
                <Logs />
                <EditLogsModal />
                <AddBtn />
                <AddLogModal />
                <AddUserModal />
                <UserListModal />
                <SingleUserModal />
                <DeleteLogModal />
            </div>
        </div>
    )
  };
  
  export default Dashboard;
  