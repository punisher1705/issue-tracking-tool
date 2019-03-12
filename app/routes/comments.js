const express = require('express')
const router = express.Router()
const commentsController = require('./../controllers/commentsController')
const appConfig = require('./../../config/appConfig')


module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/comments`;

    //defining routes
    app.get(`${baseUrl}/view/allComments`,commentsController.getAllComments)

    //for creating a new comment
    app.post(`${baseUrl}/createComment`,commentsController.createComment)

    //for editing existing comment
    app.put(`${baseUrl}/:commentsId/edit`,commentsController.editComment)

    //for deleting comment
    app.post(`${baseUrl}/:commentsId/delete`,commentsController.deleteComment)
}