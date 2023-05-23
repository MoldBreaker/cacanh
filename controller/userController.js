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
            console.log(result);
            res.redirect('/');
        });
}


module.exports = {
    renderLoginForm,
    renderSignupForm,
    registerUser,
    loginUser
}