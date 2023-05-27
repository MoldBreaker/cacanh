const checkNotLogin = (req, res, next) =>{ 
    if(!req.session.user){
        return res.json({
            login: false
        });
    } else {
        next();
    }
}

module.exports = checkNotLogin;