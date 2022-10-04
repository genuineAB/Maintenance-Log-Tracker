import React,{useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { updateUser } from '../../actions/userActions';

const SingleUserModal = ({updateUser, current}) => {
    const auth = useSelector((state) => state.auth.user);
    const user = useSelector((state) => state.user);
    let sentinel;
    if(user.current === null){
        sentinel = user.current;
    }
    else{
        sentinel = user.current.name
    }
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [organizationName, setOrgName] = useState('');
    const [occupation, setOccupation] = useState('');
    const [employmentType, setEmploymentType] = useState('');
    const [phone, setPhone] = useState('');
    
    
    useEffect(() => {
        if(current){
            setName(current.name);
            setEmail(current.email);
            setRole(current.role);
            setOrgName(current.organizationName);
            setOccupation(current.occupation);
            setEmploymentType(current.employment_type);
            setPhone(current.phoneNumber);
        };
    }, [current])
    
    const onSubmit = () => {
        if(name.trim().length === 0 ){
            M.toast({html: 'Please enter a name and role'});
        }
        else{
            const userForm = {
                id: current._id,
                name,
                email,
                role,
                occupation,
                organizationName,
                employment_type: employmentType,
                phoneNumber: phone
            }
            updateUser(userForm);
            M.toast({html: 'User Updated'});
            window.location.reload(false);
            

            //Clear Fields
            setName('');
            setRole('');
            setEmail('');
            setEmploymentType('');
            setPhone('');
            setOccupation('');
            setOrgName('');
            
        }
        
    }

    return (
        
        <div id='get-user-modal' className='modal' style={modalStyle}>
            <div className='modal-content'>
                <h4>User Details</h4>
                <div className="row">
                    <div className="input-field col s6">
                        <i className="material-icons prefix">account_circle</i>
                        <input name='name' type="text" value={name} onChange={e => setName(e.target.value)} disabled={(auth.role !== 'Admin') && (auth.name !== sentinel)}/>
                        <label htmlFor="Full Name" className='active'> Name</label>
                    </div>
                    <div className="input-field col s6">
                        <i className="material-icons prefix">phone</i>
                        <input name='phone' type="text" value={phone} onChange={e => setPhone(e.target.value)} disabled={(auth.role !== 'Admin') && (auth.name !== sentinel)}/>
                        <label htmlFor="Phone Number" className='active'>Phone Number</label>
                    </div>
                </div>

                {(auth.role !== 'Admin') ? (
                    <div className="input-field col s12">
                    <i className="material-icons prefix">email</i>
                    <input type="email" name='email'  value={email} onChange={e => setEmail(e.target.value)} disabled={auth.role !== 'Admin' && sentinel !== auth.name}/>
                    <label htmlFor="Email" className='active'>Email</label>
                </div>) : (
                    <div className="row">

                    <div className="input-field col s6">
                        <i className="material-icons prefix">email</i>
                        <input type="email" name='email'  value={email} onChange={e => setEmail(e.target.value)} disabled={auth.role !== 'Admin' && sentinel !== auth.name}/>
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
                
                
                {(auth.role === 'Admin' || sentinel === auth.name) ? 
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
    width: '75%',
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
export default connect(mapStateToProps, {updateUser})(SingleUserModal);



// const SingleUserModal = () => {
//   return (
//     <div id='get-user-modal' className='modal' style={{modalStyle}}>
//         <div className='modal-content'>
//             <h4>User Details</h4>
//         </div>
//     </div>
//   )
// }

// const modalStyle = {
//     widht: '40%',
//     height: '40%'
// }

// export default SingleUserModal


