import React, {useEffect} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

export const Home = () => {

    
    useEffect(() => {
        M.AutoInit()
    })       
    

    return (
    <body>
        <div className='header'>
            <h3><i className='fa-solid fa-screwdriver-wrench'> Maintenance Logger</i></h3>
            <p>Maintenance Logger helps you to effectively manage and track maintenance issues in your organization</p>
        </div>
        <form className='form-1'>
                <div className="input-field col s6">
                    <input placeholder="Email Address" id="email" type="email" className="validate" />
                </div>
                <div className="input-field col s6">
                    <input placeholder="Password" id="password" type="password" className="validate" />
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action">Sign In
                    {/* <i className="material-icons right">send</i> */}
                    </button>
                </div>
                <div className='recover'>
                        <a href='!#'> Forgotten Password?</a>
                </div>
                
                <div className='btn-items'>
                    {/* <button className="btn waves-effect waves-light btn-2" type="submit" name="action" onSubmit={onClick}>Create New Account
                    </button> */}
                    <button className="waves-effect waves-light btn modal-trigger btn-2" href="#modal1">Create New Account</button>

                    <div id="modal1" className="modal form-1">
                        <div className="modal-content">
                            <h4>Sign Up</h4>
                            <p>It's Quick and Easy</p>
                        </div>

                        <div className="row">
                            <form className="col s12">
                                <div className="row">
                                    <div className="input-field col s6">
                                    <input placeholder="Full Name" id="full_name" type="text" className="validate" />
                                    <label for="full_name"> Full Name</label>
                                    </div>
                                    <div className="input-field col s6">
                                    <input id="organization_name" type="text" className="validate" />
                                    <label for="organization_name">Organization Name</label>
                                    </div>
                                </div>
                                    <div className="row">
                                    <div className="input-field col s12">
                                    <input id="email" type="email" className="validate" />
                                    <label for="email">Email</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s12">
                                    <input id="password" type="password" className="validate" />
                                    <label for="password">Password</label>
                                    </div>
                                </div>
                            
                                <div className="modal-footer">
                                    <button href="#!" className="modal-close waves-effect waves-green btn-flat btn-2">Sign Up</button>
                                    <button href="#!" className="modal-close waves-effect waves-green btn-flat btn-2">Close</button>
                                </div>
                            </form>
                        </div>
                        {/* <form >
                            <div className="input-field col s6">
                                <input placeholder="Full Name" id="name" type="name" className="validate" />
                                
                            </div>
                            
                            <div className="input-field col s6">
                                <input placeholder="Email" id="email" type="email" className="validate" />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Password" id="password" type="password" className="validate" />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Organization Name" id="organization" type="name" className="validate" />
                            </div>
                            <div className="modal-footer">
                            <button href="#!" className="modal-close waves-effect waves-green btn-flat btn-2">Sign Up</button>
                            <button href="#!" className="modal-close waves-effect waves-green btn-flat btn-2">Close</button>
                        </div>
                        </form> */}
                        
                    </div>
                </div>
            </form>

            
        
        
    </body>
  )
}
