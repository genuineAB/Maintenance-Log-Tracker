import React from 'react';
import PropTypes from "prop-types";

export const AppNavbar = ({icon, title}) => {
  return (
    <nav style={{marginBottom: '30px', padding: '0 10px 0 10px'}} className="blue">
    <div class="nav-wrapper">
      <span style={{fontSize: '30px', fontWeight: 'bold'}}>
        <i className={icon} />{title}
        </span>
        
      {/* <a href="#" class="brand-logo">Logo</a> */}
        <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="login.html">Log In</a></li>
        <li><a href="about.html">Register</a></li>
        <li><a href="collapsible.html">About</a></li>
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