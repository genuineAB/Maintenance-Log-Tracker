import React, {useState} from 'react';
import {connect, useSelector } from 'react-redux';
import PreLoader from '../layout/Preloader';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { verifyUser } from '../../actions/userActions';

const Verify = ({verifyUser}) => {
    const user = useSelector((state) => state.auth.user);

    const [otp, setOtp] = useState('');

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
            setOtp('');
            // window.location.reload(true);
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
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action" onClick={onConfirm} >Confirm
                    </button>
                </div>
            </form>
        </div>
  )
}

export default connect(null, {verifyUser})(Verify) 