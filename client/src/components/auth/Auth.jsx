import React, {useEffect, useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { register } from '../../actions/authAction';
import { login } from '../../actions/authAction';
import { useNavigate } from 'react-router-dom';


const Auth = ({register, login}) => {
    const auth = useSelector((state) => state.auth);
    const error = auth.error;
    
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setConfirmPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [organization, setOrganization] = useState('');

    const navigate = useNavigate();
    useEffect(() => {
        M.AutoInit();
        
    },[] ) 

    const validateEmail = (email) => {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    };

    const validatePassword = (password) => {
        const res =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return res.test(String(password));
    }
    
    const validatePhoneNumNig = (phone) => {
        var res = /^\+?([0-9]{2,3})\)?\d{10}$/;
        return res.test(String(phone));
    }
    const validatePhoneNumInt = (phone) => {
        var res = /^\+?([0-9]{1,3})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4,5})$/;
        return res.test(String(phone));
    }
    const validateNigNum = (phone) => {
        var res = /((^0)(7|8|9){1}(0|1){1}[0-9]{8})/
        return res.test(String(phone));
    }

    const onForgot = e => {
        e.preventDefault();
        console.log("Forgot Your Password?");
        navigate('/forgotpassword');
    }

    const onSignUp = (e) => {
        e.preventDefault();
        if(organization.trim().length === 0 ){
            M.toast({html: 'Please Enter Organization Name'});
        }
        else if(organization.trim().length > 25){
            M.toast({html: 'Organization Name should be a minimum maximum of 25 characters'});
        }
        
        else if(firstName.trim().length === 0){
            M.toast({html: 'Please Enter First Name'});
        }
        else if(firstName.trim().length > 25){
            M.toast({html: 'Name should be a maximum of 25 characters'});
        }
        else if(lastName.trim().length === 0){
            M.toast({html: 'Please Enter Last Name'});
        }
        else if(lastName.trim().length > 25){
            M.toast({html: 'Name should be a maximum of 25 characters'});
        }
        else if(phoneNumber.trim().length === 0){
            M.toast({html: 'Please Enter Phone Number'});
        }
        else if(validateNigNum(phoneNumber) === false && validatePhoneNumInt(phoneNumber) === false &&validatePhoneNumNig(phoneNumber) === false){
            M.toast({html: 'Invalid Phone Number. Please Enter a valid phone number'});
        }
        else if(email.trim().length === 0){
            M.toast({html: 'Please enter an email'});
        }
        else if(validateEmail(email) === false){
            M.toast({html: 'Invalid Email. Please Enter a valid email address'})
        }
        else if(password.trim().length < 8 ){
            
            M.toast({html: 'Password Must be a minimum of 8 characters'});
            
        }
        else if(validatePassword(password) === false){
            M.toast({html: 'Invalid Password. Must contain at least one lowercase, one uppercase, one numeric digit, and one special character'})
        }
        else if(password !== password2){
            M.toast({html: 'Password do not match'});
        }
        
        else{
            const signUp = {
                email,
                firstName,
                lastName,
                phoneNumber,
                hashed_password: password,
                organizationName: organization
            }
            
            register(signUp);

            //Clear Fields
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setFirstName('');
            setLastName('');
            setPhoneNumber('')
            setOrganization('');
        }
        
        
    }

    const onLogIn = (e) => {
        e.preventDefault();
        if(email.trim().length === 0){
            M.toast({html: 'Please enter an email'});
        }
        else if(validateEmail(email) === false){
            M.toast({html: 'Invalid Email. Please Enter a valid email address'})
        }
        else if(password.trim().length < 8 ){
            
            M.toast({html: 'Password Must be a minimum of 8 characters'});
            
        }
        else if(validatePassword(password) === false){
            M.toast({html: 'Invalid Password. Must contain at least one lowercase, one uppercase, one numeric digit, and one special character'})
        }
        else if(error === "Email and Password don't match"){
            M.toast({html: "Email and Password don't match"});
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
            
            // window.location.reload()
        }
    }
    

    return (
    <div className='my-container'>
        <div></div>
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
                        <a href='!#' onClick={onForgot}> Forgot your Password?</a>
                </div>
            </form>

            <div className='btn-items'>
                <button className="waves-effect waves-light btn modal-trigger btn-2" href="#modal1" >Create New Account</button>

                <div id="modal1" className="modal form-2">
                    <div className="modal-content">
                        <h4>Sign Up</h4>
                        <p>It's Quick and Easy</p>
                    </div>

                    <div className="row">
                        <form className="col s12">
                            <div className="row">
                                <div className="input-field col s6">
                                <input id="first_name" type="text" className="validate" value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                <label htmlFor="first_name" > First Name</label>
                                </div>
                                <div className="input-field col s6">
                                <input id="last_name" type="text" className="validate" value={lastName} onChange={e => setLastName(e.target.value)}/>
                                <label htmlFor="last_name" > Last Name</label>
                                </div>
                            </div>
                            <div className='row'>
                                
                                <div className="input-field col s6">
                                    <input id="organization_name" type="text" className="validate" value={organization} onChange={e => setOrganization(e.target.value)}/>
                                    <label htmlFor="organization_name" >Organization Name</label>
                                </div>
                                <div className="input-field col s6">
                                    <input id="reg_phone" type="text" className="validate" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}/>
                                    <label htmlFor="phone_number" >Phone Number</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s12">
                                <input id="email_2" type="email" className="validate" value={email} onChange={e => setEmail(e.target.value)}/>
                                <label htmlFor="email" >Email</label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="input-field col s6">
                                <input id="password_2" type="password" className="validate" value={password} onChange={e => setPassword(e.target.value)}/>
                                <label htmlFor="password" >Password</label>
                                </div>
                                <div className="input-field col s6">
                                <input id="confirm_password" type="password" className="validate" value={password2} onChange={e => setConfirmPassword(e.target.value)}/>
                                <label htmlFor="password" >Confirm Password</label>
                                </div>
                            </div>
                            
                            <div className="modal-footer submit-btn">
                                <button href="#!" className="modal-close waves-effect btn-flat submit-1" onClick={onSignUp}>Sign Up</button>
                                <button href="#!" className="modal-close waves-effect btn-flat submit-2">Close</button>
                            </div>
                        </form>
                    </div>
                    <div></div>
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