const mongoose = require('mongoose')

const UserScheme = new mongoose.Schema({
    email:String,
    password:String,
    schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule_r' }]
},{versionKey: false})

const ScheduleScheme = new mongoose.Schema({
    message:String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User_r' },
    time:String
},{versionKey: false}) 

const User = mongoose.model('User_r',UserScheme);

const Schedule = mongoose.model('Schedule_r',ScheduleScheme)

mongoose.connect("mongodb+srv://myuser:jsjjsjsjjsj7272jH@cluster0.emx8s.mongodb.net/schedule?retryWrites=true&w=majority",{ useNewUrlParser: true })

module.exports.User = User

module.exports.Schedule = Schedule