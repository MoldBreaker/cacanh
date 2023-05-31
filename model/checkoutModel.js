const db = require('../config/db');

const insertDetailInvoice = (maHD, productsArr, callback) => {
    let sql = `insert into cthd(maHD, maCa, soLuong, anhCa, gia, giong, mauSac, tenCa) values `;
    for(let i=0;i<productsArr.length;i++){
        if(i === productsArr.length-1){
            sql += `(${maHD}, ${productsArr[i].maCa}, ${productsArr[i].soLuong}, '${productsArr[i].anhCa}', ${productsArr[i].gia}, '${productsArr[i].giong}', '${productsArr[i].mauSac}', '${productsArr[i].tenCa}') `;
        } else {
            sql += `(${maHD}, ${productsArr[i].maCa}, ${productsArr[i].soLuong}, '${productsArr[i].anhCa}', ${productsArr[i].gia}, '${productsArr[i].giong}', '${productsArr[i].mauSac}', '${productsArr[i].tenCa}'), `;
        }
    }
    db.query(sql, (err, result)=>{
        if(err) callback(err);
        callback(null, result);
    })
}

const insertInvoice = (maKH, {diaChiNhan, tongTien, SDTNhan},  callback) =>{
    let sql = `insert into hoadon(maKH, diaChiNhan, tongTien, SDTNhan, ngayLap) values (?, ?, ?, ?, NOW())`;
    db.query(sql, [maKH, diaChiNhan, tongTien, SDTNhan], (err, result)=>{
        if(err) callback(err);
        callback(null, result);
    })
}

const getAllInvoiceByUserId = (maKH, callback) => {
    let sql = `select * from hoadon JOIN user on hoadon.maKH = user.maKH where hoadon.maKH = ?`;
    db.query(sql, [maKH], (err, result)=>{
        if(err) callback(err);
        callback(null, result);
    })
}

module.exports = {
    insertInvoice, insertDetailInvoice, getAllInvoiceByUserId
}