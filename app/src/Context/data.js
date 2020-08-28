import {Subject} from 'rxjs';
import { User } from './classes/user';
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs'
import {retry,catchError} from 'rxjs/operators';

class Data{

     constructor(){
        this.data={
            errors:[],
            messages:[]
        } 

        this.subject = new Subject();

        Object.defineProperties(this,{
            'data':{
            configurable:false,
            writable:false
            }
        })
        
        this.user = new User();
     }

     async auth(path,inputFields){
       try {
           const response = await fetch(path,{
            method:"POST",
            body:JSON.stringify(inputFields),
            headers:{
                "Content-Type":"application/json"
            }
           })

           const data = await response.json();

           if ( data.status == "user") {
                   this.data.messages.push( "You are logged")
                   this.user.setUser({...inputFields,id:data.id||inputFields.id})
           } else {
                   this.data.errors = data.errors || data.messages|| []
           }
     
       } catch (error) { 
       } finally {
             return this.data
       }
     }

     async sendEmail(inputFields){

         try{
         let response = await fetch('/sendemail',{
             method:"POST",
             body:JSON.stringify(inputFields),
             headers:{
                 "Content-Type":"application/json"
             }
         })

         if(response.ok){
             const json = await response.json()
             
             if(response.status==200){
                this.data.messages.push('Your message is sent')
             } else {
                this.data.errors.push(...(json.errors||[]))   
             }            

         } else {
             this.data.errors.push("Http Error "+ response.status)
         }
        } catch (e) {
            console.log(e)
            this.data.errors.push("Http Error. Please try again")
        } finally {
            this.subject.next(this.data)
        }
     }

     request (url) {
         return ajax(url).pipe(retry(3),catchError(e=>of(e)))
     }
}

export default new Data();