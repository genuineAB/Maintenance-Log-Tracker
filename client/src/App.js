import React, {useEffect, Fragment} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import { AppNavbar } from './components/layout/AppNavbar';
import { Home } from './pages/Home';

const App = () => {
  useEffect(() => {
    //Initialize materialize JS
    M.AutoInit();
  })
  return <Fragment>
    {/* < AppNavbar /> */}
    <Home />
    {/* <div className='container'>
      <Logs />
    </div> */}
    
  </Fragment>
}

export default App;
