import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import getUsers from '../../actions/userActions';

const TechSelectOption = ({user: {users, loading}, getUsers}) => {
    
    // getUsers();
    useEffect(() => {
        getUsers();
    }, [getUsers]);
    
  return (
    !loading && users !== null && users !== undefined && users.map(user => <option key={user._id} value={`${user.name}`}>
        {user.name}
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

