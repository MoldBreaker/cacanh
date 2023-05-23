const db = require('../config/db');

const getAll = (callback) => {
    let sql = `select * from loaica`;
    db.query(sql, (err, result) => {
        if (err) callback(err);
        callback(null, result);
    })
}

module.exports = {
    getAll
}