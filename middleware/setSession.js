const userModel = require('../model/userModel');

const setSession = (req, res, next) => {
    try {
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
    } catch (err) {
        res.redirect('/logout');
    }
}

module.exports = setSession