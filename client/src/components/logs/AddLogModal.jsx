import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addLogs } from '../../actions/logAction';
import TechSelectOption from '../users/TechSelectOption';
import M from 'materialize-css/dist/js/materialize.min.js';
import {getLogs} from '../../actions/logAction';

const AddLogModal = ({addLogs, getLogs}) => {
    const auth = useSelector((state) => state.auth);

    
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [technician, setTech] = useState('');
    const [logDescription, setLogDescription]  = useState('');

    const addedBy = auth.user.firstName + ' ' + auth.user.lastName;
    const onSubmit = async () => {
        if(message.trim().length === 0 ){
            M.toast({html: 'Please enter a message and tech'});
        }
        else{
            const newLog = {
                message,
                attention,
                technician,
                addedBy,
                logDescription
            }
            await addLogs(newLog);

            M.toast({html: `Log Added By ${auth.user}`});
            //Clear Fields
            setMessage('');
            setTech('');
            setAttention(false);
            setLogDescription('');
            getLogs();
        }
        
    }
    

  return (
    <div id='add-log-modal' className='modal' style={modalStyle}>
        <div className='modal-content'>
            <h4>Enter Maintenance Log</h4>
            <div className='row'>
                <div className='input-field'>
                    <input type='text' name='message' value={message} onChange={e => setMessage(e.target.value)} />
                    <label htmlFor='message'>
                        Log Title
                    </label>
                </div>
            </div>
            <div className="row">
                <form className="col s12">
                <div className="row">
                    <div className="input-field col s12">
                    <textarea id="logDescription" className="materialize-textarea" maxLength={500} value={logDescription} onChange={e => setLogDescription(e.target.value)}></textarea>
                    <label htmlFor="textarea1">Description of Log</label>
                    </div>
                </div>
                </form>
            </div>

            {(auth.user.role === 'Admin') ? 
                (
                <div className='row'>
                <div className='input-field'>
                    <select name="technician" value={technician} className='browser-default' onChange={e => setTech(e.target.value)}>
                        <option value='' disabled style={{fontSize: '1.2rem'}}>
                            Select Technician
                        </option>
                        <option value=''  >
                            None
                        </option >
                        <TechSelectOption />

                    </select>
                </div>
                </div>
                ) : <span></span>}

            <div className='row'>
                <div className='input-field'>
                    <p>
                        <label>
                            <input type='checkbox' className='filled-in' checked={attention} value={attention} onChange={ e => setAttention(!attention)}/>
                        
                        <span>Needs Attention</span>
                        </label>
                    </p>
                    
                </div>
            </div>
        </div>

        <div className='modal-footer'>
            <button className="modal-close btn blue waves-effect waves-light" type="submit" name="action" onClick={onSubmit}>Enter
                <i className="material-icons right">send</i>
            </button>
        </div>
    </div>
  )
}

AddLogModal.propTypes = {
    addLogs: PropTypes.func.isRequired
}

const modalStyle = {
    widht: '60%',
    height: '60%'
}




export default connect(null, {addLogs, getLogs})(AddLogModal);