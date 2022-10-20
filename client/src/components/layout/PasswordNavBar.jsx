import React from 'react';
import PropTypes from "prop-types";
import {useNavigate} from "react-router-dom"

const PasswordNavbar = ({icon, title}) => {
  
    const navigate = useNavigate();
  const onClick = (e) => {
    e.preventDefault();
    navigate('/')
    
  }

  return (
    <div>
      <nav style={{marginBottom: '30px', padding: '0 10px 0 10px'}} className="blue">
        <div className="nav-wrapper">
          <span style={{fontSize: '30px', fontWeight: 'bold', textAlign:'center'}}>
            <i className={icon} />{title}
          </span>
            
          <ul id="nav-mobile" className="right hide-on-med-and-down" >
                <li><a href="#!" onClick={onClick} style={{fontSize: '1.2rem', fontWeight:'500'}}>Sign In</a></li>
                <li><a href="#!" onClick={onClick} style={{fontSize: '1.2rem', fontWeight:'500'}}>Sign Up</a></li>
          </ul>

        </div>
    
      </nav>
    </div>
   
  )
}

PasswordNavbar.propTypes = {
    title: PropTypes.string.isRequired,
    icon: PropTypes.string
}

PasswordNavbar.defaultProps = {
    title: ' Maintenance Logger ',
    icon: 'fa-solid fa-screwdriver-wrench'
}



export default (PasswordNavbar)