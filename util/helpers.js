//return true if user is not logged in and false for otherwise
function checkLogin(session) {
    if (!session.user) {
        return true;
    } else {
        return false;
    }
}

module.exports = {
    checkLogin
};