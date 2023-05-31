const fishModel = require('../model/fishModel');
const notificationModel = require('../model/notificationsModel');
const helloWorld = (req, res)=> {
    let search = req.query.search || '';
    fishModel.getAll(search, (err, result) => {
        if (err) throw err;
        res.render("home", {
            result: result
        });
    })
}

module.exports = {
    helloWorld
}