const rxjs = require('rxjs');
const o = require('rxjs/operators')
const nodemailer = require('nodemailer')

async function  sendEmail(data){

    let testEmailAccount = await nodemailer.createTestAccount();
        
    let transporter =  nodemailer.createTransport({
        host: testEmailAccount.smtp.host,
        port: testEmailAccount.smtp.port,
        secure: testEmailAccount.smtp.secure,
        auth: {
            user: testEmailAccount.user,
            pass: testEmailAccount.pass
        }
    });

    rxjs.interval(20000)    
    .pipe(
        o.skipWhile(e=>{
            const date = new Date();
            if(date>new Date(data.date)) return false;
            return true;
        }),
        o.first()
    )
    .subscribe(async (v)=>{
        try{
        await transporter.sendMail({
            from: '"Node js" <nodejs_org@gmail.com>',
            to: data.email,
            subject: "Schedule",
            text: data.message
        });
        }catch (e){}
    })
}

process.on('message',message=>{
    sendEmail(message)
})
          