const express = require('express');
const app = express ();
const handler = require('./handler').handler;
const authenticate = require('./handler').authenticate;
const bodyparser = require('body-parser')

app.use(bodyparser.json())

app.use(require('cors')())

app.use(express.json())

app.use((...args)=>{
    authenticate(...args)
})

app.post('/signup',(...args)=>{
    handler.signup(...args)
});

app.post('/sendemail',(...args)=>{
    handler.sendEmail(...args)
});

app.post('/login',(...args)=>{
    handler.login(...args)
});

app.get('/userSchedule',(...args)=>{
    handler.getSchedule(...args)
});

app.listen(8000);
