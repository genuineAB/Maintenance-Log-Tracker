import React from 'react';
import { connect, useSelector } from 'react-redux/es/exports';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import {  setCurrent } from '../../actions/logAction';

const LogsItem = ({log, setCurrent}) => {
  const user = useSelector((state) => state.auth.user);
  
  return (
    <li className='collection-item'>
        <div>
            <a href='#edit-log-modal' className={`modal-trigger ${log.attention ? 'red-text' : 'blue-text'}`} onClick={() => {
              setCurrent(log);
            }}>{log.message}</a>
            <br />
            <span className='grey-text'>
              {}Log assigned to{' '}
              <span className='black-text'>
                {log.technician}{','}
              </span> {} added by{' '}
              <span className='black-text'>
                {log.addedBy}
              </span> 
              {' '} on {' '}
              <Moment format='MMM Do YYYY, h:mm:ss a'>{log.created}</Moment>
            </span>
            {log.updatedBy !== 'None' ? (<span>
              <span className='grey-text'>{'.'} Updated by{' '}
              <span className='black-text'>
                {log.updatedBy}
              </span> 
              {' '} on {' '}
              <Moment format='MMM Do YYYY, h:mm:ss a'>{log.updated}</Moment>
            </span>
            </span>): <span></span>}
            {(user.role === 'Admin') ? (
              <a href='#delete-log-modal' className='modal-trigger secondary-content' onClick={() => {setCurrent(log)}}>
              <i className='material-icons grey-text'>delete</i>
              </a>
            ) : <span></span>}
            
        </div>
        
    </li>
  )
}

LogsItem.propTypes ={
    log: PropTypes.object.isRequired,
    deleteLogs: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired
}

export default connect(null, { setCurrent})(LogsItem);