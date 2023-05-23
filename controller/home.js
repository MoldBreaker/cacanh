const fishModel = require('../model/fishModel');
const helloWorld = (req, res)=> {
    fishModel.getAll((err, result) => {
        if (err) throw err;
        res.render("home", {
            result: result
        });
    })
}

module.exports = {
    helloWorld
}