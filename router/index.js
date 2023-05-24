const homeController = require('../controller/homeController');
const fishController = require('../controller/fishController');
const userController = require('../controller/userController');
const checkLogin = require('../middleware/checkLogin');
const setSession = require('../middleware/setSession');

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
    app.get('/fish/add-fish', fishController.addFistForm);
    app.post('/fish/add-fish', upload.single('image'), fishController.processAddFish);
    app.get('/fish/image/:id',fishController.getImage);
    app.get('/login',checkLogin, userController.renderLoginForm);
    app.get('/signup', checkLogin, userController.renderSignupForm);
    app.post('/signup', userController.registerUser);
    app.post('/login', userController.loginUser);
    app.get('/logout', userController.logout);
}