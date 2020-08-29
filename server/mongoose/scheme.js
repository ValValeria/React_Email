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

mongoose.connect("************************************",{ useNewUrlParser: true })

module.exports.User = User

module.exports.Schedule = Schedule
