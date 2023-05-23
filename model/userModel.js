const db = require('../config/db');
const bcrypt = require('bcrypt');

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
                            message: "Login Successfully"
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

module.exports = {
    register, login
}