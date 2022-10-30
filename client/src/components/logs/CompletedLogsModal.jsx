import React, {useEffect, useState} from 'react';
import { useSelector, connect } from 'react-redux';
import { updateLogs } from '../../actions/logAction';

const CompletedLogsModal = ({updateLogs}) => {
    const auth = useSelector((state) => state.auth.user);
    const log = useSelector((state) => state.log.current);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if(log){
            setCompleted(log.completed);
        };
    }, [log])

  
    const onUpdate = () => {
        
        console.log(log)
        console.log(log._id)
        console.log(completed)
        const updateLog = {
        id: log._id,
        completed,
        technician: log.technician,
        message: log.message,
        attention: log.attention
        }
        updateLogs(updateLog);
        window.location.reload(false);
    }


  return (
    <div id='completed-logs-modal' className='modal' style={modalStyle}>
        <h5 style={{padding: '3rem 1rem ', textAlign: 'center', fontWeight: 'bold'}}>Check the box if you have resolved {(log === null) ? <span></span> : <span>{log.message}</span>}?
            <p>
                <label>
                    <input type='checkbox' className='filled-in' checked={completed} value={completed} onChange={ e => setCompleted(!(completed))} disabled={auth.role === 'Guest'}/>
                
                <span>Mark As Completed</span>
                </label>
            </p>
        </h5>
        <div>
        {(auth.role === 'Admin' || auth.role==='Technician') ? 
            (<div className='modal-footer' style={{paddingRight:'3rem'}}>
            <button className="modal-close btn red waves-effect waves-light" type="submit" name="action" onClick={onUpdate} >Mark As Done
                <i className="material-icons right">send</i>
            </button>
            </div>) : <span></span> }
    </div>
    </div>
    
    

  )
}

const modalStyle = {
    width: '40%',
    height: '20%'
}

// const mapStateToProps = (state) => {
//     return {
//         current: state.log.current
//     }
// }

export default connect(null, {updateLogs})(CompletedLogsModal)