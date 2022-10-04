import React from 'react';
import { useSelector, connect } from 'react-redux';
import { deleteLogs } from '../../actions/logAction';
import M from 'materialize-css/dist/js/materialize.min.js';

const DeleteLogModal = ({deleteLogs}) => {
    const auth = useSelector((state) => state.auth.user);
    const log = useSelector((state) => state.log.current)
    console.log(log)

    const onDelete = () => {
        
        console.log("Got Here")
        deleteLogs(log._id);
        M.toast({html: 'Log Deleted'});
        window.location.reload(false);
      }

  return (
    <div id='delete-log-modal' className='modal' style={modalStyle}>
        <h5 style={{padding: '3rem 1rem ', textAlign: 'center', fontWeight: 'bold'}}>Are you sure you want to delete this log?</h5>

        {/* <p style={{textAlign: 'center', paddingBottom: '2rem'}}>Are you sure you want to delete this log?</p> */}

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
    width: '40%',
    height: '20%'
}


export default connect(null, {deleteLogs})(DeleteLogModal)