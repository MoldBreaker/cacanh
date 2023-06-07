const homeController = require('../controller/homeController');
const fishController = require('../controller/fishController');
const userController = require('../controller/userController');
const dashboardController = require('../controller/dashboardController');
const cartController = require("../controller/cartController");
const notificationsController = require('../controller/notificationsController');
const checkoutController = require('../controller/checkoutController');
const checkLogin = require('../middleware/checkLogin');
const setSession = require('../middleware/setSession');
const checkAdmin = require('../middleware/checkAdmin');
const checkNotLogin = require('../middleware/checkNotLogin');

const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/image/fish'); 
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    }
  });
const upload = multer({ storage: storage });

module.exports = (app) => {
    app.get('/', setSession, homeController.helloWorld);
    app.get('/fish/add-fish', checkAdmin, fishController.addFistForm);
    app.post('/fish/add-fish', upload.single('image'), fishController.processAddFish);
    app.get('/fish/image/:id',fishController.getImage);
    app.get('/login',checkLogin, userController.renderLoginForm);
    app.get('/signup', checkLogin, userController.renderSignupForm);
    app.post('/signup', userController.registerUser);
    app.post('/login', userController.loginUser);
    app.get('/logout', userController.logout);
    app.get('/dashboard', checkAdmin, dashboardController.renderDashboard);
    app.get('/fish/edit/:id', checkAdmin, dashboardController.renderEditForm);
    app.post('/fish/edit/:id', checkAdmin, upload.single('image'), dashboardController.processEditFish);
    app.get('/fish/delete/:id', checkAdmin, dashboardController.deleteFish);
    app.get('/add-to-cart/:maCa', checkNotLogin, cartController.addToCart);
    app.get('/cart', setSession, cartController.renderCart);
    app.get('/cart/get-items' , cartController.getItems);
    app.get('/cart/increase-item/:maCa', cartController.increaseItem);
    app.get('/cart/decrease-item/:maCa', cartController.decreaseItem);
    app.get('/cart/remove-item/:maCa', cartController.removeItem);
    app.get('/notifications/get-all', notificationsController.getAllNotifications);
    app.get('/notifications/delete-one/:maTB', notificationsController.deleteOneNotifications);
    app.get('/checkout', checkoutController.renderCheckout);
    app.post('/checkout', checkoutController.processCheckout);
    app.get('/history/get-all', checkoutController.getAllHistory);
    app.get('/history', setSession, checkoutController.renderHistory);
    app.get('/history/detail/:maHD', setSession, checkoutController.getDetailInvoice);
}