const express = require('express')
const router = express.Router()
const issueController = require('./../controllers/issueController')
const appConfig = require('./../../config/appConfig')


module.exports.setRouter = (app) => {
    let baseUrl = `${appConfig.apiVersion}/issueTracking`;

    //defining routes
    app.get(`${baseUrl}/view/all`,issueController.getAllIssues)

    //for displaying single issue
    app.get(`${baseUrl}/:issueId/details`,issueController.getSingleIssue)

    //for creating a new issue
    app.post(`${baseUrl}/createIssue`,issueController.createIssue)

    //for editing existing issue
    app.put(`${baseUrl}/:issueId/edit`,issueController.editIssue)

    //for deleting Issue
    app.post(`${baseUrl}/:issueId/delete`,issueController.deleteIssue)
}