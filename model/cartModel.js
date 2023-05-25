const db = require("../config/db");

const addToCart = (maKH, maCa, callback) => {
    getCartItemById(maKH, maCa, (err, result) => {
        if (err) return callback(err);
        if (result.length == 0) {
            let sql = `insert into cart(maKH, maCa, soLuong) values (?, ?, ?)`;
            db.query(sql, [maKH, maCa, 1], (err, result) => {
                if (err) callback(err);
                callback(null, {
                    message: "Inserted Successfully"
                });
            })
        } else {
            let sql = `update cart set soLuong = soLuong + 1 where maKH = ? and maCa = ?`;
            db.query(sql, [maKH, maCa], (err, result) => {
                if (err) callback(err);
                callback(null, {
                    message: "Updated Successfully"
                });
            })
        }
    })
}

const getCartItemById = (maKH, maCa, callback) => {
    let sql = `select * from cart where maKH = ? and maCa = ?`;
    db.query(sql, [maKH, maCa], (err, result) => {
        if (err) callback(err);
        callback(null, result);
    })
}

module.exports = {
    addToCart,
    getCartItemById
}