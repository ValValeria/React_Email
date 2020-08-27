import React from 'react'
import {BasicLayout} from '../../Layouts/BasicLayout';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import data from '../../Context/data';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';


export default class AuthPage extends React.PureComponent{

     constructor(props){
          super(props)
          this.state = {
              isSignUp: this.props.match.path.includes("/signup"),
              errors:[],
              messages:[],
              isLogged:false
          }
          this.submit = this.submit.bind(this)
          this.email = React.createRef('email')
          this.password = React.createRef('password')
     }
     
     componentDidMount(){
        interval(1000)
        .pipe(
            take(3)
        ).subscribe((v)=>{
            if(data.user.isLogged){
                this.setState({
                   isLogged:true
               })
            } 
        })
     }

     submit(e){
          e.preventDefault();
          data.auth(this.props.match.path,{email:this.email.current.querySelector('input').value,password:this.password.current.querySelector('input').value})
          .then((v)=>{
              this.setState({...v,isLogged:data.user.isLogged})
              localStorage.setItem('auth',JSON.stringify(data.user))
          })
     }

     render(){
         return (
             <section className = "banner ban_2">
                 <BasicLayout>
                      <div className="schedule__area h_100">
                          {true &&
                           <form className="auth__form" >
                               <div className="headline">
                                   {this.state.isSignUp ? "Sign up" : "Login"}
                               </div>
                               <div className="email">
                                   <TextField id="outlined-basic" label="Email" variant="outlined" ref={this.email} 
                                    InputProps={{
                                        readOnly:this.state.isLogged,
                                      }}
                                   />
                               </div>
                               <div className="password">
                                   <TextField id="outlined-basic" label="Password" variant="outlined" 
                                   ref = {this.password}
                                   InputProps={{
                                    readOnly:  this.state.isLogged,
                                   }}
                                   />
                               </div>
                               <div className="errors">
                                   {this.state.errors.map(elem=>{
                                       return (<Button variant="outlined" color="warn" key={elem} href="#outlined-buttons">
                                       {elem}
                                     </Button>)
                                   })}
                               </div>
                               <div className="messages">
                                   {this.state.messages.map(elem=>{
                                       return (<Button variant="outlined" color="primary" key={elem} href="#outlined-buttons">
                                       {elem}
                                     </Button>)
                                   })}
                               </div>
                               <div className="actions">
                                   {!data.user.isLogged && <Button variant="contained" color="primary" onClick = {this.submit}>Submit</Button>}
                               </div>
                           </form>
                          }
                      </div>
                 </BasicLayout>
             </section>
         );
     }
}

