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

//created watcher
// let createWatcher = (req, res) => {
//     let newWatcher = new WatcherModel({
//         watcherId: 'W'-shortid.generate(),
//         issueId: 
//     })
// }

module.exports = {
    getAllWatchers: getAllWatchers
}