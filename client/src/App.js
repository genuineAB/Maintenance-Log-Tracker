import React, {useEffect, Fragment} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';

import { AppNavbar } from './components/layout/AppNavbar';

const App = () => {
  useEffect(() => {
    //Initialize materialize JS
    M.AutoInit();
  })
  return <Fragment>
    < AppNavbar />
  </Fragment>;
}

export default App;
