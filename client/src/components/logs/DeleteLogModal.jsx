import React, {useEffect} from 'react';
import { useSelector, connect } from 'react-redux';
import { deleteLogs } from '../../actions/logAction';
import M from 'materialize-css/dist/js/materialize.min.js';
import {getLogs} from '../../actions/logAction';

const DeleteLogModal = ({deleteLogs, getLogs}) => {
    const auth = useSelector((state) => state.auth.user);
    const log = useSelector((state) => state.log.current);

   
    const onDelete = async () => {
        
        console.log("Got Here")
        await deleteLogs(log._id);
        M.toast({html: 'Log Deleted'});
        getLogs();
      }

  return (
    <div id='delete-log-modal' className='modal' style={modalStyle}>
        <h5 style={{padding: '3rem 1rem ', textAlign: 'center', fontWeight: 'bold'}}>Are you sure you want to delete {(log === null) ? <span></span> : <span>{log.message}</span>}?</h5>


        <div>
        {(auth.role === 'Admin') ? 
            (<div className='modal-footer' style={{paddingRight:'3rem'}}>
            <button className="modal-close btn red waves-effect waves-light" type="submit" name="action" onClick={onDelete} >Delete Log
                <i className="material-icons right">send</i>
            </button>
            </div>) : <span></span> }
    </div>
    </div>
    
    

  )
}

const modalStyle = {
    width: '35%',
    height: '30%'
}


export default connect(null, {deleteLogs, getLogs})(DeleteLogModal)