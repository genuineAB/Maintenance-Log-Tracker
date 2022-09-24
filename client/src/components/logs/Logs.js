import React, { useEffect} from 'react';
import LogsItem from './LogsItem';
import PreLoader from '../layout/Preloader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getLogs from '../../actions/logAction'

const Logs = ({log : {logs, loading, current}, getLogs}) => {
    console.log(logs);
    useEffect(() => {
        getLogs();
        // eslint-disable-next-line
    }, [])

    if(loading || (logs === null)){
        return(
            <PreLoader />
        )
    }

//    console.log(log._id)
  return (
    <ul className='collection with-header'>
        <li className='collection-header'>
            <h4 className='center'>Maintenance Logs</h4>
        </li>
        {!loading && logs.logs.length === 0 ? (<p className='center'>No logs to show. Add Logs</p>) : (
            logs.logs.map(log => <LogsItem log={log} key={log._id}/>)
        )}
    </ul>
  )
}

Logs.propTypes = {
    log: PropTypes.object.isRequired,
    getLogs: PropTypes.func.isRequired
}
const mapStateToProps = (state) => {
    return {
        log: state.log
    }
}
export default connect(mapStateToProps, {getLogs})(Logs)