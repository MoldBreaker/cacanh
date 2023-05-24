const checkAdmin = (req, res, next) => {
    if(!req.session.user || req.session.user.role != 1){
        return res.redirect('back');
    } else {
        next();
    }
}

module.exports = checkAdmin;