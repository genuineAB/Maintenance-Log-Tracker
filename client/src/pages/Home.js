import React, {useEffect} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

export const Home = () => {

    
    useEffect(() => {
        M.AutoInit()
    }) 

    const onClick = (e) => {
        e.preventDefault();
        console.log("Register User")
    }

    const onSubmit = (e) => {
        e.preventDefault();
        console.log("Log In User")
    }
    

    return (
    <div className='my-container'>
        <div className='header'>
            <h3><i className='fa-solid fa-screwdriver-wrench'> Maintenance Logger</i></h3>
            <p>Maintenance Logger helps you to effectively manage and track maintenance issues in your organization</p>
        </div>
        <div  className='form-1'>
            <form>
                <div className="input-field col s6">
                    <input placeholder="Email Address" id="email" type="email" className="validate" />
                </div>
                <div className="input-field col s6">
                    <input placeholder="Password" id="password" type="password" className="validate" />
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action" onClick={onSubmit}>Sign In
                    </button>
                </div>
                <div className='recover'>
                        <a href='!#'> Forgotten Password?</a>
                </div>
            </form>

            <div className='btn-items'>
                <button className="waves-effect waves-light btn modal-trigger btn-2" href="#modal1">Create New Account</button>

                <div id="modal1" className="modal form-2">
                    <div className="modal-content">
                        <h4>Sign Up</h4>
                        <p>It's Quick and Easy</p>
                    </div>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                <input id="full_name" type="text" className="validate" />
                                <label htmlFor="full_name"> Full Name</label>
                                </div>
                                <div className="input-field col s6">
                                <input id="organization_name" type="text" className="validate" />
                                <label htmlFor="organization_name">Organization Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="email_2" type="email" className="validate" />
                                <label htmlFor="email">Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="password_2" type="password" className="validate" />
                                <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            
                            <div className="modal-footer submit-btn">
                                <button href="#!" className="modal-close waves-effect btn-flat submit-1" onClick={onClick}>Sign Up</button>
                                <button href="#!" className="modal-close waves-effect btn-flat submit-2">Close</button>
                            </div>
                        </form>
                    </div>
                    
                </div>
            </div>
        </div>
        
        
    </div>
  )
}
