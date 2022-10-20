import React, {useEffect} from 'react';
import 'materialize-css/dist/css/materialize.min.css';
import { useSelector } from 'react-redux';
import getUsers from '../actions/userActions';
import PreLoader from '../components/layout/Preloader';

const ResetPassword = () => {
    let user = useSelector((state) => state.user.current);
    
  
    
    useEffect(() => {
        getUsers();
        // eslint-disable-next-line
    }, [])

    if((user === null)){
        return(
            <PreLoader />
        )
    }

   
   
    
    return (
        <div style={{margin: '20% 10%'}} >
            
            <form className='form-1 reset-style' >
                
                <h3><i className='fa-solid fa-screwdriver-wrench'> Maintenance Logger</i></h3>
                <p>Password Reset Link sent to  {user.payload.email}</p>
                
            </form>
        </div>
  )
}

export default ResetPassword