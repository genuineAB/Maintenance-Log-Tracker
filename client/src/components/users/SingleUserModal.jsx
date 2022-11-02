import React,{useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateUser } from '../../actions/userActions';
import {getUsers} from '../../actions/userActions';
import { clearCurrent } from '../../actions/userActions';

const SingleUserModal = ({updateUser, current, getUsers, clearCurrent}) => {
    const auth = useSelector((state) => state.auth.user);
    const user = useSelector((state) => state.user);
    
    let sentinel;
    if(user.current === null){
        sentinel = user.current;
    }
    else{
        sentinel = user.current._id
    }
    
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [organizationName, setOrgName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [phone, setPhone] = useState('');
    
    
    useEffect(() => {
        if(current){
            setFirstName(current.firstName);
            setLastName(current.lastName)
            setEmail(current.email);
            setRole(current.role);
            setOrgName(current.organizationName);
            setOccupation(current.occupation);
            setEmploymentType(current.employment_type);
            setPhone(current.phoneNumber);
        };
        // getUsers();
    }, [current])

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
    
    const onSubmit = async () => {
        if(firstName.trim().length === 6){
            M.toast({html: 'Please Enter First Name'});
        }
        else if(firstName.trim().length > 25){
            M.toast({html: 'Name should be a maximum of 25 characters'});
        }
        else if(lastName.trim().length === 6){
            M.toast({html: 'Please Enter Last Name'});
        }
        else if(lastName.trim().length > 25){
            M.toast({html: 'Name should be a maximum of 25 characters'});
        }
        else if(phone.trim().length === 0){
            M.toast({html: 'Please Enter Phone '});
        }
        else if(validateNigNum(phone) === false && validatePhoneNumInt(phone) === false &&validatePhoneNumNig(phone) === false){
            M.toast({html: 'Invalid Phone Number. Please Enter a valid phone number'});
        }
        else{
            const userForm = {
                id: current._id,
                firstName,
                lastName,
                email,
                role,
                occupation,
                organizationName,
                employment_type: employmentType,
                phoneNumber: phone
            }
            await updateUser(userForm);
            M.toast({html: 'User Updated'});
            
            // getUsers();

            //Clear Fields
            setFirstName('');
            setLastName('');
            setRole('');
            setEmail('');
            setEmploymentType('');
            setPhone('');
            setOccupation('');
            setOrgName('');

            
            window.location.reload()
            
            
        }
        
    }

    return (
        
        <div id='get-user-modal' className='modal' style={modalStyle}>
            <div className='modal-content'>
                <h4>User Details</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <input name='firstName' type="text" value={firstName} onChange={e => setFirstName(e.target.value)} disabled={(auth.role !== 'Admin') && (auth._id !== sentinel)}/>
                        <label htmlFor="firstName" className='active'> First Name</label>
                    </div>
                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <input name='lastName' type="text" value={lastName} onChange={e => setLastName(e.target.value)} disabled={(auth.role !== 'Admin') && (auth._id !== sentinel)}/>
                        <label htmlFor="lastName" className='active'> Last Name</label>
                    </div>
                    
                </div>
                <div className='row'>
                    <div className="input-field col s12">
                        <i className="material-icons prefix">phone</i>
                        <input name='phone' type="text" value={phone} onChange={e => setPhone(e.target.value)} disabled={(auth.role !== 'Admin') && (auth._id !== sentinel)}/>
                        <label htmlFor="Phone Number" className='active'>Phone Number</label>
                    </div>
                </div>
                

                {(auth.role !== 'Admin') ? (
                    <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input type="email" name='email'  value={email} onChange={e => setEmail(e.target.value)} disabled={auth.role !== 'Admin' && sentinel !== auth._id}/>
                    <label htmlFor="Email" className='active'>Email</label>
                </div>) : (
                    <div className="row">

                    <div className="input-field col s6">
                        <i className="material-icons prefix">email</i>
                        <input type="email" name='email'  value={email} onChange={e => setEmail(e.target.value)} disabled={auth.role !== 'Admin' && sentinel !== auth._id}/>
                        <label htmlFor="Email" className='active'>Email</label>
                    </div>
                     <div className="input-field col s6">
                        <i className="material-icons prefix" >business</i>
                    <input name="organization" type="text" value={organizationName} onChange={e => setOrgName(e.target.value)} disabled={auth.role !== 'Admin'}/>
                    <label htmlFor="organization_name" className='active'>Organization Name</label>
                    </div>
                    
                </div>
                )}
                
                {((sentinel === null || user.current.role === 'Admin') || (auth.role !== 'Admin')) ? <span></span> : (
                    <div className='row'>        
                        <div className="input-field col s6">
                            <input name='employment' type="text"  value={employmentType} onChange={e => setEmploymentType(e.target.value)} disabled={auth.role !== 'Admin'}/>
                            <label htmlFor="employment_type" className='active'> Employment Type</label>
                        </div>
                        <div className="input-field col s6">
                            <input name='occupation' type="text" className="validate" value={occupation} onChange={e => setOccupation(e.target.value)} disabled={auth.role !== 'Admin'}/>
                            <label htmlFor="occupation_type" className='active'>Occupation</label>
                        </div>
                    </div>
                )
}
                
                {(sentinel === null || user.current.role === 'Admin') ?  ( <p  style={{display: 'inline', paddingRight: '20px'}}>
                        <label>
                            <input name="role" type="radio" value="Admin" checked={role === 'Admin'} onChange={e => setRole(e.target.value)} />
                            <span>Admin</span>
                        </label>
                    </p>) : (
                <div>
                {(auth.role === 'Admin') ? (
                    (
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
                        )
                ) : (
                    <div>
                    {(role === 'Guest') ? (
                        <p  style={{display: 'inline', paddingRight: '20px'}}>
                            <label>
                                <input name="role" type="radio" value="Guest" checked={role === 'Guest'} onChange={e => setRole(e.target.value)} />
                                <span>Guest</span>
                            </label>
                        </p>) : (
                        <p  style={{display: 'inline', paddingRight: '20px'}}>
                            <label>
                                <input name="role" type="radio" value="Technician" checked={role === 'Technician'} onChange={e => setRole(e.target.value)} />
                                <span>Technician</span>
                            </label>
                        </p>
                        )}
                    </div>
                )} 
                
                            
                            
                </div>
                )}
                
                
                {(auth.role === 'Admin' || sentinel === auth._id) ? 
                    (<div className='modal-footer'>
                    <button className="modal-close btn blue waves-effect waves-light" type="submit" name="action" onClick={onSubmit}>Update User
                        <i className="material-icons right">send</i>
                    </button>
                </div>) : <span></span> }
                
            </div>
        </div>
      )
  
}

const modalStyle = {
    width: '60%',
    height: '75%'
}




SingleUserModal.propTypes = {
    updateUser: PropTypes.func.isRequired,
    current: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        current: state.user.current
    }
}
export default connect(mapStateToProps, {updateUser, getUsers, clearCurrent})(SingleUserModal);





