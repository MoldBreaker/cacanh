const con = require('../config/db');
const path = require('path');
const fishCategoryModel = require('../model/fishCategory');
const fishModel = require('../model/fishModel');
const notificationModel = require('../model/notificationsModel');

const addFistForm = (req, res) => {
    fishCategoryModel.getAll((err, result) => {
        if(err) throw err;
        res.render("addFishForm", {
            fishCategory: result
        });
    })
}

const processAddFish = (req, res) => {
    fishModel.insertFish(req.body, req.file.filename, (err, result) => {
        if(err) throw err;
        notificationModel.sendNofiticationAll(`${req.body.name} đã được thêm vào cửa hàng`, (err, result) => {
            if(err) throw err;
            console.log(result);
            res.redirect('back');
        })
    })
    
}

const getImage = (req, res) => {
    fishModel.getImage(req.params.id, (err, result) => {
        if(err) throw err;
        const imagePath = path.join(__dirname, '../public/image/fish',  result[0].anhCa);
        res.sendFile(imagePath);
    })
}


module.exports = {
    addFistForm,
    processAddFish,
    getImage
}