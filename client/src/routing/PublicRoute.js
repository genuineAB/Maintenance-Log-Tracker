import React from 'react';
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';
import PreLoader from '../components/layout/Preloader';
import Auth from '../components/auth/Auth';

const PublicRoute = ({auth: {isAuthenticated, loading} }) => {

    return (
        (!isAuthenticated && !loading) ? (<Auth />) : (< Navigate to='/'/> )
        
        
    )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
  }
  
  export default connect(mapStateToProps)(PublicRoute)