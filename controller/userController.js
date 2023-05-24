const userModel = require('../model/userModel');
const renderLoginForm = (req, res) => {
    res.render('login');
}

const renderSignupForm = (req, res) => {
    res.render('signup');
}

const registerUser = (req, res) => {
    userModel.register(req.body, (err, result) => {
        if (err) throw  err;
        console.log(result);
        res.redirect('/login');
    });
}

const loginUser = (req, res) => {
    userModel.login(req.body, (err, result) => {
            if (err) throw  err;
            if(result.message == 'Login Failed'){
                return res.redirect('/login');
            }
            req.session.user = {
                maKH: result.user[0].maKH,
                username: result.user[0].userName,
                role: result.user[0].role
            };
            if(!req.body.remember){
                res.redirect('/');
            } else {
                userModel.updateToken(result.user[0].maKH, (err, user) => {
                    if (err) throw  err;
                    res.cookie('remember', user.token, { maxAge: 300000000, httpOnly: true })
                    res.redirect('/');         
                })
            }
        });
}
const logout = (req, res) => {
    req.session.destroy();
    res.clearCookie('remember');
    res.redirect('/');
}

module.exports = {
    renderLoginForm,
    renderSignupForm,
    registerUser,
    loginUser, 
    logout
}