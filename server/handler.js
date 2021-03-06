const child_proccess = require('child_process')
const path_m = require('path')
const  fs = require('fs')
const User = require(path_m.join(__dirname,'mongoose/scheme')).User;
const Schedule = require(path_m.join(__dirname,'mongoose/scheme')).Schedule;

class Handler{
        
        async files(req,resp){
           const path = path_m.join(path_m.dirname(__dirname),'app','build','index.html')
           return resp.sendFile(path)
        }
        
        async sendFile(req,resp){
           const path = path_m.join(path_m.dirname(__dirname),'app','build',"static",req.params.folder,req.params.file)  

           if(fs.existsSync(path)){
              resp.sendFile(path)  
           } else {
              resp.send('File not found')
           }
        }

        async  sendEmail(req,resp){
          
          if(req.user && req.user.email==req.body.email){
            const schedule = await Schedule.create({message:req.body.message,date:req.body.date,author:req.user._id});
            req.user.schedules.push(schedule);
            req.user.save()
          }

          const child = child_proccess.fork('server\\parallelProcess.js')

          child.send(req.body)

          child.on('message', code => {
              console.log(`One email is sent${code}`)
          });

          return resp.json({messages:["Your schedule will be delivered on time"]})
        }
        
       
        async signup(req,resp){
           const body = req.body;
           const user = await User.exists({email:body.email})
           const response = {status:"guest",messages:[]} 
           if (!user) {
               const user = await User.create({email:body.email,password:body.password});
               response.status="user"
               response.id = user.id
           } else {
               response.messages.push(`The user with such email ${body.email} has already been in our database `)
           }

           return resp.json(response)
        }

        async login({body},resp){
           const user = await User.exists({email:body.email,password:body.password})
           const response = {status:"guest"} 
           if (user) {
              response.status="user"
              response.id=user.id
           } 
           return  resp.json(response)
        }

        async getSchedule(req,resp){
          if(Object.keys(req.user).length){
            if (req.query.id == req.user.id) {
              const user = await req.user.populate('schedules').execPopulate();
              return resp.json(user||[])
            }
          }
          return resp.status(405).send("Forbidden")         
        }
}

module.exports.handler = new Handler();

module.exports.authenticate = async function (req,resp,next){
    const auth = req.get('Auth')
    req.user = {}
    
    if (!(auth||"").length) return next ();

    try {
        const data = JSON.parse(auth)
        const user = await User.exists({email:data.email,password:data.password})
        if (user) {
            req.user = await User.findOne({email:data.email}).exec();
        }

    } catch (error){
    } finally {
        next()
    }
}

