import React from 'react';
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';
// import UserLandingPage from '../components/layout/UserLandingPage';
import Home from '../pages/Home';

const PrivateRoute = ({auth: {isAuthenticated, loading} }) => {

    return (
        (!isAuthenticated && !loading) ? (<Navigate to='/auth' />) : (
            <div>
                <Home />
            </div>
            )
        
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
  }
  
  export default connect(mapStateToProps)(PrivateRoute)