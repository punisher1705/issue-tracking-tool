const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const token = require('../libs/tokenLib')

//Models
const WatcherModel = mongoose.model('Watcher')

//Get all watchers
let getAllWatchers = (req, res) => {
    WatcherModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err, result)=>{
            if (err) {
                console.log(err)
                logger.error(err.message, 'Watcher Controller: getAllWatcher', 10)
                let apiResponse = response.generate(true, 'Failed To Find Watcher Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No Watcher Found', 'Watcher Controller: getAllUser')
                let apiResponse = response.generate(true, 'No Watcher Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All Watcher Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

// created watcher
let createWatcher = (req, res) => {
    let createNewWatcher = () => {
            return new Promise((resolve, reject) => {
            WatcherModel.findOne({ $and: [{ 'issueId': req.body.issueId }, { 'userId': req.body.hiddenFieldforUserId }] })
                .exec((err, retrievedUserDetails) => {
                    if (err) {
                        logger.error(err.message, 'watcherController: createWatcher', 5)
                        let apiResponse = response.generate(true, 'Failed to Create Wacther', 500, null)
                        reject(apiResponse)
                    } else if (check.isEmpty(retrievedUserDetails)) {
                        let newWatcher = new WatcherModel({
                            watcherId: 'Watcher-'+shortid.generate(),
                            issueId: req.body.issueId,
                            userId: req.body.hiddenFieldforUserId,
                            userName: req.body.hiddenFieldforUserName,
                            createdOn: time.now()
                        })
                        newWatcher.save((err, newWatcher) => {
                            console.log(newWatcher)
                            if (err) {
                                logger.error(err.message, 'watcherController: createWatcher', 10)
                                let apiResponse = response.generate(true, 'Failed to create Watcher', 500, null)
                                reject(apiResponse)
                            } else {
                                let newWatcherObj = newWatcher.toObject();
                                resolve(newWatcherObj)
                            }
                        })
                    } else {
                        logger.error('Watcher Cannot Be Created. Watcher Already Present', 'watcherController: createWatcher', 4)
                        let apiResponse = response.generate(true, 'Watcher Already Exist', 403, null)
                        reject(apiResponse)
                    }
                })
        })
    }
    createNewWatcher(req,res)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Watcher Created', 200, resolve)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log(err)
            res.send(err)
        })
}

let deleteWatcher = (req, res) => {
    WatcherModel.remove({'watcherId':req.params.watcherId}).exec(
        (err, result) => {
            if(err) {
                logger.error(err.message, 'watcherController: deleteWatcher',10)
                let apiResponse = response.generate(true, 'Failed to Delete Watcher', 500, null)
                res.send(apiResponse)
            } else if(check.isEmpty(result)) {
                logger.info('No Watcher Found','watcherController: deleteWatcher')
                let apiResponse = response.generate(true, 'No Watcher Found', 400, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Watcher Deleted', 200, result)
                res.send(apiResponse)
            }
        }
    )
}

module.exports = {
    getAllWatchers: getAllWatchers,
    createWatcher: createWatcher,
    deleteWatcher: deleteWatcher
}