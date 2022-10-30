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
import DeleteUserModal from "../components/users/DeleteUserModal";
import CompletedLogsModal from "../components/logs/CompletedLogsModal";


const Dashboard = () => {
    React.useEffect(() => {
        //Initialize materialize JS
        M.AutoInit();

      })
    return (
        <div>
            <AppNavbar />
            <div className='container'>
                
                <SearchLog />
                <Logs />
                <EditLogsModal />
                <AddBtn />
                <AddLogModal />
                <AddUserModal />
                <UserListModal />
                <CompletedLogsModal />
                <SingleUserModal />
                <DeleteLogModal />
                <DeleteUserModal />
            </div>
        </div>
    )
  };
  
  export default Dashboard;
  