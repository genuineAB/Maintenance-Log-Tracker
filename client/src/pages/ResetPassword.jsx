import React, {useState, useEffect} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { connect, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updatePassword } from '../actions/userActions';
import PreLoader from '../components/layout/Preloader';
import { loadUser } from '../actions/userActions';
const ResetPassword = ({updatePassword, loadUser}) => {
    let user = useSelector((state) => state.resetpassword);
    console.log(user)
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');

    useEffect(() => {
        if(!user || user === 'undefined'){
            <PreLoader />
        }
        
        
    }, [user])
    console.log(user.user);
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const res =  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
        return res.test(String(password));
    }

    // if(!user || user === 'undefined'){
    //    return <PreLoader />
    // }
    const onSubmit = e => {
        e.preventDefault();

        let id = user.user.payload.id;
        let token = user.user.token;

        if(password.trim().length === 0){
            M.toast({html: "Password Field Cannot Be Empty"})
        }
        else if(password.trim().length < 8 ){
            
            M.toast({html: 'Password Must be a minimum of 8 characters'});
            
        }
        else if(!validatePassword(password)){
            M.toast({html: 'Invalid Password. Must contain at least one lowercase, one uppercase, one numeric digit, and one special character'})
        }
        else if(password !== password2){
            M.toast({html: 'Password do not match'});
        }
        else if(token !== localStorage.getItem('token')){
            M.toast({html: 'Invalid Request'});
        }
        
        else {
            let reset = {
                token,
                id,
                password
            }
            updatePassword(reset)
            navigate('/')
            window.location.reload(false)
        }
        
        
    }
    
    return (
        <div style={{margin: '20% 10%'}} >
            
            <form className='form-1 form-style '>
                <h3>
                <i className="fa-solid fa-key" /> Reset Password
                </h3>
                <p>Please Enter A New Password</p>
                <div className="input-field col s6">
                    <input placeholder="Enter Password" id="reset_password" type="password" className="validate" value={password} onChange={e => setPassword(e.target.value)} />
                </div>
                <div className="input-field col s6">
                    <input placeholder="Confirm Password" id="reset_password2" type="password" className="validate" value={password2} onChange={e => setPassword2(e.target.value)} />
                </div>
                <div>
                    <button className="btn btn-1 waves-light" type="submit" name="action" onClick={onSubmit}>Submit
                    </button>
                </div>
            </form>
        </div>
  )
}

export default connect(null, {updatePassword, loadUser})(ResetPassword)