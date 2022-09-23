import React,{useEffect} from 'react';
import Auth from '../components/auth/Auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {UserLandingPage} from '../components/layout/UserLandingPage'
import { loadUser } from '../actions/authAction';

const Home = ({auth:{isAuthenticated,loading, user}, loadUser}) => {
    useEffect(() => {
        loadUser();
        // eslint-disable-next-line
    }, []);

    return (
        (!isAuthenticated && !loading) ? <Auth /> : <UserLandingPage />
    )
    
}
Home.propTypes = {
    auth: PropTypes.object.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps, {loadUser})(Home)