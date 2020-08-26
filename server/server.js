const express = require('express');
const app = express ();
const handler = require('./handler').handler;

app.use(require('cors'))

app.use(express.json())

app.post('/sendemail',(...args)=>{
    handler.sendEmail(...args)
});

app.listen(8000);