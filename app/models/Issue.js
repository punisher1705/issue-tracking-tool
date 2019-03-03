'use strict'

const mongoose = require('mongoose'),
Schema = mongoose.Schema

let issueSchema = new Schema({
    issueId: {
        type: String,
        default: '',
        index: true,
        unique: true
    },
    title: {
        type: String,
        default:'',
    },
    description: {
        type: String,
        default: ''
    },
    attchedFilePath:{
        type: String,
        defualt: ''
    },
    status: {
        type: String,
        default: 'In-Progress'
    },
    priority: {
        type: String,
        default: 'Low'
    },
    reporter: {
        type: String,
        default: ''
    },
    assignedTo: {
        type: String,
        default: ''
    },
    createdOn: {
        type: Date,
        defualt: ''
    }
})

mongoose.model('Issue',issueSchema)