import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import getUsers from '../../actions/userActions';

const TechSelectOption = ({user: {users, loading}, getUsers}) => {
    
    useEffect(() => {
        getUsers();
    }, [getUsers]);

  return (
    !loading && users !== null && users !== undefined && users.filter(user => user.role === 'Technician').map(user => <option key={user._id} value={`${user.firstName} ${user.lastName} ${user.email}`}>
        {user.firstName} {" "} {user.lastName}
    </option>)
  )
}


TechSelectOption.propTypes = {
    getUsers: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps, {getUsers})(TechSelectOption)

