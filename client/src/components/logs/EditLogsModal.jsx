import React,{useState, useEffect} from 'react';
import { connect, useSelector } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import TechSelectOption from '../users/TechSelectOption';
import { updateLogs } from '../../actions/logAction';

const EditLogModal = ({updateLogs, current}) => {
    const auth = useSelector((state) => state.auth.user);
    
    const [message, setMessage] = useState('');
    const [attention, setAttention] = useState(false);
    const [technician, setTech] = useState('');
    
    useEffect(() => {
        if(current){
            setMessage(current.message);
            setAttention(current.attention);
            setTech(current.technician);
        };
    }, [current])

    const updatedBy = auth.firstName + ' ' + auth.lastName;
    const onSubmit = () => {
        if(message.trim().length === 0 ){
            M.toast({html: 'Please enter a message'});
        }
        else{
            const updateLog = {
                id: current._id,
                message,
                attention,
                technician,
                updatedBy
            }
            
            updateLogs(updateLog);
            M.toast({html: 'Logs Updated'});
            // window.location.reload();
            

            //Clear Fields
            setMessage('');
            setTech('');
            setAttention(false);
        }
        
    }
    

  return (
    <div id='edit-log-modal' className='modal' style={modalStyle}>
        <div className='modal-content'>
            <h4 style={{paddingBottom: '2rem'}}>Maintenance Log</h4>
            <div className='row'>
                <div className='input-field'>
                    <input type='text' name='message' value={message} onChange={e => setMessage(e.target.value)} disabled={auth.role === 'Guest'}/>
                    <label htmlFor="message" className='active'>Log Message</label>
                </div>
            </div>
            {(auth.role === 'Admin') ? 
                (
                <div className='row'>
                <div className='input-field'>
                    <select name="technician" value={technician} className='browser-default' onChange={e => setTech(e.target.value)}>
                        <option value='' disabled>
                            Select Technician
                        </option>
                        <TechSelectOption />

                    </select>
                </div>
                </div>
                ) : <span></span>}
            

            <div className='row'>
                <div className='input-field'>
                    <p>
                        <label>
                            <input type='checkbox' className='filled-in' checked={attention} value={attention} onChange={ e => setAttention(!(attention))} disabled={auth.role === 'Guest'}/>
                        
                        <span>Needs Attention</span>
                        </label>
                    </p>
                    
                </div>
            </div>
        </div>
        {(auth.role === 'Admin' || auth.role === 'Technician') ?
            (
                <div className='modal-footer'>
                    <button className="modal-close btn blue waves-effect waves-light" type="submit" name="action" onClick={onSubmit}>Update Log
                        <i className="material-icons right">send</i>
                    </button>
                </div>
            ) : <span></span>}
        
    </div>
  )
}

const modalStyle = {
    widht: '75%',
    height: '75%'
}

EditLogModal.propTypes = {
    updateLogs: PropTypes.func.isRequired,
    current: PropTypes.object
}

const mapStateToProps = (state) => {
    return {
        current: state.log.current
    }
}
export default connect(mapStateToProps, {updateLogs})(EditLogModal);