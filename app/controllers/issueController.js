const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')

//Models
const UserModel = mongoose.model('User')
const IssueModel = mongoose.model('Issue')
const CommentModel = mongoose.model('Comments')
const WatcherModel = mongoose.model('Watcher')

//get all issues list
let getAllIssues = (req, res) => {
    IssueModel.find()
        .select('-__v -__id')
        .lean()
        .exec((err, result) => {
            if(err) {
                console.log(err)
                logger.error(err.message, 'issueControlle: getAllIssues', 10)
                let apiResponse = response.generate(true, 'Failed to Find Issue Log', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                logger.info('No Issue Found', ' issueController: getAllIssues')
                let apiResponse = response.generate(true, 'No Issues Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Found All Issues', 200, result)
                res.send(apiResponse)
            }
        })
}

//get single issue
let getSingleIssue = (req, res) => {
    IssueModel.findOne({'issueId':req.params.issueId})
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if(err){
                console.log(err)
                logger.error(err.message, 'issueController: getSingleIssue',10)
                let apiResponse = response.generate(true, 'Failed to Find Issue Details',500,null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Issue Found', 'issueConotoller: getSingleIssue')
                let apiResponse = response.generate(true, 'No Issue Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issue Found', 200, result)
                res.send(apiResponse)
            }
        })
}

//create Issue
let createIssue = (req, res) => {
    //validate input
    let validateUserInput = () => {
        return new Promise((resolve, reject) => {
            console.log(req.body)
            if(check.isEmpty(req.body.title)) {
                let apiResponse = response.generate(true, 'Please Fill Mandatory Field', 500, 10)
                reject(apiResponse)
            } else {
                resolve(req)
            }
        })
    }

    //create issue
    let createNewIssue = () => {
        return new Promise((resolve, reject) => {
            let newIssue = new IssueModel({
                issueId: 'Issue-'+shortid.generate(),
                title: req.body.title,
                description: req.body.description,
                attachedFilePath: req.body.file,
                status: req.body.status,
                priority: req.body.priority,
                reporter: req.body.reporter,
                assignedTo: req.body.assignedTo,
                createdOn: time.now()
            })

            newIssue.save((err, newIssue) => {
                if(err) {
                    logger.error(err.message, 'createIssue: createdNewIssue',10)
                    let apiResponse = response.generate(true, 'Failed to Create Issue', 500, null)
                    reject(apiResponse)
                } else {
                    console.log(newIssue)
                    let newIssueObj = newIssue.toObject()
                    resolve(newIssueObj)
                }
            })
        })
    }

    validateUserInput(req, res)
        .then(createNewIssue)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Issue Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
}

//edit Issue
let editIssue = (req, res) => {
    let options = req.body
    IssueModel.update({'issueId':req.params.issueId},options).exec((err, result) => {
        if(err) {
            console.log(err)
            logger.error(err.message, 'issueController: editIssue',10)
            let apiResponse = response.generate(true, 'Failed to Update Issue Details', 500, null)
            res.send(apiResponse)
        } else if(check.isEmpty(result)) {
            logger.info('No Issue Found','issueController: editIssue')
            let apiResponse = response.generate(true, 'No Issue Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Issue Updated', 200, result)
            res.send(apiResponse)
        }
    })
}

//delete Issue
let deleteIssue = (req, res) => {
    IssueModel.remove({'issueId':req.params.issueId}).exec(
        (err, result) => {
            if(err) {
                logger.error(err.message, 'issueController: deleteIssue',10)
                let apiResponse = response.generate(true, 'Failed to Delete User', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                logger.info('No Issue Found','issueController: deleteIssue')
                let apiResponse = response.generate(true, 'No Issue Found', 400, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Issue Deleted', 200, result)
                res.send(apiResponse)
            }
        }
    )
}


module.exports = {
    getAllIssues: getAllIssues,
    createIssue: createIssue,
    getSingleIssue: getSingleIssue,
    editIssue: editIssue,
    deleteIssue: deleteIssue
}