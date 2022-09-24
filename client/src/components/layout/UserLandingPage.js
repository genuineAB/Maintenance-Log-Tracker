import React from 'react';
import AppNavbar from './AppNavbar';
import SearchLog from '../logs/SearchLog';
import { connect } from 'react-redux';

export const UserLandingPage = ({auth: isAuthenticated, loading}) => {
  return (
    // (!isAuthenticated && loading) ? <PreLoader /> : <AppNavbar />
    <div>
        <div>
          <AppNavbar />
        </div>
        {/* <div>
          <SearchLog />
        </div> */}
      </div>
  )
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
  }
  
  export default connect(mapStateToProps)(UserLandingPage)
