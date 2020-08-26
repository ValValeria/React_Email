import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom'
import Header from './Components/Header'
import {context as Context} from './Context/context'
import data  from './Context/data';


ReactDOM.render(
    <BrowserRouter>
       <Context.Provider value={ data}>
          <Header/>
          <App />
       </Context.Provider>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
