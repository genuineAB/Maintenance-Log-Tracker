import * as React from 'react';
import {useEffect, Fragment} from 'react';
import './App.css';
import Pages from './pages';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import { Provider } from 'react-redux';
import store from './store';


const App = () => {
  useEffect(() => {
    //Initialize materialize JS
    M.AutoInit();
  })
  return (
    <Provider store={store}>
        <Fragment>
            <Pages />
        </Fragment>
      
    </Provider>
  
  )
}

export default App;
