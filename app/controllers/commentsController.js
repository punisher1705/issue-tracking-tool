const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')

//Models
const CommentsModel = mongoose.model('Comments')

//get all comments
let getAllComments = (req, res) => {
    CommentsModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'commentsController: getAllComments', 10)
                let apiResponse = response.generate(true, 'Failed To Find Comments', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Comments Found', 'commentsController: getAllComments')
                let apiResponse = response.generate(true, 'No Comments Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Comments Found', 200, result)
                res.send(apiResponse)
            }
        })
}

//create Comment
let createComment = (req, res) => {
    let  createNewComment = () => {
        return new Promise((resolve, reject) => {
            let newComment = new CommentsModel({
                commentsId: 'Comment-'+shortid.generate(),
                commentBody: req.body.commentBody,
                commentedBy: req.body.hiddenFieldforUserName,
                issueId: req.body.issueId,
                createdOn: time.now()
            })
            newComment.save((err, newComment) => {
                if (err) {
                    logger.error(err.message, 'commentsController: createComment', 10)
                    let apiResponse = response.generate(true, 'Failed to Create Comment', 500, null)
                    reject(apiResponse)
                } else {
                    let newCommentObj = newComment.toObject();
                    resolve(newCommentObj)
                }
            })
        })
    }
    createNewComment(req, res)
    .then((resolve) => {
        let apiResponse = response.generate(false, 'Comment Created', 200, resolve)
        res.send(apiResponse)
    })
    .catch((err) => {
        console.log(err)
        res.send(err)
    })
}

let editComment = (req, res) => {
    let options = req.body;
    console.log(options)
    CommentsModel.update({'commentsId':req.params.commentsId},options).exec((err, result) => {
        console.log(result)
        if (err) {
            console.log(err)
            logger.error(err.message, 'commentsController:editComment', 10)
            let apiResponse = response.generate(true, 'Failed To Update Comment', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Comments Found', 'commentsController: editComment')
            let apiResponse = response.generate(true, 'No Comments Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Comment Updated', 200, result)
            res.send(apiResponse)
        }
    })
}

let deleteComment = (req, res) => {
    CommentsModel.remove({'commentsId':req.params.commentsId}).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'commentsController: deleteComment', 10)
            let apiResponse = response.generate(true, 'Failed To delete Comment', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No Comments Found', 'commentsController: deleteComment')
            let apiResponse = response.generate(true, 'No Comment Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'Deleted the Comment successfully', 200, result)
            res.send(apiResponse)
        }
    })
}

module.exports = {
    getAllComments: getAllComments,
    createComment: createComment,
    editComment: editComment,
    deleteComment: deleteComment
}