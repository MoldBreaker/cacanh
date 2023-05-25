const checkAdmin = async(req, res, next) => {
    let session = await req.session.user;
    if(!session || session.role != 1){
        return res.redirect('back');
    } else {
        next();
    }
}

module.exports = checkAdmin;