const userModel = require('../model/userModel');

const setSession = (req, res, next) => {
    if(req.cookies.remember){
        userModel.getUserByToken(req.cookies.remember, (err, user) => {
            if (err) throw  err;
            req.session.user = {
                maKH: user.maKH,
                username: user.userName,
                role: user.role
            };
        })
    } 
    next();
}

module.exports = setSession