import React, {useRef} from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { searchLogs } from '../../actions/logAction';

const SearchLog = ({searchLogs}) => {
    const auth = useSelector((state) => state.auth);
    
   
    const text = useRef('');

    const onChange = e => {
        searchLogs(text.current.value);
    }
    if(auth.user && !auth.loading){
        return (
        
            <form className="input-field"  style={{width: '50%'}}>
                <div className="input-field" >
                    <input id="search" type="search" placeholder='Search Logs...' ref={text} onChange={onChange} />
                    <i className="material-icons">close</i>
                </div>
            </form>
        )
    }
      
    
}

export default connect(null, {searchLogs})(SearchLog)