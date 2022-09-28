import AppNavbar from "../components/layout/AppNavbar";
import SearchLog from "../components/logs/SearchLog";
import Logs from "../components/logs/Logs";
import AddBtn from "../components/layout/AddBtn";

const Dashboard = () => {
    return (
        <div>
            <AppNavbar />
            <SearchLog />
            <div className='container'>
              
              <Logs />
              <AddBtn />
            </div>
        </div>
    )
  };
  
  export default Dashboard;
  