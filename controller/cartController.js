const cartModel = require('../model/cartModel');

const addToCart = (req, res) => {
    console.log(req.session.user.maKH);
    cartModel.addToCart(req.session.user.maKH, req.params.maCa, (err, result) => {
        if(err) throw err;
        res.status(200).json({
            message: 'Thêm thành công'
        })
    })
}

module.exports = {
    addToCart
}

