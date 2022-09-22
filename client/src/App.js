import React, {useEffect, Fragment} from 'react';
import './App.css';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Provider } from 'react-redux';
import store from './store';

import { AppNavbar } from './components/layout/AppNavbar';
import { Home } from './pages/Home';

const App = () => {
  useEffect(() => {
    //Initialize materialize JS
    M.AutoInit();
  })
  return (
    <Provider store={store}>
      <Fragment>
        {/* < AppNavbar /> */}
        <Home />
        
      </Fragment>
    </Provider>
  
  )
}

export default App;
