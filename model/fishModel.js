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

const getAll = (callback) => {
    let sql = `select * from ca `;
    db.query(sql, (err, result) => {
        if (err) callback(err);
        callback(null, result);
    })
}

module.exports = {
    insertFish, getImage, getAll
}