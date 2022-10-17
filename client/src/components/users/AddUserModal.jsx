import React,{useState} from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addUser } from '../../actions/otherUserAction';

const AddUserModal = ({addUser}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('Guest');
    const [occupation, setOccupation] = useState('');
    const [employmentType, setEmploymentType] = useState('');

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

    const onSubmit = () => {
        if(phone.trim().length === 0 ){
            M.toast({html: 'Please Enter Phone Number'});
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
        else if(validateNigNum(phone) === false && validatePhoneNumInt(phone) === false && validatePhoneNumNig(phone) === false){
            M.toast({html: 'Invalid Phone Number. Please Enter a valid phone number'});
        }
        else{
            const newUser = {
                firstName,
                lastName,
                role,
                occupation,
                employment_type: employmentType,
                hashed_password: password,
                phoneNumber: phone,
                email
            }
            addUser(newUser);
            // window.location.reload();

            M.toast({html: `${firstName} ${''} ${lastName} was added`});
            //Clear Fields
            setFirstName('');
            setLastName('');
            setOccupation('');
            setEmail('');
            setPassword('');
            setPhone('');
            setRole('Guest');
            setEmploymentType('');
        }
        
    }
    

  return (
    <div id='add-user-modal' className='modal form-2' style={modalStyle}>
        <div className='modal-content'>
            <h4><i className="fa-solid fa-user-plus" /> Add New User</h4>
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
                    
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="email_2" type="email" className="validate" value={email} onChange={e => setEmail(e.target.value)}/>
                        <label htmlFor="email" >Email</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="phone" type="text" className="validate" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <label htmlFor="phone" >Phone Number</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                        <input id="password_2" type="password" className="validate" value={password} onChange={e => setPassword(e.target.value)}/>
                        <label htmlFor="password" >Password</label>
                        </div>
                    </div>
                    <div className="input-field col s6">
                        <input id="employment_type" type="text" className="validate" value={employmentType} onChange={e => setEmploymentType(e.target.value)}/>
                        <label htmlFor="employment_type" > Employment Type</label>
                    </div>
                    <div className="input-field col s6">
                        <input id="occupation" type="text" className="validate" value={occupation} onChange={e => setOccupation(e.target.value)}/>
                        <label htmlFor="occupation" >Occupation</label>
                    </div>
                    <div>
                        <p  style={{display: 'inline', paddingRight: '20px'}}>
                            <label>
                                <input name="role" type="radio" value="Guest" checked={role === 'Guest'} onChange={e => setRole(e.target.value)} />
                                <span>Guest</span>
                            </label>
                        </p>
                        <p  style={{display: 'inline', paddingRight: '20px'}}>
                            <label>
                                <input name="role" type="radio" value="Technician" checked={role === 'Technician'} onChange={e => setRole(e.target.value)} />
                                <span>Technician</span>
                            </label>
                        </p>
                        <p  style={{display: 'inline', paddingRight: '20px'}}>
                            <label>
                                <input name="role" type="radio" value="Admin" checked={role === 'Admin'} onChange={e => setRole(e.target.value)} />
                                <span>Admin</span>
                            </label>
                        </p>
                    </div>
                    
                </form>
            </div>

            <div className='modal-footer'>
                <button className="modal-close btn blue waves-effect waves-light" type="submit" name="action" onClick={onSubmit}>Enter
                    <i className="material-icons right">send</i>
                </button>
            </div>
        </div>
    </div>
  )
}
const modalStyle = {
    width: '60%',
    height: '75%'
}



export default connect(null, {addUser})(AddUserModal);