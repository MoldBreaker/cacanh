const notificationModel = require('../model/notificationsModel');
const getAllNotifications = (req, res)=>{
    notificationModel.getAllNotificationsByUserId(req.session.user.maKH, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
}

const deleteOneNotifications = (req, res)=>{
    notificationModel.removeOneNotificationById(req.params.maTB, (err, result) => {
        if(err) throw err;
        notificationModel.getAllNotificationsByUserId(req.session.user.maKH, (err, result) => {
            if(err) throw err;
            res.json(result);
        })
    })
}

module.exports = {
    getAllNotifications, deleteOneNotifications
}