import React, {useState} from 'react';
import {connect, useSelector } from 'react-redux';
import PreLoader from '../layout/Preloader';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { verifyUser } from '../../actions/userActions';
import { resendOTP } from '../../actions/userActions';
import { clearErrors } from '../../actions/userActions';

const Verify = ({verifyUser, resendOTP}) => {
    const user = useSelector((state) => state.auth.user);
    // const error = useSelector((state) => state.user.error)

    const [otp, setOtp] = useState('');

    const onResend = (e) => {
        e.preventDefault();
        const resend = {
            email: user.email,
            userId: user._id
        }

        resendOTP(resend);
        M.toast({html: 'Code Sent. Please Check your email'})
    
    }

    const onConfirm = (e) => {
        e.preventDefault();
        if(otp.trim().length === 0){
            M.toast({html: 'OTP Field cannot be Empty'});
        }
        else if((otp.trim().length !== 6)){
            M.toast({html: 'OTP must be 6 numbers'});
        }
        
        else{
            const verify = {
                otp,
                userId: user._id
                
            }
            
            verifyUser(verify);
            window.location.reload();
            ////Need to Figure out how not to move to next Line Until Until Previous Line Completes Operation
            
            
            // if(error.msg === 'Code has expired, Please Request Again'){
            //     M.toast({html: 'Code has expired, Please Request Again'});
            // }
            // else if(error.msg === 'Invalid code passed. Check your inbox'){
            //     M.toast({html: 'Invalid code passed. Check your inbox'});
                
            // }
            // else{
            //     clearErrors();
            //     setOtp('');
            //     window.location.reload(false);
            // }
            
        }
        
        
    }

    if (user === null || !user){
        <PreLoader />
        window.location.reload(false);
    }
    return (
        <div style={{margin: '20% 10%'}} >
            
            <form className='form-1 form-style '>
                <h3>
                <i className="fa-solid fa-envelope" />  Verify Your Email
                </h3>
                <p>Please Enter the 6 digits code sent to <b>{user.email}</b></p>
                <div className="input-field col s6">
                    <input placeholder="otp" id="otp" type="text" className="validate" value={otp} onChange={e => setOtp(e.target.value)} />
                </div>
                <div className='recover'>
                        <a href='!#' onClick={onResend}> RESEND CODE</a>
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action" onClick={onConfirm} >Confirm
                    </button>
                </div>
            </form>
        </div>
  )
}

export default connect(null, {verifyUser, resendOTP, clearErrors})(Verify) 