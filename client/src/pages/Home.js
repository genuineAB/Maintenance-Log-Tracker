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
                    {/* <i class="material-icons right">send</i> */}
                    </button>
                </div>
                <div className='recover'>
                        <a href='!#'> Forgotten Password?</a>
                </div>
                
                <div className='btn-items'>
                    {/* <button class="btn waves-effect waves-light btn-2" type="submit" name="action" onSubmit={onClick}>Create New Account
                    </button> */}
                    <button class="waves-effect waves-light btn modal-trigger btn-2" href="#modal1">Create New Account</button>

                    <div id="modal1" className="modal form-1">
                        <div className="modal-content">
                            <h4>Sign Up</h4>
                            <p>It's Quick and Easy</p>
                        </div>
                        <form >
                            <div className="input-field col s6">
                                <input placeholder="Full Name" id="name" type="name" className="validate" />
                                <input placeholder="Organization Name" id="organization" type="name" className="validate" />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Email" id="email" type="email" className="validate" />
                            </div>
                            <div className="input-field col s6">
                                <input placeholder="Password" id="password" type="password" className="validate" />
                            </div>
                        </form>
                        <div class="modal-footer">
                            <button href="#!" class="modal-close waves-effect waves-green btn-flat btn-2">Sign Up</button>
                            <button href="#!" class="modal-close waves-effect waves-green btn-flat btn-2">Close</button>
                        </div>
                    </div>
                </div>
            </form>

            
        
        
    </body>
  )
}
