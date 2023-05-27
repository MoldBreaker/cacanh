const checkLogin = (req, res, next) =>{ 
    if(req.session.user){
        return res.redirect('back');
    } else {
        next();
    }
}

module.exports = checkLogin;