import React, { useEffect} from 'react';
import LogsItem from './LogsItem';
import LogsPreLoader from '../layout/LogsPreLoader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getLogs from '../../actions/logAction';
import { useSelector } from 'react-redux';

const Logs = ({log : {logs, loading, current}, getLogs}) => {
    const auth = useSelector((state) => state.auth);
    useEffect(() => {
        getLogs();
    }, [getLogs])
    
    if(auth.user && !auth.loading){
        if(loading || (logs === null)){
            return(
                <LogsPreLoader />
            )
        }

        return (
            <ul className='collection with-header'>
                <li className='collection-header'>
                    <h4 className='center'><i className="fa-solid fa-rectangle-list" /> Maintenance Logs</h4>
                </li>
                {!loading && logs.length === 0 ? (<p className='center'>No logs to show. Add Logs</p>) : (
                    logs.map(log => <LogsItem log={log} key={log._id}/>)
                )}
            </ul>
        )
    }
  
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