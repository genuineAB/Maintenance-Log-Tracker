import React from 'react';
import { connect } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import M from 'materialize-css/dist/js/materialize.min.js';
import { deleteUser } from '../../actions/userActions';

const UserItems = ({user:{_id, name}, deleteUser}) => {

  const onDelete = () => {
    deleteUser(_id);
    M.toast({html: `${name} deleted from technician list`});
    // window.location.reload();
  }
  return (
    <li className='collection-item'>
        <div> 
        <i className="fa-solid fa-circle-user" /> {' '}{name}

            <a href='#!' className='secondary-content' onClick={onDelete}>
              <i className='material-icons grey-text'>delete</i>
            </a>
        </div>
        
    </li>
  )
}

UserItems.propTypes = {
    user: PropTypes.object.isRequired,
    deleteUser: PropTypes.func.isRequired
}

export default connect(null, {deleteUser})(UserItems)