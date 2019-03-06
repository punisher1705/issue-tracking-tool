const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const passwordLib = require('../libs/generatePasswordLib')
const token = require('../libs/tokenLib')

/* Models */
const UserModel = mongoose.model('User')
const AuthModel = mongoose.model('Auth')

// get all user(Only for Admin)
let getAllUser = (req, res) => {
    UserModel.find()
        .select('-__v -_id')
        .lean()
        .exec((err,result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getAllUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: getAllUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'All User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

//get single user(Only for admin)
let getSingleUser = (req, res) => {
    UserModel.findOne({'userId':req.params.userId})
        .select('-password -__v -_id')
        .lean()
        .exec((err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: getSingleUser', 10)
                let apiResponse = response.generate(true, 'Failed To Find User Details', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller:getSingleUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'User Details Found', 200, result)
                res.send(apiResponse)
            }
        })
}

//delete user
let deleteUser = (req, res) => {
    UserModel.findOneAndRemove({'userId':req.params.userId}).exec(
        (err, result) => {
            if (err) {
                console.log(err)
                logger.error(err.message, 'User Controller: deleteUser', 10)
                let apiResponse = response.generate(true, 'Failed To delete user', 500, null)
                res.send(apiResponse)
            } else if (check.isEmpty(result)) {
                logger.info('No User Found', 'User Controller: deleteUser')
                let apiResponse = response.generate(true, 'No User Found', 404, null)
                res.send(apiResponse)
            } else {
                let apiResponse = response.generate(false, 'Deleted the user successfully', 200, result)
                res.send(apiResponse)
            }
        });// end user model find and remove
}

//edit user
let editUser = (req, res) => {
    let options = req.body;
    UserModel.update({'userId':req.params.userId}, options).exec((err, result) => {
        if (err) {
            console.log(err)
            logger.error(err.message, 'User Controller:editUser', 10)
            let apiResponse = response.generate(true, 'Failed To Update User details', 500, null)
            res.send(apiResponse)
        } else if (check.isEmpty(result)) {
            logger.info('No User Found', 'User Controller: editUser')
            let apiResponse = response.generate(true, 'No User Found', 404, null)
            res.send(apiResponse)
        } else {
            let apiResponse = response.generate(false, 'User details edited', 200, result)
            res.send(apiResponse)
        }
    });// end user model update
}

// start user signup function 
let signUpFunction = (req, res) => {
    //validate User
    let validateUserInput = () => {
        return new Promise((resolve, reject)=>{
            if(req.body.email) {
                if(!validateInput.Email(req.body.email)){
                    let apiResponse = response.generate(true, 'Invalid Email Format',400,null)
                    reject(apiResponse)
                } else if(check.isEmpty(req.body.password)){
                    let apiResponse = response.generate(true, 'Password Missing',400,null)
                    reject(apiResponse)   
                }// else if(!validateInput.passwordMatch(password,cpassword)){
                //     let apiResponse = response.generate(true, 'Password Does not match with Confirm Password field',400,null)
                //     reject(apiResponse)
                // } 
                else {
                    resolve(req)
                }
            } else {
                logger.error('One or More Field Missing During Creation of User','userController: createUser()',5)
                let apiResponse = response.generate(true,'One or More Parameter is Missing',400,null) 
                reject(apiResponse)
            }
        })
    }//end validate

    let createUser = () => {
        return new Promise((resolve, reject) => {
            UserModel.findOne({'email': req.body.email})
            .exec((err, retrievedUserDetails) => {
                if(err) {
                    logger.error(err.message,'userController: createUser',5)
                    let apiResponse = response.generate(true,'Failed to Create User',500,null)
                    reject(apiResponse)
                } else if(check.isEmpty(retrievedUserDetails)){
                    let newUser = new UserModel({
                        userId: 'User-'+shortid.generate(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName || '',
                        email: req.body.email.toLowerCase(),
                        mobileNumber: req.body.mobileNumber,
                        password: passwordLib.hashpassword(req.body.password),
                        createdOn: time.now()
                    })
                    newUser.save((err, newUser) => {
                        if(err){
                            looger.error(err.message,'userController: createUser',10)
                            let apiResponse = response.generate(true,'Failed to create User',500,null)
                            reject(apiResponse)
                        } else {
                            let newUserObj = newUser.toObject();
                            resolve(newUserObj)
                        }
                    })
                } else {
                    logger.error('User Cannot Be Created. User Already Present','userController: createdUser',4)
                    let apiResponse = response.generate(true,'User Already Present with this Email',403,null)
                    reject(apiResponse)
                }
            })
        })
    }// end create User function
  
    validateUserInput(req,res)
        .then(createUser)
        .then((resolve)=>{
            delete resolve.password
            let apiResponse = response.generate(false,'User Created',200,resolve)
            res.send(apiResponse)
        })
        .catch((err) =>{
            console.log(err)
            res.send(err)
        })

}// end user signup function 

// start of login function 
let loginFunction = (req, res) => {
    let findUser = () => {
        return new Promise((resolve, reject) => {
            if(req.body.email){
                UserModel.findOne({email:req.body.email},(err,userDetails) => {
                    // console.log(userDetails)
                    if(err){
                        console.log(err)
                        logger.error('Failed to Retrieve User Data','userController: fiindUser()',10)
                        let apiResponse = response.generate(true,'Failed to find user Details',500,null)
                        reject(apiResponse)
                    } else if (check.isEmpty(userDetails)){
                        logger.error('No User Found','userController: findUser()',7)
                        let apiResponse = response.generate(true,'No User Details Found',404,null)
                        reject(apiResponse)
                    } else {
                        logger.info('User Found','userController:findUser()',10)
                        resolve(userDetails)
                    }
                })
            } else {
                let apiResponse = generate.response(true,'"Email" is missing',400,null)
                reject(apiResponse)
            }
        })
    }

    let validatePassword = (retrievedUserDetails) => {
        // console.log(retrievedUserDetails)
        return new Promise((resolve,reject) => {
            passwordLib.comparePassword(req.body.password, retrievedUserDetails.password, (err, isMatch) => {
                if(err){
                    console.log(err)
                    logger.error(err.message,'UserController: validatePassword()',10)
                    let apiResponse = response.generate(true, 'Login Failed', 500, null)
                    reject(apiResponse)
                } else if(isMatch){
                    let retrievedUserDetailsObj = retrievedUserDetails.toObject()
                    delete retrievedUserDetailsObj.password
                    delete retrievedUserDetailsObj._id
                    delete retrievedUserDetailsObj.__v
                    delete retrievedUserDetailsObj.createdOn
                    delete retrievedUserDetailsObj.modifiedOn
                    resolve(retrievedUserDetailsObj)
                } else {
                    logger.info('Login Failed Due To Invalid Password','userController: validatePassword()',10)
                    let apiResponse = response.generate(true, 'Wrong Password. Login Failed', 400, null)
                    reject(apiResponse)
                }
            })
        })
    }

    let generateToken = (userDetails) => {
        // console.log('generate Token')
        // console.log(userDetails);
        return new Promise((resolve, reject) => {
            token.generateToken(userDetails, (err, tokenDetails) => {
                // console.log(tokenDetails)
                if(err){
                    console.log(err)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else {
                    tokenDetails.userId = userDetails.userId
                    tokenDetails.userDetails = userDetails
                    resolve(tokenDetails)
                }
            })
        })
    }

    let saveToken = (tokenDetails) => {
        console.log('Save TOken')
        return new Promise((resolve, reject) => {
            AuthModel.findOne({userId: tokenDetails.userId},(err,retrievedTokenDetails) => {
                if(err){
                    console.log(err.message, 'userController: saveToken', 10)
                    let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                    reject(apiResponse)
                } else if (check.isEmpty(retrievedTokenDetails)){
                    // console.log(retrievedTokenDetails)
                    let newAuthToken = new AuthModel({
                        userId: tokenDetails.userId,
                        authtoken: tokenDetails.token,
                        tokenSecret: tokenDetails.tokenSecret,
                        tokenGenerationTime: time.now()
                    })
                    newAuthToken.save((err,newTokenDetails)=>{
                        // console.log(newTokenDetails)
                        if(err){
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            // console.log('responseBOdy '+responseBody)
                            resolve(responseBody)
                        }
                    })
                } else {
                    retrievedTokenDetails.authToken = tokenDetails.token
                    retrievedTokenDetails.tokenSecret = tokenDetails.tokenSecret
                    retrievedTokenDetails.tokenGenerationTime = time.now()
                    retrievedTokenDetails.save((err, newTokenDetails) => {
                        if(err){
                            console.log(err)
                            logger.error(err.message, 'userController: saveToken', 10)
                            let apiResponse = response.generate(true, 'Failed To Generate Token', 500, null)
                            reject(apiResponse)
                        } else {
                            let responseBody = {
                                authToken: newTokenDetails.authToken,
                                userDetails: tokenDetails.userDetails
                            }
                            resolve(responseBody)
                        }
                    })
                }
            })
        })
    }


    findUser(req, res)
        .then(validatePassword)
        .then(generateToken)
        .then(saveToken)
        .then((resolve) => {
            let apiResponse = response.generate(false, 'Login Successful',200,resolve)
            res.status(200)
            res.send(apiResponse)
        })
        .catch((err) => {
            console.log('errorHandler')
            console.log(err)
            res.status(err.status)
            res.send(err)
        })
}


// end of the login function 


let logout = (req, res) => {
  AuthModel.findOneAndRemove({userId: req.user.userId}, (err, result)=> {
    if (err) {
        console.log(err)
        logger.error(err.message, 'user Controller: logout', 10)
        let apiResponse = response.generate(true, `error occurred: ${err.message}`, 500, null)
        res.send(apiResponse)
    } else if (check.isEmpty(result)) {
        let apiResponse = response.generate(true, 'Already Logged Out or Invalid UserId', 404, null)
        res.send(apiResponse)
    } else {
        let apiResponse = response.generate(false, 'Logged Out Successfully', 200, result)
        res.send(apiResponse)
    }
  })
} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    getAllUser: getAllUser,
    editUser: editUser,
    deleteUser: deleteUser,
    getSingleUser: getSingleUser,
    loginFunction: loginFunction,
    logout: logout

}// end exports