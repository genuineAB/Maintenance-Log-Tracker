import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import PreLoader from './Preloader';
import { LOGOUT } from '../../actions/types';
import {loadUser} from '../../actions/authAction';

const AppNavbar = ({icon, title}) => {
  const auth = useSelector((state) => state.auth);
  
  const dispatch = useDispatch()
  useEffect(() => {
    loadUser();

  }, []);
  
  if((auth.user === null) || (auth.loading)){
    window.location.reload(true)
    return (
      <PreLoader />
      
    );
    
  }
  const onLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem('token');
    dispatch({type: LOGOUT})
    console.log("Log Out");
  }

  return (
    <div>
      <nav style={{marginBottom: '30px', padding: '0 10px 0 10px'}} className="blue">
        <div className="nav-wrapper">
          <span style={{fontSize: '30px', fontWeight: 'bold', textAlign:'center'}}>
            <i className={icon} />{title}
          </span>
            
          <ul id="nav-mobile" className="right hide-on-med-and-down" style={{fontSize: '1.2rem', fontWeight:'500'}}>
            <li style={{paddingRight: '1em'}}> <i className="fa-solid fa-building"> </i>{' '} { auth.user.organizationName }</li>
            <li style={{paddingRight: '1em'}}><i className="fa-solid fa-user"></i>{' '}{ auth.user.name}</li>
            <li><a href="#!" style={{fontSize: '1.2rem', fontWeight:'500'}} onClick={onLogout}><i className="fa-solid fa-right-from-bracket"> </i>{' '}Logout</a></li>
          </ul>

        </div>
    
      </nav>
    </div>
   
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



export default (AppNavbar)