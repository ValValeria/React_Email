import React,{useEffect} from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import routes from './routes'
import mainStorage from './Context/data';

function App() {
  
  useEffect(()=>{
     try{
       const data = JSON.parse(localStorage.getItem('auth'))

       if ( "email" in data && "password" in data){
          (async()=>{
            mainStorage.auth('/login')
          })()
       }
     } catch (e) {}
  })

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
