import 'date-fns';
import React ,{useEffect}from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { Card, Divider } from '@material-ui/core'
import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import { Button } from '@material-ui/core';
import {BasicLayout} from '../../Layouts/BasicLayout';
import { useState } from 'react';
import mainStore from '../../Context/data'
import _ from 'lodash';

export default function Schedule(){

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (time,date) => {

    setSelectedDate(()=>{
      if(time){
        const date_new=new Date(selectedDate);
        date_new.setHours(date.getHours())
        date_new.setMinutes(date.getMinutes())
        return date_new;
      } 
      return date;
    }); 
  };

  const [data,updateData] = useState({errors:[],messages:[]});
  
  mainStore.subject.subscribe((v)=>{
    updateData(v)
  })

  const email= React.createRef();
  const message=React.createRef();

  const handleSubmit=(e)=>{
    e.preventDefault();
    mainStore.sendEmail({date:selectedDate,email:email.current.querySelector('input').value,message:message.current.querySelector('textarea').value})
  }

  React.useEffect(()=>{
    const form=document.querySelector('#send_email');
    const attributes={"type":"email","required":"true","minlength":"10","maxlength":"40"}

    _.forEach(attributes,(value,key)=>{
        form.querySelector('input').setAttribute(key,value)

        if(key=="minlength"|| key=="maxlength"){
            form.querySelector('textarea').setAttribute(key,value)
        }
    })

    form.querySelector('input').setAttribute('type','email')
  })

  
  const Sch= (
      <div className="schedule__area" key={Math.random()}>
        <Card>
          <form   autoComplete="off" id="send_email" noValidate={false}>
              <div className="headline">
                  Schedule an event
              </div>

              <div className="email">
                 <TextField id="standard-basic" ref={email} label="Email"/>
              </div>

              <div className="message">
                <TextField id="standard-multiline-flexible" ref={message} label="Message" multiline   rowsMax={4} />
              </div>

              <div className="date">
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justify="space-around">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange.bind(null,false)}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time "
          value={selectedDate}
          onChange={handleDateChange.bind(null,'time')}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}
        />
      </Grid>
    </MuiPickersUtilsProvider>
              </div>
              <div className="errors__area">
              {
                data.errors.map(elem=>{
                  return (
                <>    
                <Button  color="secondary" key={elem+Math.random()}>
                  {elem}
                </Button>
                <Divider/>
                </>
                   )
                })  
              }
              {
                data.messages.map(elem=>{
                  return (
                  <>  
                 <Button  color="primary" key={elem+Math.random()}>
                  {elem}
                </Button>
                 <Divider/>
                  </>
                   )
                })  
              }
              </div>
              <div>
                  <Button color="primary" variant="contained" onClick={handleSubmit} >Send</Button>
              </div>
          </form>
   </Card>
   </div>
    )

    return (
    <div className="banner" >
    <BasicLayout>
          {Sch}
    </BasicLayout>
    </div>  
    );
}

