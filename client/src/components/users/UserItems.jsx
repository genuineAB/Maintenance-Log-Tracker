import React from 'react';
import { connect, useSelector } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteUser } from '../../actions/userActions';
import { setCurrent } from '../../actions/userActions';

const UserItems = ({user, deleteUser, setCurrent}) => {
    const auth = useSelector((state) => state.auth.user)
    console.log(auth.role)

  const onDelete = () => {
    deleteUser(user._id);
    M.toast({html: `${user.name} deleted from technician list`});
    // window.location.reload();
  }
  return (
    <li className='collection-item'>
        <div> 
            <a href='#get-user-modal' className='black-text modal-trigger' onClick={() => {setCurrent(user)}}>
                <i className="fa-solid fa-circle-user" /> {' '}{user.name}
            </a>
            {(auth.role === 'Admin') ? (
                <a href='#!' className='secondary-content' onClick={onDelete}>
                <i className='material-icons grey-text'>delete</i>
              </a>
            ) : <span></span>}
            
        </div>
        
    </li>
  )
}

UserItems.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default connect(null, {deleteUser, setCurrent})(UserItems)