const express = require('express')
const router = express.Router()
const watcherController = require('./../controllers/watcherController')
const appConfig = require('./../../config/appConfig')

module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/watcher`

    app.get(`${baseUrl}/view/allWatchers`,watcherController.getAllWatchers)

    // app.get(`${baseUrl}/:watcherId/details`,watcherController.getSingleWatcher)

    app.post(`${baseUrl}/createWatcher`,watcherController.createWatcher)

    app.post(`${baseUrl}/:watcherId/delete`,watcherController.deleteWatcher)

    // app.put(`${baseUrl}/:watcherId/edit`,watcherController.editWatcher)
}