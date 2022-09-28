import React, {useEffect, useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { register } from '../../actions/authAction';
import { login } from '../../actions/authAction';


const Auth = ({register, login}) => {

    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [organization, setOrganization] = useState('')

    
    useEffect(() => {
        M.AutoInit()
        // onClick();
        // onLogIn();
        // eslint-disable-next-line
    },[] ) 

    const onSignUp = (e) => {
        e.preventDefault();
        console.log(organization);
        if(organization.trim().length === 0){
            M.toast({html: 'Please enter organization name'})
        }
        
        else if(name.trim().length < 6){
            M.toast({html: 'Please Enter a name'})
        }
        else if(email.trim().length < 6 ){
            M.toast({html: 'Please enter an email'});
        }
        else if(password.trim().length < 6 ){
            
            M.toast({html: 'Please Enter password'});
            
        }
        else{
            const signUp = {
                email,
                name,
                hashed_password: password,
                organizationName: organization
            }

            register(signUp);
            console.log(signUp)

            //Clear Fields
            setEmail('');
            setPassword('');
            setName('');
            setOrganization('');
        }
        console.log("Register User")
    }

    const onLogIn = (e) => {
        e.preventDefault();
        if(password.trim().length < 6 ){
            M.toast({html: 'Please Enter an email address'})
        }
        else if(password.trim().length < 6 ){
            M.toast({html: 'Please enter a password'});
        }
        
        else{
            const logIn = {
                email,
                hashed_password: password
            }

            login(logIn);

            //Clear Fields
            setEmail('');
            setPassword('');
        }
    }
    
    // if(!isAuthenticated && loading){
    //     return(
    //         <PreLoader />
    //     )
        
    // }
    

    return (
    <div className='my-container'>
        <div className='header'>
            <h3><i className='fa-solid fa-screwdriver-wrench'> Maintenance Logger</i></h3>
            <p>Maintenance Logger helps you to effectively manage and track maintenance issues in your organization</p>
        </div>
        <div  className='form-1'>
            <form>
                <div className="input-field col s6">
                    <input placeholder="Email Address" id="email" type="email"  className="validate" value={email} onChange={e => setEmail(e.target.value)}/>
                </div>
                <div className="input-field col s6">
                    <input placeholder="Password" id="password" type="password" className="validate" value={password} onChange={e => setPassword(e.target.value)}/>
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action" onClick={onLogIn}>Sign In
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
                                <input id="full_name" type="text" className="validate" value={name} onChange={e => setName(e.target.value)}/>
                                <label htmlFor="full_name" > Full Name</label>
                                </div>
                                <div className="input-field col s6">
                                <input id="organization_name" type="text" className="validate" value={organization} onChange={e => setOrganization(e.target.value)}/>
                                <label htmlFor="organization_name" >Organization Name</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="email_2" type="email" className="validate" value={email} onChange={e => setEmail(e.target.value)}/>
                                <label htmlFor="email" >Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="password_2" type="password" className="validate" value={password} onChange={e => setPassword(e.target.value)}/>
                                <label htmlFor="password" >Password</label>
                                </div>
                            </div>
                            
                            <div className="modal-footer submit-btn">
                                <button href="#!" className="modal-close waves-effect btn-flat submit-1" onClick={onSignUp}>Sign Up</button>
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

Auth.propTypes = {
    register: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

export default connect(null, {register, login})(Auth)