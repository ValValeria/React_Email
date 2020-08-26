const nodemailer = require('nodemailer');
const child_proccess = require('child_process')

class Handler{
        async  sendEmail(req,resp){
            
          console.log('i am ')  
          const child = child_proccess.fork('parallelProcess.js')

          child.send(req.body)

          child.on('message', code => {
              console.log(`One email is sent${code}`)
          });

          resp.json({messages:["Your schedule will be delivered on time"]})
          resp.end()
        }
}

module.exports.handler = new Handler();