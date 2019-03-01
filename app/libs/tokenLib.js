const jwt = require('jsonwebtoken')
const shortid = require('shortid')
const secretKey = 'punisher1705kangutkarrohan@1994';

let generateToken = (data, cb) => {
    try{
        let claims = {
            jwtid: shortid.generate,
            iat: Date.now(),
            exp: Math.floor(Date.now()/1000)+(60*60*24),
            sub: 'authToken',
            iss: 'issueTracking',
            data: data
        }
        let tokenDetails = {
            token: jwt.sign(claims, secretKey),
            tokenSecret: secretKey
        }
        cb(null,tokenDetails)
    } catch (err) {
        console.log(err)
        cb(err,null)
    }
}// end generate function

let verifyClaim = (token, cb) => {
    jwt.verify(token, secretKey, function(err, decoded){
        if(err){
            console.log('Error While Verify token')
            console.log(err);
            cb(err,null)
        } else {
            console.log('User Verified')
            console.log(decoded)
            cb(null,decoded)
        }
    })
}

module.exports = {
    generateToken: generateToken,
    verifyClaim: verifyClaim
}
