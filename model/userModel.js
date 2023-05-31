const db = require('../config/db');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

async function createHashedPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

async function comparePasswords(password, hashedPassword) {
    const isMatch = await bcrypt.compare(password, hashedPassword);
    return isMatch;
}

const register = ({ username, email, password, phone }, callback) => {
    let sql = `select * from user where email = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) callback(err);
        if (result.length > 0) {
            return callback(null, {
                message: "Email already exists"
            });
        } else {
            createHashedPassword(password)
                .then((hashedPassword) => {
                    const sql = `insert into user(userName, email, password, phone) values (?, ?, ?, ?)`;
                    db.query(sql, [username, email, hashedPassword, phone], (err, result) => {
                        if (err) callback(err);
                        return callback(null, {
                            message: "Inserted Successfully"
                        });
                    })
                })
        }
    })
}

const login = ({ email, password }, callback) => {
    let sql = `select * from user where email = ?`;
    db.query(sql, [email], (err, result) => {
        if (err) callback(err);
        const user = result[0];
        if (user) {
            comparePasswords(password, user.password)
                .then((isMatch) => {
                    if (isMatch) {
                        callback(null, {
                            message: "Login Successfully",
                            user: result
                        });
                    } else {
                        callback(null, {
                            message: "Login Failed"
                        });
                    }
                })
        } else {
            callback(null, {
                message: "Login Failed"
            })
    }})
}

const generateToken = () => {
    return uuidv4() + Date.now();
}

const updateToken = (maKH, callback) => {
    const sql = `update user set token = ? where maKH = ?`;
    db.query(sql, [generateToken(), maKH], (err, result) => {
        if (err) callback(err);
        const sql = `select * from user where maKH = ?`;
        db.query(sql, [maKH], (err, user) => {
            if (err) callback(err);
            return callback(null, user[0]);
        })
    })
}

const getUserByToken = (token, callback) => {
    const sql = `select * from user where token = ?`;
    db.query(sql, [token], (err, user) => {
        if (err) callback(err);
        return callback(null, user[0]);
    })
}

const getAllUsers = (callback) => {
    let sql = `select * from user where role = 0`;
    db.query(sql, (err, result) => {
        if (err) callback(err);
        return callback(null, result);
    })
}

const getUserById = (maKH, callback) => {
    const sql = `select * from user where maKH = ?`;
    db.query(sql, [maKH], (err, result) => {
        if (err) callback(err);
        return callback(null, result[0]);
    })
}

const updateMoreInfoById = (maKH, {taiKhoanTT, diaChi, fullname} ,callback) =>{
    let sql = `update user set taiKhoanTT = ?, diaChi = ?, fullname = ? where maKH = ?`;
    db.query(sql, [taiKhoanTT, diaChi, fullname, maKH], (err, result) => {
        if (err) callback(err);
        return callback(null, {
            message: 'updated more info successfully'
        });
    })
}

module.exports = {
    register, login, updateToken, getUserByToken, getAllUsers, getUserById, updateMoreInfoById
}