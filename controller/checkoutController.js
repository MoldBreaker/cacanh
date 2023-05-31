const cartModel = require('../model/cartModel');
const userModel = require('../model/userModel');
const checkoutModel = require('../model/checkoutModel');
const notificationsModel = require('../model/notificationsModel');

const renderCheckout = (req, res) =>{
    try {
        cartModel.getCartItemListById(req.session.user.maKH, (err, fish)=>{
            if(err) throw err;
            userModel.getUserById(req.session.user.maKH, (err, user)=>{
                if(err) throw err;
                res.render("checkout", {
                    fish: fish,
                    user: user
                })
            })
        })
    } catch (err) {
        res.redirect('back');
    }
}

const processCheckout = (req, res) =>{
    try {
        let moreInfo = {
            taiKhoanTT: req.body.cardNumber,
            diaChi: req.body.address,
            fullname: req.body.cardHolder,
            phone: req.body.phone
        } 
        userModel.updateMoreInfoById(req.session.user.maKH, moreInfo, (err, result)=>{
            if(err) throw err;
            cartModel.getCartItemListById(req.session.user.maKH, (err, fish)=>{
                if(err) throw err;
                let sum=0;
                for(let i=0;i<fish.length;i++){
                    sum+=fish[i].gia*fish[i].soLuong;
                }
                let invoice = {
                    diaChiNhan: moreInfo.diaChi,
                    tongTien: sum,
                    SDTNhan: moreInfo.phone
                }
                checkoutModel.insertInvoice(req.session.user.maKH, invoice, (err, invoice)=>{
                    if(err) throw err;
                    
                    checkoutModel.insertDetailInvoice( invoice.insertId, fish, (err, result) => {
                        if(err) throw err;
                        console.log('updated invoice detail sucsessfully');
                        notificationsModel.sendNotificationToUserById(req.session.user.maKH, "Thanh toán thành công", (err, result) => {
                            if(err) throw err;
                            cartModel.removeCartByUserId(req.session.user.maKH, (err, result)=>{
                                if(err) throw err;
                                res.redirect('/');
                            })
                        })
                    })

                })
            })
        })
    } catch (err) {
        res.redirect('back');
    }
}

const renderHistory = (req, res) => {
    res.render("history");
}

const getAllHistory = (req, res) => {
    checkoutModel.getAllInvoiceByUserId(req.session.user.maKH, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
}

module.exports = {
    renderCheckout, processCheckout, getAllHistory, renderHistory
}