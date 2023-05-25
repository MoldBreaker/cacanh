const fishModel = require('../model/fishModel');
const fishCategoryModel = require('../model/fishCategory');

const renderDashboard = (req, res) => {
    fishModel.getAll((err, data) => {
        res.render('dashboard', {
            fish: data
        })
    })
}

const renderEditForm = (req, res) => {
    fishModel.getFishById(req.params.id, (err, data) => {
        if(err) throw err;
        fishCategoryModel.getAll((err, result) => {
            if(err) throw err;
            res.render('editFish', {
                fish: data,
                fishCategory: result
            })
        })
    })
}

const processEditFish = (req, res) => {
    fishModel.updateFishById(req.params.id, req.body, req.file, (err, result) => {
        if(err) throw err;
        console.log('1 row updated');
        res.redirect('/dashboard');
    })
}

module.exports = {
    renderDashboard, renderEditForm, processEditFish
}