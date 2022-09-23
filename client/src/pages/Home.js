import React from 'react';
import Auth from '../components/auth/Auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { AppNavbar } from '../components/layout/AppNavbar';

const Home = ({auth:{isAuthenticated,loading, user}}) => {

    return (
        (!isAuthenticated && !loading) ? <Auth /> : <AppNavbar />
        // <div>
        //     <Auth />
        // </div>
    )
    
}
Home.propTypes = {
    auth: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(Home)