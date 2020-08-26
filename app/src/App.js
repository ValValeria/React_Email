import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import routes from './routes'

function App() {
  return (
    <React.Fragment>
       <Switch>
            {
              [routes.map(elem=>{
                return <Route {...elem} key={elem} />
              })]
            }
       </Switch>
    </React.Fragment>
  );
}

export default App;
