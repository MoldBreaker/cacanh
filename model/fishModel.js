const db = require('../config/db');

const insertFish = (fish, filename,  callback) => {
    let sql = `insert into ca(tenCa, mauSac, giong, gia, maLoai, anhCa) values (?, ?, ?, ?, ?, ?)`;
    db.query(sql, [fish.name, fish.color, fish.gender, fish.price, fish.category, filename], (err, result) => {
            if (err) callback(err);
            callback(null, {
                message: "Inserted Successfully"
            });
    });
}

const getImage = (id, callback) => {
    let sql = `select * from ca where maCa = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) callback(err);
        callback(null, result);
    })
}

const getAll = (seacrh, callback) => {
    let sql = `select * from ca where tenCa like '%${seacrh}%'`;
    db.query(sql, (err, result) => {
        if (err) callback(err);
        callback(null, result);
    })
}

const getFishById = (id, callback) => {
    let sql = `select * from ca where maCa = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) callback(err);
        callback(null, result[0]);
    })
}

const updateFishById = (id, fish, file, callback) => {
    if(file == undefined){
        let sql = `update ca set tenCa = ?, mauSac = ?, giong = ?, gia = ?, maLoai = ? where maCa = ?`;
        db.query(sql, [fish.name, fish.color, fish.gender, fish.price, fish.category, id], (err, result) => {
            if (err) callback(err);
            callback(null, {
                message: "Updated Successfully"
            });
        })
    } else{
        let sql = `update ca set tenCa = ?, mauSac = ?, giong = ?, gia = ?, maLoai = ?, anhCa = ? where maCa = ?`;
        db.query(sql, [fish.name, fish.color, fish.gender, fish.price, fish.category, file.filename, id], (err, result) => {
            if (err) callback(err);
            callback(null, {
                message: "Updated Successfully"
            });
        })
    } 
}

const deleteFishById = (id, callback) => {
    let sql = `delete from ca where maCa = ?`;
    db.query(sql, [id], (err, result) => {
        if (err) callback(err);
        callback(null, {
            message: "Deleted Successfully"
        });
    })
}

module.exports = {
    insertFish, getImage, getAll, getFishById, updateFishById, deleteFishById
}