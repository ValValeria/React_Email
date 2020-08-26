const rxjs = require('rxjs');
const o = require('rxjs/operators')

async function  sendEmail(data){

    let testEmailAccount = await nodemailer.createTestAccount();
        
    let transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                secure: false,
                auth: {
                  user: testEmailAccount.user,
                  pass: testEmailAccount.pass
                }
              });

    rxjs.interval(70000)    
    .pipe(
        o.skipWhile(e=>{
            const date = new Date(Date.now()+e);
            if(date>new Date(data.date)) return false;
            return true;
        })
    )
    .subscribe((v)=>{
        let result = await transporter.sendMail({
            from: '"Node js" <nodejs@example.com>',
            to: data.email,
            subject: "Schedule",
            text: data.message
        });
        console.log(result)
    })
}

process.on('message',message=>{
    sendEmail(message)
})
          