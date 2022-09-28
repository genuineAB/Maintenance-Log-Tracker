import React, {useRef} from 'react';
import { useSelector } from 'react-redux';

const SearchLog = () => {
    const auth = useSelector((state) => state.auth);
    
   
    const text = useRef('');

    const onChange = e => {
        console.log(text.current.value);
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

export default SearchLog