'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema

let commentSchema = new Schema({
    commentsId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    commentBody: {
        type: String,
        default: ''
    },
    commentedBy: {
        type: String,
        default: ''
    },
    issueId: {
        type: String,
        default: ''
    }

})

mongoose.model('Comments',commentSchema)