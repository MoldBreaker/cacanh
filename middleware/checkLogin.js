const checkLogin = (req, res, next) =>{ 
    if(req.session.user){
        res.redirect('back');
    }
    next();
}

module.exports = checkLogin;