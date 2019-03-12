const mongoose = require('mongoose'),
Schema = mongoose.Schema

let watcherSchema = new Schema({
    watcherId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    issueId: {
        type: String,
        default: ''
    },
    userId: {
        type: String,
        default: '' 
    },
    userName: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        default: ''
    }
})

mongoose.model('Watcher',watcherSchema)