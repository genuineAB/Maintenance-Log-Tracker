import React, {useRef} from 'react';
import { useSelector } from 'react-redux';
import { connect } from 'react-redux';
import { searchLogs } from '../../actions/logAction';

const SearchLog = ({searchLogs}) => {
    const auth = useSelector((state) => state.auth);
    
   
    let text = useRef('');

    const onChange = e => {
        searchLogs(text.current.value);
    }
  
    if(auth.user && !auth.loading){
        return (

            <div className="wrap">
                <div className="search">
                    <button type="submit" className=" searchButton">
                            <i className="fa fa-search"></i>
                        </button>
                    <input type="text" className="searchTerm" placeholder="Search Logs... " ref={text} onChange={onChange}/>
                </div>
            </div>
        
           
        )
    }
      
    
}

export default connect(null, {searchLogs})(SearchLog)