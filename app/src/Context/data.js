import {Subject} from 'rxjs';

class Data{
     constructor(){
        this.data={
            errors:[],
            messages:[]
        } 

        this.subject = new Subject();

        Object.defineProperty(this,'data',{
            configurable:false,
            writable:false
        })
     }

     async sendEmail(inputFields){

         try{
         let response = await fetch('http://localhost:8000/sendemail',{
             method:"POST",
             body:JSON.stringify(inputFields),
             headers:{
                 "Content-Type":"application/json"
             }
         })

         if(response.ok){
             const json = await response.json()
             
             if(json.status==200){
                this.data.messages.push('Your message is sent')
             } else {
                this.data.errors.push(...json.errors)   
             }            

         } else {
             this.data.errors.push("Http Error "+ response.status)
         }
        } catch (e) {
            this.data.errors.push("Http Error. Please try again")
        } finally {
            this.subject.next(this.data)
        }
     }
}

export default Object.seal(new Data());