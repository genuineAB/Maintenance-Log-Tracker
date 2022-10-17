import React, {useState} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

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
            console.log("Reset Password");
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

export default ForgotPassword 