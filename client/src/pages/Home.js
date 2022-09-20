import React from 'react';

export const Home = () => {
  return (
    <body>
        <div className='header'>
            <h3><i className='fa-solid fa-screwdriver-wrench'> Maintenance Logger</i></h3>
            <p>Maintenance Logger helps you to effectively manage and track maintenance issues in your organization</p>
        </div>
        <form method='POST' className='form-1'>
                <div className="input-field col s6">
                    <input placeholder="Email Address" id="email" type="email" className="validate" />
                    {/* <label for="first_name">First Name</label> */}
                </div>
                <div className="input-field col s6">
                    <input placeholder="Password" id="password" type="password" className="validate" />
                    {/* <label for="last_name">Last Name</label> */}
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action">Sign In
                    {/* <i class="material-icons right">send</i> */}
                    </button>
                </div>
                <div className='recover'>
                        <a href='!#'> Forgotten Password?</a>
                </div>
                
                <div className='btn-items'>
                    <button class="btn waves-effect waves-light btn-2" type="submit" name="action">Sign Up
                    {/* <i class="material-icons right">send</i> */}
                    </button>
                </div>
            </form>

            
        
        
    </body>
  )
}
