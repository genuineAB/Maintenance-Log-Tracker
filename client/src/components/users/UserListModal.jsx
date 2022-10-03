import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getUsers from '../../actions/userActions';
import UserItems from './UserItems';

const UserListModal = ({user:{users, loading}, getUsers }) => {

    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [])
 
  return (
    <div id='tech-list-modal' className='modal'>
        <div className='modal-content'>
            <h4> <i className="fa-solid fa-users" /> {' '} User List</h4>
            <ul className='collection'>
                {!loading && users !== null && users !== undefined && users.map( user => (
                    <UserItems user={user} key={user._id}/>
                    ))}
            </ul>
        </div>
    </div>
  )
}

UserListModal.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUsers})(UserListModal)