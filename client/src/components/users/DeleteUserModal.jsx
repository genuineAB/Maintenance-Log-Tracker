import React from 'react';
import { useSelector, connect } from 'react-redux';
import { deleteUser } from '../../actions/userActions';
import M from 'materialize-css/dist/js/materialize.min.js';

const DeleteUserModal = ({deleteUser}) => {
    const auth = useSelector((state) => state.auth.user);
    const user = useSelector((state) => state.user.current);

    const onDelete = () => {
        
        deleteUser(user._id);
        M.toast({html: 'User Deleted'});
        window.location.reload(false);
      }

  return (
    <div id='delete-user-modal' className='modal' style={modalStyle}>
        <h5 style={{padding: '3rem 1rem ', textAlign: 'center', fontWeight: 'bold'}}>Are you sure you want to delete {user === null ? '' : user.name}?</h5>


        <div>
        {(auth.role === 'Admin') ? 
            (<div className='modal-footer' style={{paddingRight:'3rem'}}>
            <button className="modal-close btn red waves-effect waves-light" type="submit" name="action" onClick={onDelete} >Delete User
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


export default connect(null, {deleteUser})(DeleteUserModal)