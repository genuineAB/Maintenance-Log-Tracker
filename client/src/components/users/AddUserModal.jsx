import React,{useState} from 'react';
import { connect } from 'react-redux';
import M from 'materialize-css/dist/js/materialize.min.js';
import { addUser } from '../../actions/otherUserAction';

const AddUserModal = ({addUser}) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('Guest');
    const [occupation, setOccupation] = useState('');
    const [employmentType, setEmploymentType] = useState('');


    const onSubmit = () => {
        if(name.trim().length === 0 || password.trim().length === 0){
            M.toast({html: 'Please enter a First Name and Last Name'});
        }
        else{
            const newUser = {
                name,
                role,
                occupation,
                employment_type: employmentType,
                hashed_password: password,
                phoneNumber: phone,
                email
            }
            addUser(newUser);
            // window.location.reload();

            M.toast({html: `${name} was added as a technician`});
            //Clear Fields
            setName('');
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
            <h4>Add New User</h4>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s6">
                        <input id="full_name" type="text" className="validate" value={name} onChange={e => setName(e.target.value)}/>
                        <label htmlFor="full_name" > Full Name</label>
                        </div>
                        <div className="input-field col s6">
                        <input id="phone" type="text" className="validate" value={phone} onChange={e => setPhone(e.target.value)}/>
                        <label htmlFor="phone" >Phone Name</label>
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
    heigth: '60%'
}



export default connect(null, {addUser})(AddUserModal);