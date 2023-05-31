//return true if user is not logged in and false for otherwise
function checkLogin(session) {
    if (!session.user) {
        return true;
    } else {
        return false;
    }
}

function checkAdmin(session) {
    if (session.user != undefined &&session.user.role == 1) {
        return true;
    } else {
        return false;
    }
}

function calcPrice(fish) {
    return fish.gia * fish.soLuong;
}

function sumPrice(fishArr) {
    let sum = 0;
    for(let i=0;i<fishArr.length;i++){
        sum += fishArr[i].gia * fishArr[i].soLuong
    }
    return sum;
}

module.exports = {
    checkLogin, checkAdmin, calcPrice, sumPrice
};