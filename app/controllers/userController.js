const mongoose = require('mongoose');
const shortid = require('shortid');
const time = require('./../libs/timeLib');
const response = require('./../libs/responseLib')
const logger = require('./../libs/loggerLib');
const validateInput = require('../libs/paramsValidationLib')
const check = require('../libs/checkLib')
const passwordLib = require('../libs/generatePasswordLib')

/* Models */
const UserModel = mongoose.model('User')


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
                let apiResponse = response.generate(true,'One or Mode Parameter is Missing',400,null) 
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
                        userId: 'User - '+shortid.generate(),
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
                            let apiResponse = response.generate(true,'Failes to create User',500,null)
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
    
}


// end of the login function 


let logout = (req, res) => {
  
} // end of the logout function.


module.exports = {

    signUpFunction: signUpFunction,
    loginFunction: loginFunction,
    logout: logout

}// end exports