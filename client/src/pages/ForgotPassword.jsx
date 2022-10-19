import React, {useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect, useSelector } from 'react-redux';
import { resetPassword } from '../actions/userActions';
import { clearErrors } from '../actions/userActions';
import { useNavigate } from 'react-router-dom';
import { setCurrent } from '../actions/userActions';

const ForgotPassword = ({resetPassword, setCurrent}) => {
    const error = useSelector((state) => state.user.error)
    const [email, setEmail] = useState('');

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    };

    const onSubmit = e => {
        e.preventDefault();
        
        if(email.trim().length === 0){
            M.toast({html: "Email Field Cannot Be Empty"})
        }
        else if(!validateEmail(email)){
            M.toast({html: "Email is Invalid. Enter a Valid Email Address"});
        }
        
        else {
            
            const reset = {
                email
            }
            resetPassword(reset);
            navigate('/resetpassword');
        }
        
        
    }
    
    return (
        <div style={{margin: '20% 10%'}} >
            
            <form className='form-1 form-style '>
                <h3>
                <i className="fa-solid fa-key" /> Forgot Password
                </h3>
                <p>Please Enter Registered Email Address</p>
                <div className="input-field col s6">
                    <input placeholder="Email" id="reset_email" type="email" className="validate" value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action" onClick={onSubmit}>Submit
                    </button>
                </div>
            </form>
        </div>
  )
}

export default connect(null, {resetPassword, setCurrent, clearErrors})(ForgotPassword)