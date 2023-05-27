const cartModel = require('../model/cartModel');

const addToCart = (req, res) => {
    cartModel.addToCart(req.session.user.maKH, req.params.maCa, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Them thanh cong");
    })
}

const renderCart = (req, res) => {
    res.render("cart");
}

const getItems = (req, res) => {
    cartModel.getCartItemListById(req.session.user.maKH, (err, result) => {
        if(err) throw err;
        let totalPrice=0;
        for(let i=0;i<result.length;i++){
            totalPrice+=result[i].soLuong*result[i].gia;
        }
        res.json({
            data: result,
            totalPrice: totalPrice
        });
    })
}

const increaseItem = (req, res) => {
    cartModel.increaseItem(req.session.user.maKH, req.params.maCa, (err, result) => {
        if (err) throw err;
        let totalPrice=0;
        for(let i=0;i<result.length;i++){
            totalPrice+=result[i].soLuong*result[i].gia;
        }
        res.json({
            data: result,
            totalPrice: totalPrice
        });
    })
}

const decreaseItem = (req, res) => {
    cartModel.decreaseItem(req.session.user.maKH, req.params.maCa, (err, result) => {
        if (err) throw err;
        let totalPrice=0;
        for(let i=0;i<result.length;i++){
            totalPrice+=result[i].soLuong*result[i].gia;
        }
        res.json({
            data: result,
            totalPrice: totalPrice
        });
    })
}

const removeItem = (req, res) => {
    cartModel.removeItem(req.session.user.maKH, req.params.maCa, (err, result) => {
        if (err) throw err;
        cartModel.getCartItemListById(req.session.user.maKH, (err, result) => {
            if (err) throw err;
            let totalPrice=0;
            for(let i=0;i<result.length;i++){
                totalPrice+=result[i].soLuong*result[i].gia;
            }
            res.json({
                data: result,
                totalPrice: totalPrice
            });
        })
    })
}

module.exports = {
    addToCart, renderCart, getItems, increaseItem, decreaseItem, removeItem
}

