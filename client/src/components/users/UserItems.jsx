import React from 'react';
import { connect, useSelector } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteUser } from '../../actions/userActions';
import { setCurrent } from '../../actions/userActions';

const UserItems = ({user, deleteUser, setCurrent}) => {
    const auth = useSelector((state) => state.auth.user);

//   const onDelete = () => {
//     deleteUser(user._id);
//     M.toast({html: `${user.name} deleted from technician list`});
//   }
  return (
    <li className='collection-item'>
        <div> 
            <a href='#get-user-modal' className='black-text modal-trigger' onClick={() => {setCurrent(user)}}>
                <i className="fa-solid fa-circle-user" /> {' '}{user.firstName} {' '} {user.lastName}
            </a>
            {(auth.role === 'Admin') ? (
                <a href='#delete-user-modal' className='secondary-content modal-trigger' onClick={() => {setCurrent(user)}}>
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