const db = require('../config/db');
const userModel = require('./userModel');

const sendNofiticationAll = (content, callback) =>{
    userModel.getAllUsers((err, result) => {
        if(err) throw err;
        let sql = `insert into notifications (maKH, noiDung, thoiGian) values`
        for(let i =0;i<result.length;i++){
            if(i == result.length-1){
                sql+=`(${result[i].maKH}, '${content}', NOW())`
            } else {
                sql+=`(${result[i].maKH}, '${content}', NOW()),`
            }
        }
        db.query(sql, (err, result)=>{
            if(err) throw err;
            callback(null, {
                message: "Gui Successfully"
            })
        })
    })
}

const sendNotificationToUserById = (maKH, content, callback) => {
    let sql = `insert into notifications (maKH, noiDung, thoiGian) values (?, ?, NOW())`;
    db.query(sql, [maKH, content], (err, result) => {
        if(err) throw err;
        callback(null, {
            message: "Gui Successfully"
        })
    })
}

const getAllNotificationsByUserId = (maKH, callback) => {
    const sql = `select * from notifications where maKH = ?`;
    db.query(sql, [maKH], (err, result) => {
        if (err) throw err;
        callback(null, result);
    })
}

const removeOneNotificationById = (maTB, callback) => {
    const sql = `delete from notifications where maTB = ?`
    db.query(sql, [maTB], (err, result) => {
        if(err) throw err;
        callback(null, {
            message: "Delete Successfully"
        })
    })
}

module.exports = {
    sendNofiticationAll, getAllNotificationsByUserId,removeOneNotificationById, sendNotificationToUserById
}