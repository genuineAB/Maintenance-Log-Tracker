import React, {useEffect} from 'react';
import PropTypes from "prop-types";
import { useSelector, useDispatch } from 'react-redux';
import PreLoader from './Preloader';
import { LOGOUT } from '../../actions/types';
// import {loadUser} from '../../actions/authAction';
import axios from 'axios';
import setAuthToken from '../../authToken/setAuthToken';
import { baseURL } from '../../utils/constant';
import {USER_LOADED, AUTH_ERROR} from '../../actions/types'

const AppNavbar = ({icon, title}) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  useEffect(() => {
    const loadUser = async() => {
      if(localStorage.token){
        setAuthToken(localStorage.token);
        
    }
    try {
        const res = await axios.get(baseURL+'/api/auth');
  
        dispatch({
        type: USER_LOADED,
        payload: res.data
        });
    } catch (err) {
        dispatch({ type: AUTH_ERROR });
    }
    }
    loadUser()
    //eslint-disable-next-line
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
    window.location.reload(false);
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
            <li style={{paddingRight: '1em'}}><i className="fa-solid fa-user"></i>{' '}{ auth.user.firstName} {' '} {auth.user.lastName}</li>
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