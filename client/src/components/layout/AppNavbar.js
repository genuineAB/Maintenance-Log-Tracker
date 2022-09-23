import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import PreLoader from './Preloader';
import {logout} from '../../actions/authAction';
import {loadUser} from '../../actions/authAction'

const AppNavbar = ({auth:{loading, user},icon, title, logout}) => {

  useEffect(() => {
    loadUser();
    //eslint-disable-next-line
  },[]);

  console.log(user);
  if(user == null || (loading)){
    window.location.reload();
    return (
      <PreLoader />
    )
    
  }
  const onLogout = (e) => {
    e.preventDefault();
    logout();
    console.log("Log Out");
  }
  console.log(user)
  return (
    <nav style={{marginBottom: '30px', padding: '0 10px 0 10px'}} className="blue">
    <div className="nav-wrapper">
      <span style={{fontSize: '30px', fontWeight: 'bold', textAlign:'center'}}>
        <i className={icon} />{title}
      </span>
        
      <ul id="nav-mobile" className="right hide-on-med-and-down" style={{fontSize: '1.2rem', fontWeight:'500'}}>
        <li style={{paddingRight: '1em'}}> <i className="fa-solid fa-building"> </i>{' '} { user.user.organizationName }</li>
        <li style={{paddingRight: '1em'}}><i className="fa-solid fa-user"></i>{' '}{ user.user.name}</li>
        <li><a href="#!" style={{fontSize: '1.2rem', fontWeight:'500'}} onClick={onLogout}><i className="fa-solid fa-right-from-bracket"> </i>{' '}Logout</a></li>
      </ul>

    </div>
  </nav>
  
  )
}

AppNavbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

AppNavbar.defaultProps = {
    title: ' Maintenance Logger ',
    icon: 'fa-solid fa-screwdriver-wrench'
}

const mapStateToProps = (state) => {
  return {
      auth: state.auth
  }
}

export default connect(mapStateToProps, {logout, loadUser})(AppNavbar)