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

const getCartItemListById = (maKH, callback) => {
    let sql = `SELECT * FROM cart JOIN ca ON cart.maCa = ca.maCa WHERE maKH = ?`;
    db.query(sql, [maKH], (err, result) => {
        if (err) callback(err);
        callback(null, result);
    })
}

const increaseItem = (maKH, maCa, callback) => {
    addToCart(maKH, maCa, (err, result) => {
        if (err) return callback(err);
        getCartItemListById(maKH, (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        })
    })
}

const removeItem = (maKH, maCa, callback) => {
    let sql = `delete from cart where maKH = ? and maCa = ?`;
    db.query(sql, [maKH, maCa], (err, result) => {
        if (err) return callback(err);
        callback(null, result);
    })
}

const decreaseItem = (maKH, maCa, callback) => {
    let sql = `update cart set soLuong = soLuong - 1 where maKH = ? and maCa = ?`;
    db.query(sql, [maKH, maCa], (err, result) => {
        if (err) return callback(err);
        getCartItemById(maKH, maCa, (err, result) => {
            if (err) return callback(err);
            if(result[0].soLuong==0){
                removeItem(maKH, maCa, (err, result) => {
                    if (err) return callback(err);  
                    getCartItemListById(maKH, (err, result) => {
                        if (err) return callback(err);
                        callback(null, result);
                    })
                })
            }else{
                getCartItemListById(maKH, (err, result) => {
                    if (err) return callback(err);
                    callback(null, result);
                })
            }
        })
    })
}

module.exports = {
    addToCart,
    getCartItemById,
    getCartItemListById,
    increaseItem,
    decreaseItem,
    removeItem
}